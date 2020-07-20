import { InitOptions } from 'sequelize/types';
import sequelize from '../models';

/**
 * Configurações padrões da definição de uma tabela no Sequelize
 */
const defaultConfig = {
  // don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: false,
  // don't use camelcase for automatically added attributes but underscore style
  // so updatedAt will be updated_at
  underscored: true,
  // disable the modification of tablenames; By default, sequelize will automatically
  // transform all passed model names (first parameter of define) into plural.
  // if you don't want that, set the following
  freezeTableName: true,
  // Sequelize
  sequelize
};

/**
 * Retorna as configurações padrões mescladas com adicionais para a definição de um modelo de entidade no Sequelize
 *
 * @param {Object} [additional={}] - Configurações adicionais
 * @returns {InitOptions} Configurações padrões mescladas com adicionais para definição de uma tabela
 */
function getDefaultTableConfig(additional: any = {}): InitOptions {
  return { ...defaultConfig, ...additional };
}

export default getDefaultTableConfig;
