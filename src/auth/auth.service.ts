import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDtoSingup, AuthDtoSignin } from "./dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable({})
export class AuthService {

    constructor(private prisma: PrismaService) {
        
    }
    
    async signin(dto: AuthDtoSignin) {
        
        const user = 
            await this.prisma.student.findUnique({
                where: {
                    matricula: dto.matricula,
                },
            });
        
        if (!user) 
            throw new ForbiddenException(
                'Estudante nao cadastrado'
            );

        const pwMatches = 
            await argon.verify(
                user.hashSenha, dto.password
            );

        if (!pwMatches)
            throw new ForbiddenException(
                'Senha incorreta!'
            );

        delete user.hashSenha;
        return user;
        
    }

    async signup(dto: AuthDtoSingup) {
        const hash = await argon.hash(dto.password);
        
        try {
            
            const user = await this.prisma.student.create({
                data: {
                    email: dto.email,
                    nome: dto.nome,
                    matricula: dto.matricula,
                    cpf: dto.cpf,
                    hashSenha: hash, 
                    dataNascimento: dto.dataNascimento,                
                    endereco_eth: dto.endereco_eth,
                },
            })

            delete user.hashSenha;
            return user;
            
        } catch(error) {
            if (error instanceof PrismaClientKnownRequestError)
                if (error.code === 'P2002')
                    throw new ForbiddenException(
                        'um dos dados ja existem no banco de dados!'
                    );

            throw error;
        }

        

        
    }


}