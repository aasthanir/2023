import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Food, FoodDocument } from '../entities/food.entity';
import { FoodDto } from '../common/dtos/food.dto';
import { Category, CategoryDocument } from '../entities/category.entity';

@Injectable()
export class FoodService {
  constructor(
    @InjectModel(Food.name) private foodModel: Model<FoodDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>
  ) { }

  async create(model: FoodDto): Promise<Food> {
    const createdFood = this.foodModel.create(model);
    return createdFood;
  }

  async findAll(): Promise<FoodDto[]> {
    const foods = await this.foodModel.find().exec();
    const categories = await this.categoryModel.find().exec();
    const _foods : FoodDto[] = [];
    foods.forEach(food=>{
      _foods.push({
        _id: food._id,
        name: food.name,
        categoryId: food.categoryId,
        categoryName: categories.find(x=>x._id == food.categoryId)?.name,
        calories: food.calories,
        price: food.price,
        description: food.description,
        imageUrl: food.imageUrl
      });
    });
    return _foods;
  }

  async findById(id:string): Promise<FoodDto> {
    const food = await this.foodModel.findById(id).exec();
    const category = await this.categoryModel.findById(food.categoryId).exec();
    const _food: FoodDto = {
      _id: food._id,
      name: food.name,
      categoryId: food.categoryId,
      categoryName: category?.name,
      calories: food.calories,
      price: food.price,
      description: food.description,
      imageUrl: food.imageUrl
    };
    return _food;
  }

  async update(id:string, model: FoodDto): Promise<Food> {
    return await this.foodModel.findByIdAndUpdate(id, model, { new: true });
  }

  async delete(id:string): Promise<any> {
    return await this.foodModel.findByIdAndRemove(id);
  }
}
