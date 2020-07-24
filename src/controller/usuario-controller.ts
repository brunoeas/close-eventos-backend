import Usuario from '../models/usuario';
import Evento from '../models/evento';
import UsuarioConverter from '../converter/usuario-converter';
import ExceptionEnum from '../exception/exception-enum';
import CustomException from '../exception/custom-exception';
import { formatDate } from '../util';
import EventoUsuario from '../models/evento-usuario';

/**
 * Controller do Usuário
 *
 * @class UsuarioController
 */
class UsuarioController {
  /**
   * Converter do Usuário
   */
  private usuarioConverter = new UsuarioConverter();

  /**
   * Valida o login
   *
   * @param {*} dto - DTO com os dados para login
   */
  public async login(dto: any) {
    const usuario = await Usuario.findOne({ where: { dsEmail: dto.dsEmail, dsSenha: dto.dsSenha } });
    if (!usuario) {
      throw new CustomException(ExceptionEnum.USUARIO_INEXISTENTE);
    }
  }

  /**
   * Retorna o usuário logado
   *
   * @param {Usuario} userLogged - Usuário logado
   * @returns DTO do usuário logado
   */
  public async findPerfil(userLogged: Usuario) {
    return this.usuarioConverter.ormToDto(userLogged);
  }

  /**
   * Salva um novo Usuário
   *
   * @param {*} dto - DTO do Usuário
   * @returns {Promise<any>} Promise com o Usuário criado
   */
  public async saveUsuario(dto: any): Promise<any> {
    const countWithSameEmail = await Usuario.count({ where: { dsEmail: dto.dsEmail } });
    if (countWithSameEmail > 0) {
      throw new CustomException(ExceptionEnum.EMAIL_DUPLICADO);
    }

    const usuario = this.usuarioConverter.filterPropsDto(dto);
    usuario.idUsuario = null;
    usuario.dtNascimento = formatDate(dto.dtNascimento, 'YYYY-MM-DD');

    return Usuario.create(usuario, { logging: true }).then(this.usuarioConverter.ormToDto);
  }

  /**
   * Atualiza um Usuário
   *
   * @param {*} dto - DTO do Usuário
   * @returns {Promise<any>} Promise
   */
  public async updateUsuario(dto: any): Promise<any> {
    const usuario = this.usuarioConverter.filterPropsDto(dto);
    usuario.dtNascimento = formatDate(dto.dtNascimento, 'YYYY-MM-DD');

    const [numberOfAffectedRows, [dtoUpdated]] = await Usuario.update(usuario, {
      where: { idUsuario: usuario.idUsuario },
      returning: true
    });

    if (numberOfAffectedRows === 0) {
      throw new CustomException(ExceptionEnum.USUARIO_INEXISTENTE);
    }

    return this.usuarioConverter.ormToDto(dtoUpdated);
  }

  /**
   * Deleta um Usuário pelo ID
   *
   * @param {number} id - ID do Usuário
   * @returns {Promise<any>} - Promise void
   */
  public async deleteUsuarioById(id: number): Promise<void> {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      throw new CustomException(ExceptionEnum.USUARIO_INEXISTENTE);
    }

    await EventoUsuario.destroy({ where: { idUsuario: id } });

    const eventos = await Evento.findAll({ where: { idAdministrador: id } });
    const promises = eventos.map(async evento => {
      await EventoUsuario.destroy({ where: { idEvento: evento.idEvento } });
      return evento.destroy();
    });
    await Promise.all(promises);

    return usuario.destroy();
  }

  /**
   * Busca um Usuário pelo ID
   *
   * @param {number} id - ID do Usuário
   * @returns {Promise<any>} Promise com o Usuário
   */
  public async findUsuarioById(id: number): Promise<any> {
    const usuarioORM = await Usuario.findByPk(id);
    if (!usuarioORM) {
      throw new CustomException(ExceptionEnum.USUARIO_INEXISTENTE);
    }

    return this.usuarioConverter.ormToDto(usuarioORM);
  }

  /**
   * Retorna todos os Usuário
   *
   * @returns {Promise<any[]>} Uma Promise com todos os Usuários
   */
  public async findAllUsuarios(): Promise<any[]> {
    return Usuario.findAll().then(data => data.map(orm => this.usuarioConverter.ormToDto(orm)));
  }
}

export default UsuarioController;
