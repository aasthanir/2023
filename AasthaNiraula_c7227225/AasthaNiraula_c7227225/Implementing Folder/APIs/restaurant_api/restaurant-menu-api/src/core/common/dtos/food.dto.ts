import { ApiProperty } from "@nestjs/swagger";

export class FoodDto {
    public _id: string;
    @ApiProperty()
    public name: string;
    @ApiProperty()
    public categoryId: string;
    public categoryName: string;
    @ApiProperty()
    public price: number;
    @ApiProperty()
    public calories: number;
    @ApiProperty()
    public description: string;
    @ApiProperty()
    public imageUrl: string;
}