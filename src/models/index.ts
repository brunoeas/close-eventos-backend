'use strict';

import { Sequelize } from 'sequelize';

/**
 * Classe de configuração do Sequelize
 *
 * @class SequelizeConfiguration
 */
class SequelizeConfiguration {
  /**
   * Environment
   */
  private env: string;

  /**
   * Configurações
   */
  private config: any;

  /**
   * Sequelize
   */
  private sequelize: Sequelize;

  /**
   * Cria uma nova instância da classe e inicializa suas propriedades
   */
  public constructor() {
    this.env = process.env.NODE_ENV || 'development';
    this.config = require('../config/')[this.env];

    if (this.config.use_env_variable) {
      this.sequelize = new Sequelize(process.env[this.config.use_env_variable], this.config);
    } else {
      this.sequelize = new Sequelize(
        this.config.database,
        this.config.username,
        this.config.password,
        this.config
      );
    }
  }

  /**
   * Retorna a instância do Sequelize
   *
   * @returns {Sequelize}
   */
  public getSequelize(): Sequelize {
    return this.sequelize;
  }
}

export default new SequelizeConfiguration().getSequelize();
