import { Body, Controller, Delete, Get, Param, Post, Patch, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from './dtos/create-product-dto';
import { UpdateProductDTO } from './dtos/update-product-dto';
import { CategoriesService } from 'src/categories/categories.service';

@Controller('products')
export class ProductsController {
    
    constructor(private readonly productService: ProductsService){}

    @Get()
    findAll() {
        return this.productService.findAll();
    }
    
    @Post()
    async create(@Body() data: CreateProductDTO){
        return this.productService.create(data);
    }

    @Get(':id')
    findOne(@Param('id') id: number){
        return this.productService.findOne(+id);
    }

    @Delete(':id')
    delete(@Param('id') id: number){
        return this.productService.remove(+id);
    }

    @Patch(':id')
    update(@Param('id') id:number, @Body() data: UpdateProductDTO){
        return this.productService.update(+id, data);
    }

    @Put(':id')
    updateAllData(@Param('id') id:number, @Body() data: UpdateProductDTO) {
        return this.productService.update(+id, data);
    }
}
