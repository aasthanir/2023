import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderController } from 'src/application/controllers/order.controller';
import { Food, FoodSchema } from 'src/core/entities/food.entity';
import { Order, OrderSchema } from 'src/core/entities/order.entity';
import { OrderService } from 'src/core/services/order.service';

@Module({
    imports:[
        MongooseModule.forFeature([
            {name: Order.name, schema: OrderSchema},
            {name: Food.name, schema: FoodSchema}
        ])
    ],
    controllers: [OrderController],
    providers: [OrderService],  
})
export class OrderModule {}
