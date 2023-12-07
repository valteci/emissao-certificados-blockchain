import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CursoDtoCreate } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable({})
export class CursoService {

    constructor(private prisma: PrismaService) {
        
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

}
