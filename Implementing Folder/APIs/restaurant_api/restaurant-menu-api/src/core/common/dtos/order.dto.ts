import { ApiProperty } from "@nestjs/swagger";

export class OrderDetailDto {
    @ApiProperty()
    public foodId: string;
    @ApiProperty()
    public quantity: number;
}

export class OrderDto {
    @ApiProperty()
    public orderDate: Date;
    public orderNo: number;
    @ApiProperty({ type: OrderDetailDto, isArray: true })
    public orderDetail: OrderDetailDto[];
}

export class OrderListDetailDto {
    @ApiProperty()
    public foodId: string;
    @ApiProperty()
    public foodName: string;
    @ApiProperty()
    public quantity: number;
    @ApiProperty()
    public rate: number;
    @ApiProperty()
    public amount: number;
}

export class OrderListDto {
    @ApiProperty()
    public orderDate: Date;
    @ApiProperty()
    public orderNo: number;
    @ApiProperty()
    public billAmount: number;
    @ApiProperty({ type: OrderListDetailDto, isArray: true })
    public orderDetail: OrderListDetailDto[];

}

