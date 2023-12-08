import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Body } from '@nestjs/common';
import * as argon from 'argon2';
import { 
    StudentDtoUpdate,
    StudentDtoUpdateInstitucional
 } from './dto';

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

    async getTodosAlunos(user: any) {

        const dadosUsuario = await this.prisma.loginInstitucional.findUnique({
            where: {
                email: user.email
            }
        })

        if (!dadosUsuario)
            throw new UnauthorizedException('Acesso não autorizado');
        
        const alunos = await this.prisma.student.findMany({
            select: {
                matricula: true,
                cpf: true,
                nome: true,
                dataNascimento: true,
                endereco_eth: true,
                email: true
            }
        });

        return alunos;
    }

    async getAluno(user: any, matricula: string) {
        const dadosUsuario = await this.prisma.loginInstitucional.findUnique({
            where: {
                email: user.email
            }
        })

        if (!dadosUsuario)
            throw new UnauthorizedException('Acesso não autorizado');

        try {
            const aluno = await this.prisma.student.findUnique({
                where: {
                    matricula: matricula
                },
                select: {
                    matricula: true,
                    cpf: true,
                    nome: true,
                    dataNascimento: true,
                    endereco_eth: true,
                    email: true
                }
            })

            if (!aluno)
                throw new ForbiddenException(
                    'Estudante Não Cadastrado!'
                );

            return aluno;

        } catch(erro) {
            if (erro instanceof PrismaClientKnownRequestError)
                if (erro.code === 'P2025')
                    throw new ForbiddenException(
                        'Estudante Não Cadastrado!'
                    );

            throw erro;

        }
    }

    async deleteAluno(user: any, matricula: string) {
        try {
            const dadosUsuario = await this.prisma.loginInstitucional.findUnique({
                where: {
                    email: user.email
                }
            })            
    
            if (!dadosUsuario)
                throw new UnauthorizedException('Acesso não autorizado');

            await this.prisma.student.delete({
                where: {
                    matricula: matricula
                }
            })


        } catch(erro) {
            if (erro instanceof PrismaClientKnownRequestError)
                if (erro.code === 'P2025')
                    throw new ForbiddenException(
                        'Estudante Não Cadastrado!'
                    );

            throw erro;

        }
    }

    async updateInstitucional(user: any, dto: StudentDtoUpdateInstitucional) {
        try {
            const dadosUsuario = await this.prisma.loginInstitucional.findUnique({
                where: {
                    email: user.email
                }
            })
    
            if (!dadosUsuario)
                throw new UnauthorizedException('Acesso não autorizado');
                

            const dados = { };

            if (dto.novoCpf)
                dados['cpf'] = dto.novoCpf;
            if (dto.novaDataNascimento)
                dados['dataNascimento'] = dto.novaDataNascimento;
            if (dto.novoNome)
                dados['nome'] = dto.novoNome;
            if (dto.novoEmail)
                dados['email'] = dto.novoEmail;
            if (dto.novoEndereco_eth)
                dados['endereco_eth'] = dto.novoEndereco_eth;
            if (dto.novaSenha)
                dados['hashSenha'] = await argon.hash(dto.novaSenha);

            
            
            await this.prisma.student.update({
                where: {matricula: dto.matriculaAlvo},
                data: dados
            });


        } catch(erro) {
            if (erro instanceof PrismaClientKnownRequestError)
                if (erro.code === 'P2025')
                    throw new ForbiddenException(
                        'Estudante Não Cadastrado!'
                    );

            throw erro;
        }
    }
}
