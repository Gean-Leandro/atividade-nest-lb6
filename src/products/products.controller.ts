import { Controller, Get, Delete, HttpCode, HttpStatus, Body, Post, Param } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
    @HttpCode(HttpStatus.OK)
    findAll(){
        return this.productService.findAll();
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() input) {
        this.productService.create(input);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    findOne(@Param("id") id: number) {
        return this.productService.findOne(id);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    delete(@Param("id") id: number) {
        return this.productService.delete(id);
    }
}
