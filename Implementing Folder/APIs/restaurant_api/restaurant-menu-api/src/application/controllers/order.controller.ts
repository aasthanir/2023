import { Controller, Get, Post, Delete, Put, Body, Param, HttpCode, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/infrastructure/common/guards/auth.guard';
import { OrderService } from 'src/core/services/order.service';
import { OrderDto, OrderListDto } from 'src/core/common/dtos/order.dto';
import { OrderListDetailDto } from '../../core/common/dtos/order.dto';

@ApiBearerAuth()
@ApiTags("Orders")
@Controller('api/orders')
@UseGuards(JwtAuthGuard)
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Post()
    async create(@Body() model: OrderDto): Promise<any> {
      return await this.orderService.create(model);
    }
  
    @Get()
    @ApiResponse({ type: OrderDto, isArray: true })
    async findAll(): Promise<OrderDto[]> {
        return this.orderService.getOrders();
    }
}
