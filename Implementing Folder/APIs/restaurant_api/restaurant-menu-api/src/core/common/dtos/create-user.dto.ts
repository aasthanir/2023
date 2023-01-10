import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty()
    public name: string;
    @ApiProperty()
    public username: string;
    @ApiProperty()
    public password: string;
    @ApiProperty()
    public email: string;
    @ApiProperty()
    public contactNo: string;
}