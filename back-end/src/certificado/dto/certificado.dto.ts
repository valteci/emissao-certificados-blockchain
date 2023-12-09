import {
    IsNotEmpty,
    IsString,
    
} from 'class-validator';

export class certificadoDtoEmitir {
    @IsString()
    endereco_eth: string;

    @IsNotEmpty()
    @IsString()
    matriculaAluno: string;

    @IsNotEmpty()
    @IsString()
    idCurso: string;

    @IsString()
    dados: string;
    
}