import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CursoDtoCreate, CursoDtoUpdate } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable({})
export class CursoService {

    constructor(private prisma: PrismaService) {
        
    }

    async getCurso(id: number) {
        const curso = await this.prisma.curso.findUnique({
            where: {
                id: id
            }
        });
        

        if (!curso) {            
            throw new ForbiddenException(
                'Curso Não Cadastrado'
            );
        }

        return curso;

    }

    async getTodosCursos() {

        const cursos = await this.prisma.curso.findMany();
        return cursos;
    }

    async createCurso(user: any, dto: CursoDtoCreate) {

        try {
            const dadosUsuario = await this.prisma.loginInstitucional.findUnique({
                where: {
                    email: user.email
                }
            })
    
            if (!dadosUsuario)
                throw new UnauthorizedException('Acesso não autorizado');
        
            await this.prisma.curso.create({
                data: {
                    id: dto.codigoCurso,
                    nome: dto.nome,
                    cargaHoraria: dto.cargaHoraria,
                    descricao: dto.descricao
                }
            })

        } catch(error) {
            
            if (error instanceof PrismaClientKnownRequestError)
                if (error.code === 'P2002')
                    throw new ForbiddenException(
                        'Curso Já Existe!'
                    );

            throw error;
        }
        


    
    }

    async deleteCurso(user: any, id: number) {
        try {
            
            const dadosUsuario = await this.prisma.loginInstitucional.findUnique({
                where: {
                    email: user.email
                }
            })
    
            if (!dadosUsuario)
                throw new UnauthorizedException('Acesso não autorizado');
    
            
            const curso = await this.prisma.curso.delete({
                where: {
                    id: id
                }
            });
                
            if (!curso)
                throw new ForbiddenException(
                    'Curso Não Cadastrado'
                );

        } catch(erro) {
            if (erro instanceof PrismaClientKnownRequestError)
                if (erro.code === 'P2025')
                    throw new ForbiddenException(
                        'Curso Não Cadastrado!'
                    );

            throw erro;
        }

    }

    async updateCurso(user: any, dto: CursoDtoUpdate) {
        try {

            const dadosUsuario = await this.prisma.loginInstitucional.findUnique({
                where: {
                    email: user.email
                }
            })
    
            if (!dadosUsuario)
                throw new UnauthorizedException('Acesso não autorizado');

            let dadosAtualizar = {};

            if (dto.novoCodigoCurso)
                dadosAtualizar['id'] = dto.novoCodigoCurso;
            if (dto.novoNome)
                dadosAtualizar['nome'] = dto.novoNome;
            if (dto.novaCargaHoraria)
                dadosAtualizar['cargaHoraria'] = dto.novaCargaHoraria;
            if (dto.novaDescricao)
                dadosAtualizar['descricao'] = dto.novaDescricao;

            console.log(dadosAtualizar);

            const curso = await this.prisma.curso.update({
                where: {
                    id: dto.codigoCursoAlvo
                },

                data: dadosAtualizar
            })

            if (!curso) {            
                throw new ForbiddenException(
                    'Curso Não Cadastrado'
                );
            }


        } catch(erro) {
            if (erro instanceof PrismaClientKnownRequestError)
                if (erro.code === 'P2025')
                    throw new ForbiddenException(
                        'Curso Não Cadastrado!'
                    );
                

            throw erro;
        }
    }
}


