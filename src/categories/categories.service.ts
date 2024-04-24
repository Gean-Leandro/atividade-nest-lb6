import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './categories.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDTO } from './dtos/create-category_dto';
import { UpdateCategoryDTO } from './dtos/update-product-dto';

@Injectable()
export class CategoriesService {
    constructor(@InjectRepository(Category) private readonly categoryRepository: Repository<Category>){}
    
    findAll(){
        return this.categoryRepository.find();
    }
    
    async findOne(id: number){
        const category = await this.categoryRepository.findOne({where: {id: id}});
        if (!category){
            throw new NotFoundException("Categoria não encontrada");
        }
        return category;
    }

    create(data: CreateCategoryDTO) {
        const category = this.categoryRepository.create(data);
        return this.categoryRepository.save(category);
    }

    async update(id: number, data: UpdateCategoryDTO){
        const category = await this.categoryRepository.preload({
            id: id,
            ...data
        })
        if (!category){
            throw new NotFoundException("Categoria não encontrada");
        }
        return this.categoryRepository.save(category);
    }

    async remove(id: number){
        const category = await this.findOne(id);
        return this.categoryRepository.remove(category);
    }
}
