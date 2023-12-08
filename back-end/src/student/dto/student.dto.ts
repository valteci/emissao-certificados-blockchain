import {     
    IsDateString,
    IsEmail,
    IsNotEmpty,
    IsString,

} from "class-validator";

export class StudentDtoUpdateInstitucional {
    @IsNotEmpty()
    @IsString()
    matriculaAlvo: string
    
    @IsString()
    novoNome: string;
    
    @IsEmail()    
    novoEmail: string;

    @IsString()
    novoCpf: string;

    @IsDateString()
    novaDataNascimento: Date;

    @IsString()
    novoEndereco_eth: string

    @IsString()
    novaSenha: string

}
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