import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type OrderDocument = Order & Document;

@Schema()
export class Order {
    @Prop()
    public orderDate: Date;
    @Prop()
    public orderNo: number;
    @Prop()
    public orderDetail: OrderDetail[];
}

export class OrderDetail {
    public foodId: string;
    public quantity: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);