import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDtoSingup, AuthDtoSignin } from './dto';

@Controller('auth')
export class AuthController {

    constructor(private service: AuthService ) {

    }

    @Post('signup')
    signup(@Body() dto: AuthDtoSingup) {
        return this.service.signup(dto);
    }

    @Post('signin')
    signin(@Body() dto: AuthDtoSignin) {
        return this.service.signin(dto);
    }

    @Post('signinInstitucional')
    signinInstitucional(@Body() dto: AuthDtoSignin) {
        return this.service.signinInstitucional(dto);
    }

    @Post('signupInstitucional')
    signupInstitucional(@Body() dto: AuthDtoSignin) {
        return this.service.signupInstitucional(dto);
    }
}