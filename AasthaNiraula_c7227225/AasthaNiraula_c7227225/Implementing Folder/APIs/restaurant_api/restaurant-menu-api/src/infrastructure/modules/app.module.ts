import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountModule } from './account.module';
import { CategoryModule } from './category.module';
import { FoodModule } from './food.module';
import { OrderModule } from './order.module';


@Module({
    imports:[
        MongooseModule.forRoot("mongodb+srv://aas2001:Password123@cluster0.4awhk.mongodb.net/?retryWrites=true&w=majority",{
            dbName: "restaurant"
        }),
        FoodModule,
        CategoryModule,
        OrderModule,
        AccountModule
    ],
    providers:[]
})
export class AppModule {}
