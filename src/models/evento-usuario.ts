import getDefaultTableConfig from '../config/default-table-config';
import { Model, DataTypes } from 'sequelize';
import Usuario from './usuario';
import Evento from './evento';

/**
 * Entidade EventoUsuário
 *
 * @class EventoUsuario
 * @extends {Model}
 */
class EventoUsuario extends Model {
  /**
   * Identificador
   */
  public idEventoUsuario: number;

  /**
   * Evento
   */
  public evento: Evento;

  /**
   * ID do Evento
   */
  public idEvento: number;

  /**
   * Usuário
   */
  public usuario: Usuario;

  /**
   * ID do Usuário
   */
  public idUsuario: number;
}

/**
 * Inicia a entidade EventoUsuário
 */
EventoUsuario.init(
  {
    idEventoUsuario: {
      field: 'id_eventousuario',
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    idEvento: {
      field: 'id_evento',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Evento,
        key: 'id_evento'
      }
    },
    idUsuario: {
      field: 'id_usuario',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Usuario,
        key: 'id_usuario'
      }
    }
  },
  getDefaultTableConfig({ tableName: 'eventousuario' })
);

Evento.belongsToMany(Usuario, {
  through: EventoUsuario,
  foreignKey: 'idEvento',
  as: 'participantesList'
});
Usuario.belongsToMany(Evento, {
  through: EventoUsuario,
  foreignKey: 'idUsuario'
});

export default EventoUsuario;
