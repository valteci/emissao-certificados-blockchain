import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { TurmaDtoCreate, TurmaDtoUpdate } from './dto';


@Injectable({})
export class TurmaService {

    constructor(private prisma: PrismaService) {

    }

    async removerAluno(user: any, idTurma: number, matriculaAluno: string) {
        try {
            const dadosUsuario = await this.prisma.loginInstitucional.findUnique({
                where: {
                    email: user.email
                }
            })
    
            if (!dadosUsuario)
                throw new UnauthorizedException('Acesso não autorizado');
    
            const remover = await this.prisma.turma.update({
                where: {id: idTurma},
                data: {
                    students: {
                        disconnect: { matricula: matriculaAluno }
                    }
                }
            })

        } catch(erro) {
            console.log(erro.code);
            if (erro instanceof PrismaClientKnownRequestError) {
                if (erro.code === 'P2016')
                    throw new ForbiddenException(
                        'Estudante ou Turma Não Cadastrado!'
                    );                
                if (erro.code === 'P2003')
                    throw new ForbiddenException(
                        'Estudante ou Turma Não Cadastrado!'
                    );
            }

            throw erro;
        }
    }


    async adicionarAluno(user: any, idTurma: number, matriculaAluno: string) {
        try {
            const dadosUsuario = await this.prisma.loginInstitucional.findUnique({
                where: {
                    email: user.email
                }
            })
    
            if (!dadosUsuario)
                throw new UnauthorizedException('Acesso não autorizado');
    
            const adicionar = await this.prisma.turma.update({
                where: {id: idTurma},
                data: {
                    students: {
                        connect: { matricula: matriculaAluno }
                    }
                }
            })

        } catch(erro) {
            console.log(erro.code);
            if (erro instanceof PrismaClientKnownRequestError) {
                if (erro.code === 'P2016')
                    throw new ForbiddenException(
                        'Estudante ou Turma Não Cadastrado!'
                    );                
                if (erro.code === 'P2003')
                    throw new ForbiddenException(
                        'Estudante ou Turma Não Cadastrado!'
                    );
            }

            throw erro;
        }
    }

    async getTodasTurmas() {

        const turmas = await this.prisma.turma.findMany({
            include: {
                curso: true
            }
        });
        return turmas;
    }

    async deleteTurma(user: any, id: number) {
        try {
            const dadosUsuario = await this.prisma.loginInstitucional.findUnique({
                where: {
                    email: user.email
                }
            })
    
            if (!dadosUsuario)
                throw new UnauthorizedException('Acesso não autorizado');
    
            
            const turma = await this.prisma.turma.delete({
                where: {
                    id: id
                }
            });
                
            if (!turma)
                throw new ForbiddenException(
                    'Curso Não Cadastrado'
                );

        } catch(erro) {
            if (erro instanceof PrismaClientKnownRequestError)
                if (erro.code === 'P2025')
                    throw new ForbiddenException(
                        'Turma Não Cadastrada!'
                    );

            throw erro;
        }
    }

    async updateTurma(user: any, dto: TurmaDtoUpdate) {
        try {

            const dadosUsuario = await this.prisma.loginInstitucional.findUnique({
                where: {
                    email: user.email
                }
            })
    
            if (!dadosUsuario)
                throw new UnauthorizedException('Acesso não autorizado');

            let dadosAtualizar = {};

            if (dto.novoCodigoTurma)
                dadosAtualizar['id'] = dto.novoCodigoTurma;
            if (dto.novaDataInicio)
                dadosAtualizar['dataInicio'] = dto.novaDataInicio;
            if (dto.novaDataFim)
                dadosAtualizar['dataFim'] = dto.novaDataFim;
            if (dto.novoCodigoCurso)
                dadosAtualizar['idCurso'] = dto.novoCodigoCurso;            

            const turma = await this.prisma.turma.update({
                where: {
                    id: dto.codigoTurmaAlvo
                },

                data: dadosAtualizar
            })

            if (!turma) {            
                throw new ForbiddenException(
                    'Turma Não Cadastrada!'
                );
            }


        } catch(erro) {
            console.log(erro.code);
            if (erro instanceof PrismaClientKnownRequestError) {
                if (erro.code === 'P2025')
                    throw new ForbiddenException(
                        'Turma Não Cadastrada!'
                    );
                if (erro.code === 'P2002')
                    throw new ForbiddenException(
                        'O Novo Código Do Curso Já Existe!'
                    );
                if (erro.code === 'P2003')
                    throw new ForbiddenException(
                        'Curso Não Existe!'
                    );
            }

            throw erro;
        }
    }

    async createCurso(user: any, dto: TurmaDtoCreate) {
        try {
            const dadosUsuario = await this.prisma.loginInstitucional.findUnique({
                where: {
                    email: user.email
                }
            })
    
            if (!dadosUsuario)
                throw new UnauthorizedException('Acesso não autorizado');
        
            await this.prisma.turma.create({
                data: {
                    id: dto.codigoTurma,
                    dataInicio: dto.dataInicio,
                    dataFim: dto.dataFim,
                    idCurso: dto.codigoCurso
                }
            })

        } catch(error) {
            
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') // violação de unique
                    throw new ForbiddenException(
                        'Turma Já Existe!'
                    );
                if (error.code === 'P2003') // restrição de integridade violada
                    throw new ForbiddenException(
                        'Não Existe Curso Com Esse Código'
                    );
            }

            throw error;
        }
    }

    async getAlunosTurma(id: number) {

        const alunosDaTurma = await this.prisma.turma.findUnique({
            where: { id: id },
            include: {
                students: { 
                    select: {
                        nome: true,
                        cpf: true,
                        matricula: true,
                        dataNascimento: true,
                        endereco_eth: true,
                        email: true
                    }
                }
            }
        });

        return alunosDaTurma;
    }
}


