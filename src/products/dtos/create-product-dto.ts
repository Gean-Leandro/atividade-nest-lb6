import { IsNumber, IsString } from "class-validator";

export class CreateProductDTO {
    @IsString()
    readonly name: string;
    @IsString()
    readonly description: string;
    @IsNumber()
    readonly idCategory: number;
}