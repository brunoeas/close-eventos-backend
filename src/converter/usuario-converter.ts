import Converter from './';
import Usuario from '../models/usuario';
import { formatDate } from '../util/';

/**
 * Converter do Usuário
 *
 * @class UsuarioConverter
 * @extends {Converter<Usuario>}
 */
class UsuarioConverter extends Converter<Usuario> {
  /**
   * Converte um DTO para Model/ORM
   */
  public dtoToOrm(dto: any, orm: Usuario = this.getOrmNewInstance()): Usuario {
    orm.idUsuario = dto.idUsuario;
    orm.nmUsuario = dto.nmUsuario;
    orm.dtNascimento = formatDate(dto.dtNascimento, 'YYYY-MM-DD');
    orm.nrTelefone = dto.nrTelefone;
    orm.dsEmail = dto.dsEmail;
    orm.dsLinkFoto = dto.dsLinkFoto;
    orm.tpSexo = dto.tpSexo;

    return orm;
  }

  /**
   * Converte um Model/ORM para DTO
   */
  public ormToDto(orm: Usuario, dto: any = {}) {
    dto.idUsuario = orm.idUsuario;
    dto.nmUsuario = orm.nmUsuario;
    dto.dtNascimento = formatDate(orm.dtNascimento, 'YYYY-MM-DD');
    dto.nrTelefone = orm.nrTelefone;
    dto.dsEmail = orm.dsEmail;
    dto.dsLinkFoto = orm.dsLinkFoto;
    dto.tpSexo = orm.tpSexo;

    return dto;
  }

  /**
   * Filtra as propriedades do DTO passado por parâmetro
   */
  public filterPropsDto(dto: any) {
    const { idUsuario, nmUsuario, dtNascimento, nrTelefone, dsEmail, dsSenha, dsLinkFoto, tpSexo } = dto;
    return { idUsuario, nmUsuario, dtNascimento, nrTelefone, dsEmail, dsSenha, dsLinkFoto, tpSexo };
  }

  /**
   * Retorna uma nova instância do Model/ORM
   */
  public getOrmNewInstance(): Usuario {
    return new Usuario();
  }
}

export default UsuarioConverter;
