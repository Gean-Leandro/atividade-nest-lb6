import { Controller, Post, Get, Param, Body, Delete, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDTO } from './dtos/create-category_dto';
import { UpdateCategoryDTO } from './dtos/update-product-dto';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoryService: CategoriesService){}

    @Get()
    findAll(){
        return this.categoryService.findAll();
    }

    @Post()
    create(@Body() data:CreateCategoryDTO) {
        return this.categoryService.create(data);
    }

    @Get(':id')
    findOne(@Param('id') id: number){
        return this.categoryService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() data: UpdateCategoryDTO){
        return this.categoryService.update(+id, data);
    }

    @Delete(':id')
    remove(@Param('id') id: number){
        return this.categoryService.remove(+id);
    }
}
