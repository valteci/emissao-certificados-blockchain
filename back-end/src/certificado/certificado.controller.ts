import { 
    Controller,
    Get,
    Post,
    Body,
    Param,
    ParseBoolPipe,
    Req,
    UseGuards
} from '@nestjs/common';

import { CertificadoService } from './certificado.service';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';


@Controller('certificado')
export class CertificadoController {

    constructor(private service: CertificadoService) {

    }

    @Get('publicKey')
    getPublicKey() {
        return this.service.getPublicKey();
    }

    @Get('verify/:contractAddress')
    VerificarCertificado(@Param('contractAddress') contractAddress : string) {
        return this.service.verificarCertificado(contractAddress);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/emitir/blockchain=:valor')
    test(@Req() req: Request, @Param('valor', ParseBoolPipe) emitirEmBlockchain: boolean) {

        this.service.verificarAutorizacao(req.user);
        this.service.emitirCertificadoInstituicao(req.body);

        if (emitirEmBlockchain)
            return this.service.emitirCertificadoBlockchain(req.body);
    }

    @Get('test')
    testarAlchemy() {
        return this.service.testarAlchemy();
    }

}
