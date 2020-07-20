import getDefaultTableConfig from '../config/default-table-config';
import { Model, DataTypes } from 'sequelize';
import TipoSexoEnum from '../enumeration/tipo-sexo-enum';

/**
 * Modelo do Usuário
 *
 * @class Usuario
 * @extends {Model} - Modelo de entidade do Sequelize
 */
class Usuario extends Model {
  /**
   * Identificador
   */
  public idUsuario: number;

  /**
   * Nome
   */
  public nmUsuario: string;

  /**
   * Número de telefone
   */
  public nrTelefone: string;

  /**
   * Data de nascimento
   */
  public dtNascimento: string;

  /**
   * Sexo
   */
  public tpSexo: TipoSexoEnum;

  /**
   * E-mail
   */
  public dsEmail: string;

  /**
   * Link da foto
   */
  public dsLinkFoto: string;
}

/**
 * Inicia a entidade Usuário
 */
Usuario.init(
  {
    idUsuario: {
      field: 'id_usuario',
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    nmUsuario: {
      field: 'nm_usuario',
      allowNull: false,
      type: DataTypes.STRING
    },
    dsEmail: {
      field: 'ds_email',
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    dsSenha: {
      field: 'ds_senha',
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    nrTelefone: {
      field: 'nr_telefone',
      allowNull: false,
      type: DataTypes.STRING(17)
    },
    dtNascimento: {
      field: 'dt_nascimento',
      allowNull: false,
      type: DataTypes.DATEONLY
    },
    dsLinkFoto: {
      field: 'ds_linkfoto',
      allowNull: true,
      type: DataTypes.STRING
    },
    tpSexo: {
      field: 'tp_sexo',
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  },
  getDefaultTableConfig({ tableName: 'usuario' })
);

// Usuario.sync({ alter: true });

export default Usuario;
