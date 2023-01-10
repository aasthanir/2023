import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodController } from 'src/application/controllers/food.controller';
import { Category, CategorySchema } from 'src/core/entities/category.entity';
import { Food, FoodSchema } from 'src/core/entities/food.entity';
import { CategoryService } from 'src/core/services/category.service';
import { FoodService } from 'src/core/services/food.service';

@Module({
    imports:[
        MongooseModule.forFeature([
            { name: Food.name, schema: FoodSchema },
            { name: Category.name, schema: CategorySchema }
        ])
    ],
    controllers: [FoodController],
    providers: [FoodService],  
})
export class FoodModule {}
