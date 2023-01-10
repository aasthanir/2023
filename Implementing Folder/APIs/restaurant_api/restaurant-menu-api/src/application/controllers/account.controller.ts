import { Controller, HttpCode, Post, Body, UnauthorizedException } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { LoginDto } from "src/core/common/dtos/login.dto";
import { AccountService } from "src/infrastructure/services/account.service";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "src/core/services/user.service";
import { JwtAuthGuard } from "src/infrastructure/common/guards/auth.guard";
import { CreateUserDto } from "src/core/common/dtos/create-user.dto";

@ApiTags("Account")
@Controller("api")
export class AccountController {
    constructor(private readonly accountService: AccountService,
        private readonly userService: UserService) { }

    @Post("signin")
    @UseGuards(AuthGuard('local'))
    @HttpCode(200)
    async login(@Body() model: LoginDto): Promise<any> {
        return await this.accountService.login(model);
    }

    @Post("signup")
    async create(@Body() model: CreateUserDto) {
        return await this.userService.create(model)
    }
}