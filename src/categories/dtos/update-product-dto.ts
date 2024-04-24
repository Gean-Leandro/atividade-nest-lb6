import { PartialType } from "@nestjs/mapped-types";
import { CreateCategoryDTO } from "./create-category_dto";

export class UpdateCategoryDTO extends PartialType(CreateCategoryDTO){}