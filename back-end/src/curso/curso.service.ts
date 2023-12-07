import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CursoDtoCreate } from './dto';

@Injectable({})
export class CursoService {

    constructor(private prisma: PrismaService) {
        
    }

    async getCursos() {
                
        return {
            "Programação Python": 1,
            "Inteligência Artificial": 2,
            "Desenvolvimento Web": 3,
            "Arduino": 4
        }
    }

    async createCurso(user: any, dto: CursoDtoCreate) {
        
    }

}
