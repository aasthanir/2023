import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type FoodDocument = Food & Document;

@Schema()
export class Food {
    @Prop()
    public name: string;
    @Prop()
    public categoryId: string;
    @Prop()
    public price: number;
    @Prop()
    public calories: number;
    @Prop()
    public description: string;
    @Prop()
    public imageUrl: string;
}

export const FoodSchema = SchemaFactory.createForClass(Food);