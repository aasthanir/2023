import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/core/entities/user.entity';
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class AccountService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private jwtService: JwtService) { }

    async validateUser(username: string, password: string): Promise<any> {
        var user = await this.userModel.findOne({ username: username }).exec();
        if (user?.password == password) {
            const {password, ...result} = user;
            return result;
        }
        throw new UnauthorizedException();
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user._id };
        return {
            username: user.username,
            access_token: this.jwtService.sign(payload),
        };
    }
}
