import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService {
    
    signin() {
        return "i'm sign in!";
    }

    signup() {
        return "i'm sign up";
    }


}