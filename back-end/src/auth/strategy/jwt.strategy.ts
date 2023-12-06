import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(
    Strategy,
    'jwt',
) {

    constructor(config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SECRET'),
        });
    }

    async validate(payload: any) {
        
        console.log(payload)
        const dadosUsuario = {
            a: "asdfsadfsfd",
            b: "asdfasfasdfsadfsa",
            c: 124123,
            d: false
        }
        return dadosUsuario;
    }

}