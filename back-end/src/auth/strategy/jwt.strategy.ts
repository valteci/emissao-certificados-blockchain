import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable()
export class JwtStrategy extends PassportStrategy(
    Strategy,
    'jwt',
) {

    constructor(config: ConfigService, private prisma: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SECRET'),
        });
    }

    async validate(payload: any) {
        
        const dadosUsuario = await this.prisma.student.findUnique({
            where: {
                email: payload.sub
            }
        })

        delete dadosUsuario.hashSenha;
        
        return dadosUsuario;
    }

}