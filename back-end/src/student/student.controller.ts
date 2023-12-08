import { Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { StudentService } from './student.service';


@Controller('students')
export class StudentController {

    constructor(private studentService: StudentService) {

    }

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    getMe(@Req() req: Request) {
        return req.user;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('update')
    updateStudent(@Req() req: Request) {
        const user = req.user;
        return this.studentService.updateStudent(user, req.body);
    }


    @UseGuards(AuthGuard('jwt'))
    @Get('/') 
    getTodosAlunos(@Req() req: Request) { // pegar todos
        return this.studentService.getTodosAlunos(req.user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/:matricula')
    getAluno(@Req() req: Request, @Param('matricula') matricula: string) { // pegar 1 aluno
        return this.studentService.getAluno(req.user, matricula);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('/:matricula')
    deleteAluno(@Req() req: Request, @Param('matricula') matricula: string) {
        return this.studentService.deleteAluno(req.user, matricula);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('updateInstitucional')
    updateInstitucional(@Req() req: Request) {
        return this.studentService.updateInstitucional(req.user, req.body);
    }


}
