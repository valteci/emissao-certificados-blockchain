import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';


@Controller('auth')
export class AuthController {

    constructor(private service: AuthService ) {

    }

    @Post('signup')
    signup(@Body() dto: AuthDto) {
        console.log({dto});
        return this.service.signup(dto);
    }  

    @Post('signin')
    signin() {
        return this.service.signin();
    }
}