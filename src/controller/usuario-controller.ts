import Usuario from '../models/usuario';
import Evento from '../models/evento';
import UsuarioConverter from '../converter/usuario-converter';
import ExceptionEnum from '../exception/exception-enum';
import CustomException from '../exception/custom-exception';
import { Op } from 'sequelize';
import { formatDate } from '../util';

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
  public async updateUsuario(dto: any): Promise<void> {
    const usuario = this.usuarioConverter.filterPropsDto(dto);
    usuario.dtNascimento = formatDate(dto.dtNascimento, 'YYYY-MM-DD');

    const [numberOfAffectedRows] = await Usuario.update(usuario, {
      where: { idUsuario: usuario.idUsuario }
    });

    if (numberOfAffectedRows === 0) {
      throw new CustomException(ExceptionEnum.USUARIO_INEXISTENTE);
    }
  }

  /**
   * Deleta um Usuário pelo ID
   *
   * @param {number} id - ID do Usuário
   * @returns {Promise<any>} - Promise void
   */
  public async deleteUsuarioById(id: number): Promise<void> {
    await Evento.destroy({ where: { idAdministrador: id }, logging: true });
    const numberOfDestroyedRows = await Usuario.destroy({ where: { idUsuario: id } });

    if (numberOfDestroyedRows === 0) {
      throw new CustomException(ExceptionEnum.USUARIO_INEXISTENTE);
    }
  }

  /**
   * Busca um Usuário pelo ID
   *
   * @param {number} id - ID do Usuário
   * @returns {Promise<any>} Promise com o Usuário
   */
  public async findUsuarioById(id: number): Promise<any> {
    const usuarioORM = await Usuario.findByPk(id);
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
