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
    @IsNotEmpty()
    codigoCursoAlvo: number
    
    @IsInt()
    novoCodigoCurso: number;

    @IsString()
    novoNome: string

    @IsInt()    
    novaCargaHoraria: number;

    @IsString()    
    novaDescricao: string;
}