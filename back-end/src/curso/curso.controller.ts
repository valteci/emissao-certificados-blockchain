import { Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
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

    @Get("/:id")
    getCurso(@Param('id', ParseIntPipe) id : number) {

        return this.cursos.getCurso(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post("create")
    createCurso(@Req() req: Request) {
        return this.cursos.createCurso(req.user, req.body);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete("/:id")
    deleteCurso(@Req() req: Request, @Param('id', ParseIntPipe) id : number) {
        return this.cursos.deleteCurso(req.user, id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put("/update")
    updateCurso(@Req() req: Request) {

        return this.cursos.updateCurso(req.user, req.body);
    }

}
