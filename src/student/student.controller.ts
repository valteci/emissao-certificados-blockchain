import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('students')
export class StudentController {

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    getMe() {
        return 'user info';
    }
}
