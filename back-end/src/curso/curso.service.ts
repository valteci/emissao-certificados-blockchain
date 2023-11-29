import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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

}
