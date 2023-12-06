import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
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
}
