import { DataTypes, QueryInterface } from 'sequelize';

/**
 * @since 23/07/2020
 */
const migration = {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    try {
      await queryInterface.addColumn('evento', 'id_municipio', {
        field: 'idMunicipio',
        allowNull: false,
        type: DataTypes.INTEGER
      });

      return queryInterface.addColumn('evento', 'id_uf', {
        field: 'idUF',
        allowNull: false,
        type: DataTypes.INTEGER
      });
    } catch (err) {
      return console.error('> Erro ao fazer Migration: \n', err);
    }
  },
  down: async (queryInterface: QueryInterface): Promise<void> => {
    return queryInterface
      .removeColumn('evento', 'id_municipio')
      .then(() => queryInterface.removeColumn('evento', 'id_uf'))
      .catch(console.error);
  }
};

export default migration;
