/**
 * Classe abstrata para definir os métodos padrões de um converter entre ORM/Model e DTO
 *
 * @abstract
 * @class Converter
 * @template M - Classe Model/ORM
 */
abstract class Converter<M> {
  /**
   * Converte um DTO para Model/ORM
   *
   * @abstract
   * @param {*} dto - DTO
   * @param {M} orm - Model/ORM
   * @returns {M} Model/ORM convertido
   */
  public abstract dtoToOrm(dto: any, orm: M): M;

  /**
   * Converte um Model/ORM para DTO
   *
   * @abstract
   * @param {M} orm - Model/ORM
   * @param {*} dto - DTO
   * @returns {*} DTO convertido
   */
  public abstract ormToDto(orm: M, dto: any): any;

  /**
   * Filtra as propriedades do DTO para deixar apenas as certas
   *
   * @abstract
   * @param {*} dto - DTO para filtrar
   * @returns {*} DTO filtrado
   */
  public abstract filterPropsDto(dto: any): any;

  /**
   * @returns {M} Retorna uma nova instância do Model/ORM
   */
  public abstract getOrmNewInstance(): M;

  /**
   * Converte uma lista de DTO para uma lista de Model/ORM
   *
   * @param {any[]} dtoList - Lista de DTO
   * @returns {M[]} Lista de Model/ORM convertida
   */
  public dtoListToOrmList(dtoList: any[]): M[] {
    if (dtoList === null || dtoList === undefined) return null;

    return dtoList.map(dto => this.dtoToOrm(dto, this.getOrmNewInstance()));
  }

  /**
   * Converte uma lista de Model/ORM para uma lista de DTO
   *
   * @param {M[]} ormList - Lista de Model/ORM
   * @returns {any[]} Lista de DTO convertido
   */
  public ormListToDtoList(ormList: M[]): any[] {
    if (ormList === null || ormList === undefined) return null;

    return ormList.map(orm => this.ormToDto(orm, {}));
  }
}

export default Converter;
