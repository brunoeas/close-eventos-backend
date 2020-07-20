import { DataTypes, QueryInterface } from 'sequelize';

/**
 * @since 20/07/2020
 */
const migration = {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    try {
      await queryInterface.createTable('usuario', {
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
      });

      await queryInterface.createTable('evento', {
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
            model: 'usuario',
            key: 'id_usuario'
          }
        }
      });

      return await queryInterface.createTable('eventousuario', {
        idEventoUsuario: {
          field: 'id_eventousuario',
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        idUsuario: {
          field: 'id_usuario',
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'usuario',
            key: 'id_usuario'
          }
        },
        idEvento: {
          field: 'id_evento',
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'evento',
            key: 'id_evento'
          }
        }
      });
    } catch (err) {
      return console.error('> Erro ao fazer Migration: \n', err);
    }
  },
  down: async (queryInterface: QueryInterface): Promise<void> => {
    return queryInterface
      .dropTable('eventousuario')
      .then(() => queryInterface.dropTable('evento'))
      .then(() => queryInterface.dropTable('usuario'))
      .catch(console.error);
  }
};

export default migration;
