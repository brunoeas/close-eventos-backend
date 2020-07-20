import express, { Router } from 'express';

/**
 * Classe modelo para ser extendida pelos Services
 *
 * @class Service
 */
abstract class Service {
  /**
   * Router
   *
   * @protected - Apenas classes que extendem esta podem acessar essa prop diretamente
   * @type {Router}
   */
  protected router: Router;

  /**
   * Construtor padrão iniciando o Router
   */
  protected constructor() {
    this.router = express.Router();
  }

  /**
   * Retorna o Router
   *
   * @returns {Router} Router
   */
  public getRouter(): Router {
    return this.router;
  }
}

export default Service;
