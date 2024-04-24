import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { Repository } from 'typeorm';
import { CreateProductDTO } from './dtos/create-product-dto';
import { UpdateProductDTO } from './dtos/update-product-dto';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class ProductsService {
    constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>, private readonly categoryService: CategoriesService){}

    findAll() {
        return this.productRepository.find();
    }

    async findOne(id: number) {
        const product = await this.productRepository.findOne({where: {id: id}});
        if (!product){
            throw new NotFoundException("Produto não encontrado");
        }
        return product;
    }

    async create(data: CreateProductDTO) {
        const category = await this.categoryService.findOne(data.idCategory);
        const product = this.productRepository.create({
            name: data.name, 
            description: data.description,
            category: category
        });
        return this.productRepository.save(product);
    }

    async remove(id: number) {
        const product = await this.findOne(id);
        return this.productRepository.remove(product);
    }

    async update(id: number, data: UpdateProductDTO) {
        const product = await this.productRepository.preload({
            id: id,
            ...data
        });
        if (!product) {
            throw new NotFoundException("Produto não encontrado");
        }
        return this.productRepository.save(product);
    }
}
