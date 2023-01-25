import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CriaUsarioDTO } from "./dto/CriaUsuario.dto";
import { UsuarioRepository } from "./usuario.repository";
import { UsuarioEntity } from "./validacao/usuario.entity";
import {v4 as uuid} from 'uuid'
import { ListaUsuarioDTO } from "./dto/ListaUsuario.dto";
import { AtualizaUsarioDTO } from "./dto/AtualizaUsuario.dto";

@Controller('/usuarios')
export class UsuarioController {
    constructor(private usuarioRepository:UsuarioRepository){}

    @Post()
    async criaUsuario(@Body() dadosDoUsuario:CriaUsarioDTO) {
        const usuarioEntity = new UsuarioEntity();
        usuarioEntity.email = dadosDoUsuario.email;
        usuarioEntity.senha = dadosDoUsuario.senha;
        usuarioEntity.nome = dadosDoUsuario.nome;
        usuarioEntity.id = uuid();

        this.usuarioRepository.salvar(usuarioEntity);
        return {usuario:  new ListaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome),
             message:'usuario criado com sucesso'}
    }

    @Get()
    async listUsuarios() {
        const usuariosSalvos =  await this.usuarioRepository.listar();
        const usuariosLista = usuariosSalvos.map(
            usuario => new ListaUsuarioDTO (
                usuario.id,
                usuario.nome
            )
        );
        return usuariosLista;
    }

    @Put('/:id')
    async atualizaUsuario(@Param('id') id: string, @Body() novosDados: AtualizaUsarioDTO){
        const usuarioAtualizado = await this.usuarioRepository.atualiza(id, novosDados);
    return {
        usuario: usuarioAtualizado,
        message: 'Usuario Atualizado com sucesso!'
    }
    }

    @Delete('/:id')
    async removeUsuario (@Param('id') id: string){
        const usuarioRemovido = await this.usuarioRepository.remove(id);

        return {
            usuario: usuarioRemovido,
            message: 'Usuário removido com sucesso'
        }
    }
}