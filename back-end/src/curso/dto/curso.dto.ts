import {
    IsNotEmpty,
    IsString,
    IsInt,

} from "class-validator";


export class CursoDtoCreate {
    
    @IsInt()
    @IsNotEmpty()
    codigoCurso: number;

    @IsString()
    @IsNotEmpty()
    nome: string

    @IsInt()
    @IsNotEmpty()
    cargaHoraria: number;

    @IsString()
    @IsNotEmpty()
    descricao: string;
}


export class CursoDtoUpdate {
    @IsInt()    
    codigoCurso: number;

    @IsString()
    nome: string

    @IsInt()    
    cargaHoraria: number;

    @IsString()    
    descricao: string;
}