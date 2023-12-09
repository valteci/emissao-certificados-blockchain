import {
    IsNotEmpty,
    IsString,
    IsInt,
    
} from 'class-validator';

export class CertificadoDtoEmitir {

    @IsNotEmpty()
    @IsString()
    matriculaAluno: string;

    @IsNotEmpty()
    @IsInt()
    idCurso: number;

    @IsString()
    dados: string;
    
}