import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Network, Alchemy } from 'alchemy-sdk';

@Injectable({})
export class CertificadoService {
    constructor(private config: ConfigService) {

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

    async emitirCertificado(user: any, dto: any, emitirBlockchain: boolean) {


    }

}
