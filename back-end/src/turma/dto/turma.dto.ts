import {
    IsInt,
    IsDateString,
    IsNotEmpty,
    IsInstance
} from 'class-validator'


export class TurmaDtoCreate {
    @IsInt()
    @IsNotEmpty()
    codigoTurma: number;

    @IsDateString()
    @IsNotEmpty()
    dataInicio: Date;

    @IsDateString()
    @IsNotEmpty()
    dataFim: Date;

    @IsInt()
    @IsNotEmpty()
    codigoCurso: number;
}

export class TurmaDtoUpdate {

    @IsInt()
    @IsNotEmpty()
    codigoTurmaAlvo: number;

    @IsInt()
    novoCodigoTurma: number;

    @IsDateString()
    novaDataInicio: Date;

    @IsDateString()
    novaDataFim: Date;

    @IsInt()
    novoCodigoCurso: number;
}
