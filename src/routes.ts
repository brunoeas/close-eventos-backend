import Router from './service';
import UsuarioService from './service/usuario-service';
import EventoService from './service/evento-service';

/**
 * Rotas/Services da aplicação
 */
const services: Router[] = [UsuarioService, EventoService];

export default services;
