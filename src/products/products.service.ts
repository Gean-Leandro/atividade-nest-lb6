import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';

const INDEX_PRODUCT_NOT_FOUND = -1

@Injectable()
export class ProductsService {
    private products: Product[] = [
        {
            id: 1,
            name: 'produto 1',
        },
        {
            id: 2,
            name: 'produto 2',
        },
        {
            id: 3,
            name: 'produto 3',
        }
    ]

    findAll(){
        return this.products;
    }

    findOne(id: number){
        const product = this.products.find((product) => product.id === +id);
        if (!product) {
            throw new NotFoundException("Produto não existe");
        }
        return product;
    }

    create(input) {
        const productIndex = this.products.findIndex((product) => product.id === input.id);
        if (productIndex === INDEX_PRODUCT_NOT_FOUND) {
            this.products.push(input)
        } else{
            throw new ConflictException("Produto já existe");
        }
    }

    delete(id: number) {
        const productIndex = this.products.findIndex((product) => product.id === +id);
        if (productIndex === INDEX_PRODUCT_NOT_FOUND) {
            throw new NotFoundException("Produto não existe");
        } else {
            this.products.splice(productIndex, 1);
        }
    }
}

export class Product {
    id: number;
    name: string;
}
