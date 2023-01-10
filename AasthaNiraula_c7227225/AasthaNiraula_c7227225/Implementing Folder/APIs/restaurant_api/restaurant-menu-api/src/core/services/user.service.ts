import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateUserDto } from "../common/dtos/create-user.dto";
import { User, UserDocument } from "../entities/user.entity";
import { Model } from "mongoose";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async create(model: CreateUserDto): Promise<any> {
      const createdUser = await this.userModel.create(model);
      const {_id} = createdUser;
      return _id;
    }
}