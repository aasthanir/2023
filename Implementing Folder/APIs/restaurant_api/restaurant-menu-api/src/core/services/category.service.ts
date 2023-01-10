import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from '../entities/category.entity';
import { CategoryDto } from '../common/dtos/category.dto';

@Injectable()
export class CategoryService {
    constructor(@InjectModel(Category.name) private categoryModel: Model<CategoryDocument>) { }

    async create(model: CategoryDto): Promise<Category> {
        const createdCategory = this.categoryModel.create(model);
        return createdCategory;
    }

    async findAll(): Promise<Category[]> {
        return await this.categoryModel.find().exec();
    }

    async findById(id: string): Promise<Category> {
        return await this.categoryModel.findById(id).exec();
    }

    async update(id: string, model: CategoryDto): Promise<Category> {
        return await this.categoryModel.findByIdAndUpdate(id, model, { new: true });
    }

    async delete(id: string): Promise<any> {
        return await this.categoryModel.findByIdAndRemove(id);
    }
}
