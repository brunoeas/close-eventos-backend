import getDefaultTableConfig from '../config/default-table-config';
import { Model, DataTypes } from 'sequelize';
import Usuario from './usuario';

/**
 * Modelo do Eveno
 *
 * @class Evento
 * @extends {Model}
 */
class Evento extends Model {
  /**
   * Identificador
   */
  public idEvento: number;

  /**
   * Administrador
   */
  public administrador: Usuario;

  /**
   * ID do usuário administrador
   */
  public idAdministrador: number;

  /**
   * Título
   */
  public dsTitulo: string;

  /**
   * Descrição
   */
  public dsEvento: string;

  /**
   * Data de inicio
   */
  public dhInicio: string;

  /**
   * Duração em horas
   */
  public nrDuracao: number;

  /**
   * Link da foto
   */
  public dsLinkFoto: string;

  /**
   * Rua
   */
  public dsRua: string;

  /**
   * Bairro
   */
  public dsBairro: string;

  /**
   * Número do endereço
   */
  public nrEndereco: number;

  /**
   * Complemento do endereço
   */
  public dsComplemento: string;

  /**
   * Município
   */
  public idMunicipio: number;

  /**
   * UF
   */
  public idUF: number;

  /**
   * Lista de convidados
   */
  public participantesList: Usuario[] = [];
}

/**
 * Inicia a entidade Evento
 */
Evento.init(
  {
    idEvento: {
      field: 'id_evento',
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    dsTitulo: {
      field: 'ds_titulo',
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    dsEvento: {
      field: 'ds_evento',
      allowNull: false,
      type: DataTypes.STRING
    },
    dhInicio: {
      field: 'dh_inicio',
      allowNull: false,
      type: DataTypes.DATE
    },
    nrDuracao: {
      field: 'nr_duracao',
      allowNull: false,
      type: DataTypes.DECIMAL(3, 2)
    },
    dsLinkFoto: {
      field: 'ds_linkfoto',
      allowNull: true,
      type: DataTypes.STRING
    },
    dsRua: {
      field: 'ds_rua',
      type: DataTypes.STRING(100),
      allowNull: false
    },
    nrEndereco: {
      field: 'nr_endereco',
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dsBairro: {
      field: 'ds_bairro',
      type: DataTypes.STRING(100),
      allowNull: false
    },
    dsComplemento: {
      field: 'ds_complemento',
      type: DataTypes.STRING(200)
    },
    idAdministrador: {
      field: 'id_administrador',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Usuario,
        key: 'id_usuario'
      }
    }
  },
  getDefaultTableConfig({ tableName: 'evento' })
);

Evento.belongsToMany(Usuario, {
  through: 'eventousuario',
  foreignKey: 'idEvento',
  as: 'participantesList',
  onDelete: 'CASCADE'
});
// Usuario.belongsToMany(Evento, { through: 'eventousuario', foreignKey: 'idUsuario' });

export default Evento;
