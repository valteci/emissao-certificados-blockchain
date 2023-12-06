import {     
    IsDateString,
    IsEmail,
    IsNotEmpty,
    IsString,

} from "class-validator";

export class StudentDtoUpdate {
    @IsString()    
    nome: string;
    
    @IsEmail()    
    email: string;

    @IsString()
    cpf: string;

    @IsDateString()
    dataNascimento: Date;

    @IsString()
    endereco_eth: string
}