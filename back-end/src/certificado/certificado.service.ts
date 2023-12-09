import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Network, Alchemy } from 'alchemy-sdk';
import { PrismaService } from 'src/prisma/prisma.service';
import { CertificadoDtoEmitir } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable({})
export class CertificadoService {
    constructor(private config: ConfigService, private prisma: PrismaService) {

    }

    async getPublicKey() {
        return {
            publicKey: this.config.get('PUBLIC_KEY')
        }
    }

    async verificarCertificado(contractAddress : string) {
        if (contractAddress.slice(0, 2) === '0x')
            contractAddress = contractAddress.slice(2);

        if (contractAddress.length !== 40)
            throw new Error('Endereço Inválido!');        
        
    }

    async testarAlchemy() {
        const settings = {
            apiKey: this.config.get('SEPOLIA_API_KEY'),
            network: Network.ETH_SEPOLIA
        }

        const alchemy  = new Alchemy(settings);
        const ultimoBloco = await alchemy.core.getBlockNumber();

        return ultimoBloco;

    }

    async verificarAutorizacao(user: any) {
        const dadosUsuario = await this.prisma.loginInstitucional.findUnique({
            where: {
                email: user.email
            }
        })

        if (!dadosUsuario)
            throw new UnauthorizedException('Acesso não autorizado');
    }

    async emitirCertificadoBlockchain(dto: CertificadoDtoEmitir) {


    }

    async emitirCertificadoInstituicao(dto: CertificadoDtoEmitir) {

        

        const endereco_eth = await this.prisma.student.findUnique({
            where: {
                matricula: dto.matriculaAluno
            },
            select: {
                endereco_eth: true
            }
        });
        
        await this.prisma.certificado.create({
            data: {
                endereco_eth: endereco_eth.endereco_eth,
                dados: dto.dados,
                studentMatricula: dto.matriculaAluno,
                idCurso: dto.idCurso
            }
        })
    }

}
