import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDtoSingup, AuthDtoSignin } from "./dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable({})
export class AuthService {

    constructor(
        private prisma: PrismaService, 
        private jwt: JwtService,
        private config: ConfigService,
    ) {

        
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
        
        return this.signToken(user.matricula);
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
            
            return this.signToken(user.matricula);
            
        } catch(error) {
            if (error instanceof PrismaClientKnownRequestError)
                if (error.code === 'P2002')
                    throw new ForbiddenException(
                        'um dos dados ja existem no banco de dados!'
                    );

            throw error;
        }
    }

    async signToken(
        matricula: string,        
    ): Promise<{access_token: string}> {

        const payload = {
            sub: matricula,
        }

        const token = await this.jwt.signAsync(
            payload,
            {
                expiresIn: '15m',
                secret: this.config.get('JWT_SECRET'),
            },
        );

        return {
            access_token: token
        }

    }


}