import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('students')
export class StudentController {

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    getMe(@Req() req: Request) {        
        
        console.log({
            user: req.user,
        })      
        
        return 'asdfsdf';
    }
}
