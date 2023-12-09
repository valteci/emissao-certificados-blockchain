import {
    IsNotEmpty,
    IsString,
    IsInt,
    
} from 'class-validator';

export class CertificadoDtoEmitir {
    @IsString()
    endereco_eth: string;

    @IsNotEmpty()
    @IsString()
    matriculaAluno: string;

    @IsNotEmpty()
    @IsInt()
    idCurso: number;

    @IsString()
    dados: string;
    
}