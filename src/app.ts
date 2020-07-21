import express, { Application, Response, Request, NextFunction } from 'express';
import cors from 'cors';
import services from './routes';
import CustomException from './exception/custom-exception';

/**
 * Classe principal que inicia o App
 *
 * @class App
 */
class App {
  /**
   * Express
   *
   * @type {Application}
   */
  public express: Application;

  /**
   * Cria uma intância do App e inicia os middlewares e routes
   */
  public constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  /**
   * Middlewares da aplicação
   */
  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
  }

  /**
   * Inicia as Rotas/Endpoints e o tratamento de erros da aplicação
   */
  private routes(): void {
    services.forEach(route => this.express.use('/', route.getRouter()));
    this.handleErrors();
  }

  /**
   * Aplica o tratamento de erros da aplicação
   */
  private handleErrors() {
    this.express.use(function(err: any, req: Request, res: Response, next: NextFunction) {
      if (err instanceof CustomException) {
        res.status(400).send(err);
      } else {
        console.error(`> Ocorreu um erro não tratado: \n${err}`);
        res.status(500).send({
          message: err?.message || 'Ocorreu um erro no servidor',
          error: err
        });
      }
    });
  }
}

export default App;
