import { Controller, Get, Req, UseGuards } from '@nestjs/common';
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
}
