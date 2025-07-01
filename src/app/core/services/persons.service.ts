import { Injectable } from '@angular/core';
import { AbstractService } from './abstract.service';
import { Observable } from 'rxjs';
import { Person } from '../models/person.model';
import { QueryParamService } from './query-param.service';
import { HttpClient } from '@angular/common/http';

/**
 * @export
 * @class PersonsService
 * @typedef {PersonsService}
 */
@Injectable({
  providedIn: 'root',
})
export class PersonsService extends AbstractService {
  constructor(http: HttpClient, private queryParamService: QueryParamService) {
    super(http);
  }

  /**
   * Obtém uma lista paginada de pessoas, com opções de filtro e ordenação.
   *
   * @param name - Opcional. Nome para filtrar as pessoas. Espaços em branco no início/fim serão removidos.
   * @param sortBy - Opcional. O campo pelo qual os resultados devem ser ordenados. Validado pelo `queryParamService`.
   * @param page - Opcional. O número da página a ser recuperada. Validado pelo `queryParamService`.
   * @param limit - Opcional. O número de itens por página. Validado pelo `queryParamService`.
   * @returns {Observable<any>}
   */
  getAll(
    name?: string | null,
    sortBy?: string | null,
    page?: number | null,
    limit?: number | null
  ): Observable<PaginatedResponse<Person>> {
    const searchParams = new URLSearchParams();
    const validatedSortBy = this.queryParamService.getValidatedSortBy(sortBy);

    if (name && name.trim()) searchParams.set('periodStart', name.trim());

    if (validatedSortBy) searchParams.set('sortBy', validatedSortBy);

    searchParams.set(
      'limit',
      this.queryParamService.getValidatedLimit(limit).toString()
    );

    searchParams.set(
      'page',
      this.queryParamService.getValidatedPage(page).toString()
    );

    return this.get(`persons?${searchParams.toString()}`);
  }

  /**
   * Cria uma nova conta bancária para uma pessoa especificada.
   *
   * @param params - Objeto contendo os parâmetros para a criação da conta.
   * @param params.agency - O número da agência bancária.
   * @param params.bankNumber - O número do banco.
   * @param params.pessoaId - O ID da pessoa à qual a conta será associada.
   * @param params.datalakeId - Opcional. O ID do datalake associado, se houver.
   * @returns {Observable<any>}
   */
  create(params: Person): Observable<any> {
    return this.post(`persons`, params);
  }

  /**
   * Atualiza as informações de uma pessoa existente.
   *
   * @param {number | null} id - O ID da pessoa a ser atualizada. Pode ser um número ou null.
   * @param {Person} params - Os parâmetros com as informações atualizadas da pessoa.
   * @returns {Observable<any>}
   */
  edit(id: number | null, params: Person): Observable<any> {
    return this.patch(`persons/${id?.toString()}`, params);
  }

  /**
   * Exclui uma pessoa pelo seu ID.
   *
   * @param {string} id - O ID da pessoa a ser excluída.
   * @returns {Observable<any>}
   */
  del(id: string): Observable<any> {
    return this.delete(`persons/${id}`);
  }
}

/**
 * Interface que representa uma resposta paginada de dados.
 * @template T O tipo dos itens dentro do array `results`.
 */
interface PaginatedResponse<T> {
  /**
   * Um array contendo os resultados da página atual.
   */
  results: T[];
  /**
   * O número da página atual.
   */
  page: number;
  /**
   * O número máximo de itens por página.
   */
  limit: number;
  /**
   * O número total de itens disponíveis, não apenas os da página atual.
   */
  count: number;
}
