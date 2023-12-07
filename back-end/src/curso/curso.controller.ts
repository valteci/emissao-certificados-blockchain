import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CursoService } from './curso.service';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('curso')
export class CursoController {

    constructor(private cursos: CursoService) {

    }

    @Get()
    getTodosCursos() {
        return this.cursos.getTodosCursos();
    }

    @UseGuards(AuthGuard('jwt'))
    @Post("create")
    createCurso(@Req() req: Request) {
        return this.cursos.createCurso(req.user, req.body);
    }

}
