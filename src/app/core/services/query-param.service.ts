import { Injectable } from '@angular/core';

/**
 * @export
 * @class QueryParamService
 * @typedef {QueryParamService}
 */
@Injectable({
  providedIn: 'root',
})
export class QueryParamService {
  /**
   * Se o valor for nulo, indefinido, zero ou negativo, retorna 10 (padrão).
   * @param limit O valor do limite a ser validado.
   * @returns O valor de 'limit' validado.
   */
  getValidatedLimit(limit: number | null | undefined): number {
    return limit != null && limit > 0 ? limit : 10;
  }

  /**
   * Se o valor for nulo, indefinido, zero ou negativo, retorna 1 (padrão).
   * @param page O valor da página a ser validado.
   * @returns O valor de 'page' validado.
   */
  getValidatedPage(page: number | null | undefined): number {
    return page != null && page > 0 ? page : 1;
  }

  /**
   * Valida o parâmetro de ordenação (sort) para garantir que ele esteja no formato esperado.
   *
   * O formato esperado é 'nomeCampo:direcao', onde 'direcao' pode ser 'asc' (ascendente) ou 'desc' (descendente).
   * Exemplos válidos: 'name:asc', 'nam:desc'.
   *
   * @param {string | null | undefined} sortBy - O valor da string de ordenação a ser validada.
   * Pode ser uma string, null ou undefined.
   * @returns {string | null} Retorna a string de ordenação validada (com espaços em branco removidos)
   * se o formato for válido. Retorna `null` se o valor for nulo, indefinido,
   * vazio (ou contiver apenas espaços) ou não seguir o formato esperado.
   */
  getValidatedSortBy(sortBy: string | null | undefined): string | null {
    const trimmedSort = sortBy ? sortBy.trim() : '';

    if (!trimmedSort) return null;

    // Regex para validar o formato 'campo:desc' ou 'campo:asc'
    const sortRegex = /^[a-zA-Z0-9_]+:(asc|desc)$/;

    if (sortRegex.test(trimmedSort)) return trimmedSort;

    console.warn(
      `Parâmetro 'sort' inválido: '${trimmedSort}'. Esperado formato 'campo:asc/desc'.`
    );
    return null;
  }
}
