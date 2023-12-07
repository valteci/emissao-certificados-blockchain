import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { parseUnits } from "alchemy-sdk/dist/src/api/utils";

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
        
        let dadosUsuario = null;

        if (payload.origem === 'estudante') {
            dadosUsuario = await this.prisma.student.findUnique({
                where: {
                    email: payload.sub
                }
            })
        }
        else if (payload.origem === 'institucional') {
            dadosUsuario = await this.prisma.loginInstitucional.findUnique({
                where: {
                    email: payload.sub
                }
            })
        }

        delete dadosUsuario.hashSenha;
        
        return dadosUsuario;
    }

}