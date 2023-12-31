import { 
    Controller,
    Get,
    Post,
    Body,
    Param,
    ParseBoolPipe,
    Req,
    UseGuards,
    ParseIntPipe,
    Res
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
    async emitirCertificado(@Req() req: Request, @Param('valor', ParseBoolPipe) emitirEmBlockchain: boolean) {

        let resposta = {};

        if (emitirEmBlockchain)
            resposta = await this.service.emitirCertificadoBlockchain(req.body);

        this.service.verificarAutorizacao(req.user);
        this.service.emitirCertificadoInstituicao(req.body, resposta['enderecoContrato']);

        return resposta;
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/gerarPdf/:id')
    gerarPDF(@Res() res, @Req() req: Request, @Param('id', ParseIntPipe) id: number) {

        return this.service.gerarPDF(req.user, res, id);
    }


}
