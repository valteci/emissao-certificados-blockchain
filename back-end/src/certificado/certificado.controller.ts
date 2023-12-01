import { Controller, Get, Post, Body, Param } from '@nestjs/common';
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

    @Get('test')
    testarAlchemy() {
        return this.service.testarAlchemy();
    }

}
