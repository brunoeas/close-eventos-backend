import Usuario from '../models/usuario';
import Evento from '../models/evento';
import EventoConverter from '../converter/evento-converter';
import ExceptionEnum from '../exception/exception-enum';
import CustomException from '../exception/custom-exception';
import UsuarioConverter from '../converter/usuario-converter';
import EventoUsuario from '../models/evento-usuario';
import SituacaoParticipanteEnum from '../enumeration/situacao-participante-enum';

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

  /**
   * Salva um novo evento
   *
   * @param {*} dto - DTO do novo evento
   * @returns {Promise<any>} Promise com o objeto do novo evento
   */
  public async saveEvento(dto: any): Promise<any> {
    const evento = this.eventoConverter.filterPropsDto(dto);
    evento.idEvento = null;

    await this.setAdministradorInOrm(evento);

    return Evento.create(evento).then(this.eventoConverter.ormToDto);
  }

  /**
   * Atualiza um evento
   *
   * @param {*} dto - DTO do evento
   * @returns {Promise<void>} Promise
   */
  public async updateEvento(dto: any): Promise<void> {
    const evento = this.eventoConverter.filterPropsDto(dto);

    await this.setAdministradorInOrm(evento);

    const [numberOfAffectedRows] = await Evento.update(evento, {
      where: { idEvento: evento.idEvento }
    });

    if (numberOfAffectedRows === 0) {
      throw new CustomException(ExceptionEnum.EVENTO_INEXISTENTE);
    }
  }

  /**
   * Adiciona um novo participante em um evento
   *
   * @param {number} idEvento - ID do evento que vai ser relacionado
   * @param {number} idUsuario - ID do usuário/participante
   * @returns {Promise<void>} Promise
   */
  public async addParticipante(idEvento: number, idUsuario: number): Promise<void> {
    await this.validateEventoAndUsuario(idEvento, idUsuario);

    const [values, isNew] = await EventoUsuario.findOrCreate({ where: { idEvento, idUsuario } });
    if (!isNew) {
      throw new CustomException(ExceptionEnum.PARTICIPANTE_DUPLICADO);
    }
  }

  /**
   * Remove um participante de um evento
   *
   * @param {number} idEvento - ID do evento que vai ser relacionado
   * @param {number} idUsuario - ID do usuário/participante
   * @returns {Promise<void>} Promise
   */
  public async removeParticipante(idEvento: number, idUsuario: number): Promise<void> {
    await this.validateEventoAndUsuario(idEvento, idUsuario);

    const numberOfDeletedRows = await EventoUsuario.destroy({ where: { idEvento, idUsuario } });
    if (numberOfDeletedRows === 0) {
      throw new CustomException(ExceptionEnum.PARTICIPANTE_INEXISTENTE);
    }
  }

  /**
   * Deleta um evento pelo ID
   *
   * @param {number} id - ID do evento
   * @returns {Promise<void>} Promise
   */
  public async deleteEventoById(id: number): Promise<void> {
    const evento = await Evento.findByPk(id);
    if (!evento) {
      throw new CustomException(ExceptionEnum.EVENTO_INEXISTENTE);
    }

    await EventoUsuario.destroy({ where: { idEvento: evento.idEvento } });

    return evento.destroy();
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
   * @param {Usuario} usuarioLogado - Usuário logado que mandou a request
   * @returns {Promise<any[]>} Uma Promise com todos os Eventos
   */
  public async findAllEventos(usuarioLogado: Usuario): Promise<any[]> {
    return Evento.findAll({
      order: [['dhInicio', 'DESC']],
      include: [
        { model: Usuario, as: 'administrador' },
        { model: EventoUsuario, as: 'participantesList', include: [{ model: Usuario, as: 'usuario' }] }
      ]
    }).then(data =>
      data.map(orm => {
        const dto = this.eventoConverter.ormToDto(orm);
        dto.administrador = this.usuarioConverter.ormToDto(orm.administrador);

        const participantesOrmList = orm.participantesList.map(eventoUsuario => eventoUsuario.usuario);
        dto.participantesList = this.usuarioConverter.ormListToDtoList(participantesOrmList);

        const isParticipante =
          dto.participantesList.find(
            (participante: any) => participante.idUsuario === usuarioLogado.idUsuario
          ) !== undefined;

        dto.stParticipante = isParticipante
          ? SituacaoParticipanteEnum.CONFIRMADO
          : SituacaoParticipanteEnum.NAO_CONFIRMADO;

        return dto;
      })
    );
  }

  /**
   * Valida os ID's de um evento e um usuário
   *
   * @private
   * @param {number} idEvento - ID do Evento
   * @param {number} idUsuario - ID do Usuário
   * @returns {Promise<void>} Promise
   */
  private async validateEventoAndUsuario(idEvento: number, idUsuario: number): Promise<void> {
    const countEvento = await Evento.count({ where: { idEvento } });
    if (countEvento === 0) {
      throw new CustomException(ExceptionEnum.EVENTO_INEXISTENTE);
    }

    const countUsuario = await Usuario.count({ where: { idUsuario } });
    if (countUsuario === 0) {
      throw new CustomException(ExceptionEnum.USUARIO_INEXISTENTE);
    }
  }

  /**
   * Busca e setta o administrador no ORM do Evento
   *
   * @param {Evento} orm - ORM do Evento
   * @returns {Promise<void>} Promise
   */
  private async setAdministradorInOrm(dto: any): Promise<void> {
    const countUsuario = await Usuario.count({ where: { idUsuario: dto.administrador.idUsuario } });
    if (countUsuario === 0) {
      throw new CustomException(ExceptionEnum.USUARIO_INEXISTENTE);
    }

    dto.idAdministrador = dto.administrador.idUsuario;
  }
}

export default EventoController;
