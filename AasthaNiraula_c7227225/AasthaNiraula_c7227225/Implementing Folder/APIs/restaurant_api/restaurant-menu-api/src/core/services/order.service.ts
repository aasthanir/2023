import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDto, OrderListDto } from '../common/dtos/order.dto';
import { Food, FoodDocument } from '../entities/food.entity';
import { Order, OrderDetail, OrderDocument } from '../entities/order.entity';
import { maxBy, sumBy } from "lodash";

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
        @InjectModel(Food.name) private foodModel: Model<FoodDocument>
    ) { }

    async create(model: OrderDto): Promise<any> {
        const orders = await this.orderModel.find().exec();
        let orderNo = 0;
        if (orders.length > 0)
            orderNo = maxBy(orders, x => x.orderNo).orderNo;
        model.orderNo = orderNo + 1;
        const orderCreated = await this.orderModel.create(model);
        return { orderNo: orderCreated.orderNo };
    }

    async getOrders(): Promise<OrderListDto[]> {
        const orderList: OrderListDto[] = [];
        const foods = await this.foodModel.find().exec();
        await this.orderModel.find()
            .exec()
            .then((orders) => {
                orders.forEach(order => {
                    let _order: OrderListDto = {
                        orderDate: order.orderDate,
                        orderNo: order.orderNo,
                        orderDetail: [],
                        billAmount: 0
                    }
                    order.orderDetail.forEach(detail => {
                        let food = foods.find(x => x._id == detail.foodId);
                        _order.orderDetail.push({
                            foodId: food._id,
                            foodName: food.name,
                            quantity: detail.quantity,
                            rate: food.price,
                            amount: detail.quantity * food.price
                        });
                    })
                    _order.billAmount = sumBy(_order.orderDetail, x => x.amount);
                    orderList.push(_order);
                })
            })
        return orderList;
    }
}
