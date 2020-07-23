import express, { Application, Response, Request, NextFunction } from 'express';
import cors from 'cors';
import services from './routes';
import CustomException from './exception/custom-exception';
import Usuario from './models/usuario';
import ExceptionEnum from './exception/exception-enum';

export type CustomRequest = Request & { userLogged: Usuario };

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
    this.authentication();
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

  /**
   * Configura o interceptor para a autenticação e persistência dos dados do usuário logado
   */
  private authentication() {
    this.express.use(async function(req: CustomRequest, res: Response, next: NextFunction) {
      if (req.path.startsWith('/no-auth')) {
        next();
        return;
      }

      const { authorization } = req.headers;
      console.log('\n\nreq.headers: ', req.headers);
      const emailToken: string = authorization?.replace('Bearer ', '');

      if (!emailToken) {
        res.status(401).send();
        return;
      }

      let usuarioLogado: Usuario | null = null;
      try {
        usuarioLogado = await Usuario.findOne({ where: { dsEmail: emailToken } });
      } catch (err) {
        res.status(401).send({ message: err?.message || 'Ocorreu um erro no servidor', error: err });
        return;
      }

      if (!usuarioLogado) {
        res.status(401).send(new CustomException(ExceptionEnum.USUARIO_INEXISTENTE));
        return;
      }

      req.userLogged = usuarioLogado;

      next();
    });
  }
}

export default App;
