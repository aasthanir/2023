import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryController } from 'src/application/controllers/category.controller';
import { Category, CategorySchema } from 'src/core/entities/category.entity';
import { CategoryService } from 'src/core/services/category.service';

@Module({
    imports:[
        MongooseModule.forFeature([{name: Category.name, schema: CategorySchema}])
    ],
    controllers:[CategoryController],
    providers:[CategoryService]
})
export class CategoryModule {}
