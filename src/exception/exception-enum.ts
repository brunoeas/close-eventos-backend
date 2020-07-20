/**
 * Enum de erros tratados
 *
 * @enum {string}
 */
enum ExceptionEnum {
  EMAIL_DUPLICADO = 'E-mail ja existente na base de dados',
  USUARIO_INEXISTENTE = 'Usuário não existe na base de dados',
  EVENTO_INEXISTENTE = 'Evento não existe na base de dados'
}

/**
 * Retorna a key/code da Exception
 *
 * @param {ExceptionEnum} value - Valor que vai ser extraído a key/code
 * @returns {string} Key/code extraído
 */
function getExceptionCode(value: ExceptionEnum): string {
  return Object.keys(ExceptionEnum).find(enumValue => ExceptionEnum[enumValue] === value);
}

export { getExceptionCode };
export default ExceptionEnum;
