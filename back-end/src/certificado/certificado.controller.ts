import { Controller, Get, Post, Body, Param, ParseBoolPipe } from '@nestjs/common';
import { CertificadoService } from './certificado.service';


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

    @Post('/emitir/blockchain=:valor')
    test(@Param('valor', ParseBoolPipe) val: boolean) {
        console.log(val);
    }

    @Get('test')
    testarAlchemy() {
        return this.service.testarAlchemy();
    }

}
