import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Body } from '@nestjs/common';
import { StudentDtoUpdate } from './dto';

@Injectable({})
export class StudentService {

    constructor(private prisma: PrismaService) {

    }

    async updateStudent(user: any, dto: StudentDtoUpdate) {

        const dados = {}

        if (dto.cpf)
            dados['cpf'] = dto.cpf;
        if (dto.dataNascimento)
            dados['dataNascimento'] = dto.dataNascimento;
        if (dto.nome)
            dados['nome'] = dto.nome;
        if (dto.email)
            dados['email'] = dto.email;
        if (dto.endereco_eth)
            dados['endereco_eth'] = dto.endereco_eth;

        const updateUser = await this.prisma.student.update({
            where: {email: user.email},
            data: dados
        });

        delete updateUser.hashSenha;

        return updateUser;
    }
}
