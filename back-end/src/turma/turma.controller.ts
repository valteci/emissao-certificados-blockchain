import { 
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Req,
    UseGuards
} from '@nestjs/common';

import { TurmaService } from './turma.service';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('turma')
export class TurmaController {

    constructor(private turma: TurmaService) {

    }

    @Get('/')
    getTodasTurmas() {
        return this.turma.getTodasTurmas(); 
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('/:id')
    deleteTurma(@Req() req: Request, @Param('id', ParseIntPipe) id : number) {
        return this.turma.deleteTurma(req.user, id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put("/update")
    updateTurma(@Req() req: Request) { //usar dto
        return this.turma.updateTurma(req.user, req.body);        
    }

    @UseGuards(AuthGuard('jwt'))
    @Post("create")
    createCurso(@Req() req: Request) { // usar dto
        return this.turma.createCurso(req.user, req.body);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post("addStudent/:matriculaEstudante/:idTurma")
    async adicionarAluno(
        @Req() req: Request,
        @Param('matriculaEstudante') matriculaEstudante: string,
        @Param('idTurma', ParseIntPipe) idTurma: number) {

            return this.turma.adicionarAluno(
                req.user,
                idTurma,
                matriculaEstudante
            );

    }

    @UseGuards(AuthGuard('jwt'))
    @Put("removeStudent/:matriculaEstudante/:idTurma")
    async removerAluno(
        @Req() req: Request,
        @Param('matriculaEstudante') matriculaEstudante: string,
        @Param('idTurma', ParseIntPipe) idTurma: number) {

            return this.turma.removerAluno(
                req.user,
                idTurma,
                matriculaEstudante
            );

    }

}
