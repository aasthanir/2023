import { ApiProperty } from "@nestjs/swagger";

export class CategoryDto {
    @ApiProperty()
    private name: string;
}