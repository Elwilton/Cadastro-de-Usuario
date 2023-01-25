import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { EmailEhUnico } from "../validacao/email-eh-unico.validator";


export class CriaUsarioDTO{
    @IsString()
    @IsNotEmpty({ message:'Esse campo não pode ser vazio'})
    nome: string;

    @IsEmail(undefined, {message:'O email informado é inválido'})
    @EmailEhUnico({message:'Já existe um usuario com esse e-mail'})
    email: string;

    @MinLength(6, {message:'A senha deve conter no minimo 6 caracteres'})
    @IsNotEmpty()
    senha: string;
}