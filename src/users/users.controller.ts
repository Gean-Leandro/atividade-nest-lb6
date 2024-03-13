import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(){
        return this.userService.findAll();
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() input) {
        this.userService.create(input);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    findOne(@Param("id") id: number) {
        return this.userService.findOne(id);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    delete(@Param("id") id: number) {
        return this.userService.delete(id);
    }
}
