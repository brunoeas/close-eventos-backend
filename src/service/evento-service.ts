import { Request, Response, NextFunction } from 'express';
import Service from './';
import EventoController from '../controller/evento-controller';
import { CustomRequest } from '../app';

/**
 * Service do Evento
 *
 * @class EventoService
 * @extends {Service}
 */
class EventoService extends Service {
  /**
   * Controller do Evento
   */
  private eventoController = new EventoController();

  /**
   * Cria uma instância do Service do Usuário e setta os Endpoints
   */
  public constructor() {
    super();

    this.router.get('/evento', (this.findAllEventos = this.findAllEventos.bind(this)));
    this.router.get('/evento/:id', (this.findEventoById = this.findEventoById.bind(this)));
    this.router.post(
      '/evento/:idEvento/:idUsuario',
      (this.addParticipante = this.addParticipante.bind(this))
    );
    this.router.delete(
      '/evento/:idEvento/:idUsuario',
      (this.removeParticipante = this.removeParticipante.bind(this))
    );
    this.router.post('/evento', (this.saveEvento = this.saveEvento.bind(this)));
    this.router.put('/evento', (this.updateEvento = this.updateEvento.bind(this)));
    this.router.delete('/evento/:id', (this.deleteEventoById = this.deleteEventoById.bind(this)));
  }

  /**
   * Busca todos os Eventos
   *
   * @private
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  private findAllEventos(req: CustomRequest, res: Response, next: NextFunction) {
    this.eventoController
      .findAllEventos(req.userLogged)
      .then(data => res.send(data))
      .catch(next);
  }

  /**
   * Busca um evento pelo ID
   *
   * @private
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  private findEventoById(req: Request, res: Response, next: NextFunction) {
    this.eventoController
      .findEventoById(+req.params.id)
      .then(data => res.send(data))
      .catch(next);
  }

  /**
   * Salva um novo evento
   *
   * @private
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  private saveEvento(req: Request, res: Response, next: NextFunction) {
    this.eventoController
      .saveEvento(req.body)
      .then(data => res.send(data))
      .catch(next);
  }

  /**
   * Atualiza um evento
   *
   * @private
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  private updateEvento(req: Request, res: Response, next: NextFunction) {
    this.eventoController
      .updateEvento(req.body)
      .then(() => res.send())
      .catch(next);
  }

  /**
   * Delete um evento pelo ID
   *
   * @private
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  private deleteEventoById(req: Request, res: Response, next: NextFunction) {
    this.eventoController
      .deleteEventoById(+req.params.id)
      .then(() => res.send())
      .catch(next);
  }

  /**
   * Adiciona um participante ao evento
   *
   * @private
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  private addParticipante(req: Request, res: Response, next: NextFunction) {
    this.eventoController
      .addParticipante(+req.params.idEvento, +req.params.idUsuario)
      .then(() => res.send())
      .catch(next);
  }

  /**
   * Remove um participante de um evento
   *
   * @private
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  private removeParticipante(req: Request, res: Response, next: NextFunction) {
    this.eventoController
      .removeParticipante(+req.params.idEvento, +req.params.idUsuario)
      .then(() => res.send())
      .catch(next);
  }
}

export default new EventoService();
