import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CursoService } from './curso.service';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('curso')
export class CursoController {

    constructor(private cursos: CursoService) {

    }

    @Get()
    getCursos() {
        return this.cursos.getCursos();
        
    }

    @UseGuards(AuthGuard('jwt'))
    @Post("create")
    createCurso(@Req() req: Request) {
        return req.user;
        //return this.cursos.createCurso(req.user, req.body);
    }

}
