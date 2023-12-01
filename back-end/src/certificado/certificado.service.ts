import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class CertificadoService {
    constructor(private config: ConfigService) {

    }

    async getPublicKey() {
        return {
            publicKey: this.config.get('PUBLIC_KEY')
        }
    }
}
