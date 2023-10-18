import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {

    constructor(private service: AuthService ) {

    }

    @Post('signup')
    signup() {
        return this.service.signup();
    }

    @Post('signin')
    signin() {
        return this.service.signin();
    }
}