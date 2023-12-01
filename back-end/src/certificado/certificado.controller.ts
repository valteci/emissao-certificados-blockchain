import { Controller, Get } from '@nestjs/common';
import { CertificadoService } from './certificado.service';


@Controller('certificado')
export class CertificadoController {

    constructor(private service: CertificadoService) {

    }

    @Get('publicKey')
    getPublicKey() {
        return this.service.getPublicKey();
    }

}
