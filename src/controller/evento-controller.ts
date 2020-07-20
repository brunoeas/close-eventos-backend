import Usuario from '../models/usuario';
import Evento from '../models/evento';
import EventoConverter from '../converter/evento-converter';
import ExceptionEnum from '../exception/exception-enum';
import CustomException from '../exception/custom-exception';
import { Op } from 'sequelize';
import UsuarioConverter from '../converter/usuario-converter';

/**
 * Controller do Evento
 *
 * @class EventoController
 */
class EventoController {
  /**
   * Converter do Evento
   */
  private eventoConverter = new EventoConverter();

  /**
   * Converter do Usuário
   */
  private usuarioConverter = new UsuarioConverter();

  public async saveEvento(dto: any): Promise<any> {
    const evento = this.eventoConverter.dtoToOrm(dto);
    evento.idEvento = null;

    this.setAdministradorInOrm(evento, dto);

    return Evento.create(evento, { include: [{ model: Usuario, as: 'administrador' }] }).then(
      this.eventoConverter.ormToDto
    );
  }

  public async updateEvento(dto: any): Promise<void> {
    const evento = this.eventoConverter.dtoToOrm(dto);

    this.setAdministradorInOrm(evento, dto);

    const [numberOfAffectedRows] = await Evento.update(evento, {
      where: { idEvento: evento.idEvento }
    });

    if (numberOfAffectedRows === 0) {
      throw new CustomException(ExceptionEnum.EVENTO_INEXISTENTE);
    }
  }

  public async addParticipante(idEvento: number, idUsuario: number): Promise<void> {
    const evento = await Evento.findByPk(idEvento, {
      include: [{ model: Usuario, as: 'participantesList' }]
    });
    if (!evento) {
      throw new CustomException(ExceptionEnum.EVENTO_INEXISTENTE);
    }

    const novoParticipante = await Usuario.findByPk(idUsuario);
    if (!novoParticipante) {
      throw new CustomException(ExceptionEnum.USUARIO_INEXISTENTE);
    }

    const newParticipantes = [...evento.participantesList, novoParticipante];
    evento.setAttributes('participantesList', newParticipantes);
    evento.save();
  }

  public async deleteEventoById(id: number): Promise<void> {
    const numberOfDestroyedRows = await Evento.destroy({
      where: { [Op.or]: [{ idEvento: id }] } //, { participantesList: { [Op.contains]: id } }
    });

    if (numberOfDestroyedRows === 0) {
      throw new CustomException(ExceptionEnum.EVENTO_INEXISTENTE);
    }
  }

  /**
   * Busca um Evento pelo ID
   *
   * @param {number} id - ID do Evento
   * @returns {Promise<any>} Promise com o Evento
   */
  public async findEventoById(id: number): Promise<any> {
    const orm = await Evento.findByPk(id, { include: [{ model: Usuario, as: 'administrador' }] });

    const dto = this.eventoConverter.ormToDto(orm);
    dto.administrador = this.usuarioConverter.ormToDto(orm.administrador);

    return dto;
  }

  /**
   * Retorna todos os Evento
   *
   * @returns {Promise<any[]>} Uma Promise com todos os Eventos
   */
  public async findAllUsuarios(): Promise<any[]> {
    return Evento.findAll({ include: [{ model: Usuario, as: 'administrador' }] }).then(data =>
      data.map(orm => {
        const dto = this.eventoConverter.ormToDto(orm);
        dto.administrador = this.usuarioConverter.ormToDto(orm.administrador);
        return dto;
      })
    );
  }

  /**
   * Busca e setta o administrador no ORM do Evento
   *
   * @param {Evento} orm - ORM do Evento
   * @returns {Promise<void>} Promise
   */
  private async setAdministradorInOrm(orm: Evento, dto: any): Promise<void> {
    const usuario: Usuario = await Usuario.findByPk(dto.administrador.idUsuario);

    if (!usuario) {
      throw new CustomException(ExceptionEnum.USUARIO_INEXISTENTE);
    }

    orm.administrador = usuario;
  }
}

export default EventoController;
