import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { Category } from 'src/core/entities/category.entity';
import { CategoryService } from 'src/core/services/category.service';
import { CategoryDto } from 'src/core/common/dtos/category.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/infrastructure/common/guards/auth.guard';

@ApiBearerAuth()
@ApiTags("Category")
@Controller('api/categories')
@UseGuards(JwtAuthGuard)
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post()
    async create(@Body() model: CategoryDto) {
      return await this.categoryService.create(model);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() model: CategoryDto) {
        return await this.categoryService.update(id,model);
    }
  
    @Get()
    async findAll(): Promise<Category[]> {
        return this.categoryService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Category> {
      return this.categoryService.findById(id);
    }
  
    @Delete(':id')
    async delete(@Param('id') id: string) {
      return this.categoryService.delete(id);
    }
}
