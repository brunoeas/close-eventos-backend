import Converter from './';
import Evento from '../models/evento';
import { formatDate } from '../util/';

/**
 * Converter do Evento
 *
 * @class EventoConverter
 * @extends {Converter<Evento>}
 */
class EventoConverter extends Converter<Evento> {
  /**
   * Converte um DTO para Model/ORM
   */
  public dtoToOrm(dto: any, orm: Evento = this.getOrmNewInstance()): Evento {
    orm.idEvento = dto.idEvento;
    orm.dsTitulo = dto.dsTitulo;
    orm.dsEvento = dto.dsEvento;
    orm.dhInicio = formatDate(dto.dhInicio);
    orm.nrDuracao = dto.nrDuracao;
    orm.dsLinkFoto = dto.dsLinkFoto;
    orm.dsRua = dto.dsRua;
    orm.dsBairro = dto.dsBairro;
    orm.nrEndereco = dto.nrEndereco;
    orm.dsComplemento = dto.dsComplemento;
    orm.idMunicipio = dto.idMunicipio;
    orm.idUF = dto.idUF;

    return orm;
  }

  /**
   * Converte um Model/ORM para DTO
   */
  public ormToDto(orm: Evento, dto: any = {}) {
    dto.idEvento = orm.idEvento;
    dto.dsTitulo = orm.dsTitulo;
    dto.dsEvento = orm.dsEvento;
    dto.dhInicio = formatDate(orm.dhInicio);
    dto.nrDuracao = orm.nrDuracao;
    dto.dsLinkFoto = orm.dsLinkFoto;
    dto.dsRua = orm.dsRua;
    dto.dsBairro = orm.dsBairro;
    dto.nrEndereco = orm.nrEndereco;
    dto.dsComplemento = orm.dsComplemento;
    dto.idMunicipio = orm.idMunicipio;
    dto.idUF = orm.idUF;

    return dto;
  }

  /**
   * Filtra as propriedades do DTO passado por parâmetro
   */
  public filterPropsDto(dto: any) {
    const {
      idEvento,
      dsTitulo,
      dsEvento,
      dhInicio,
      nrDuracao,
      dsLinkFoto,
      dsRua,
      dsBairro,
      nrEndereco,
      dsComplemento,
      idMunicipio,
      idUF
    } = dto;
    return {
      idEvento,
      dsTitulo,
      dsEvento,
      dhInicio,
      nrDuracao,
      dsLinkFoto,
      dsRua,
      dsBairro,
      nrEndereco,
      dsComplemento,
      idMunicipio,
      idUF
    };
  }

  /**
   * Retorna uma nova instância do Model/ORM
   */
  public getOrmNewInstance(): Evento {
    return new Evento();
  }
}

export default EventoConverter;
