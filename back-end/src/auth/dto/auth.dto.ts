import {     
    IsDateString,
    IsEmail,
    IsNotEmpty,    
    IsString,     

} from "class-validator";

export class AuthDtoSignin {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}


export class AuthDtoSingup {
    
    @IsString()
    @IsNotEmpty()
    nome: string;
    
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    cpf: string;

    @IsString()
    @IsNotEmpty()
    matricula : string;

    @IsDateString()
    @IsNotEmpty()
    dataNascimento: Date;

    @IsString()
    @IsNotEmpty()
    endereco_eth: string

}