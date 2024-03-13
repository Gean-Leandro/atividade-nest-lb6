import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';

const INDEX_USER_NOT_FOUND = -1;

@Injectable()
export class UsersService {
    private users: User[] = [
        {
            id: 1,
            name: "Neriglissor",
            age: 35
        },
        {
            id: 2,
            name: "Aldemar",
            age: 26
        },
        {
            id: 3,
            name: "Albaniele",
            age: 46
        },
    ]

    findAll(){
        return this.users;
    }

    findOne(id: number){
        const user = this.users.find((user) => user.id === +id);
        if (!user) {
            throw new NotFoundException("Usuário não existe");
        }
        return user;
    }

    create(input) {
        const userIndex = this.users.findIndex((user) => user.id === input.id);
        if (userIndex === INDEX_USER_NOT_FOUND) {
            this.users.push(input)
        } else{
            throw new ConflictException("Usuário já existe");
        }
    }

    delete(id: number) {
        const userIndex = this.users.findIndex((user) => user.id === +id);
        if (userIndex === INDEX_USER_NOT_FOUND) {
            throw new NotFoundException("Usuário não existe");
        } else {
            this.users.splice(userIndex, 1);
        }
    }
}

export class User {
    id: number;
    name: string;
    age: number;
}
