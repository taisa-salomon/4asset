import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

/**
 * Classe base para serviços de API que encapsula operações HTTP comuns.
 *
 * @export
 * @class AbstractService
 * @typedef {AbstractService}
 */
@Injectable({
  providedIn: 'root',
})
export class AbstractService {
  /**
   * URL base da API, obtida a partir do ambiente de execução.
   *
   * @private
   * @type {string}
   * @memberof AbstractService
   */
  private baseUrl: string = environment.apiUrl;

  constructor(protected http: HttpClient) {}

  /**
   * Constrói a URL completa da API a partir da rota informada.
   *
   * @private
   * @param {string} route Caminho da rota dentro da API.
   * @returns {string} URL completa da API.
   * @memberof AbstractService
   */
  getUrl(route: string): string {
    return `${this.baseUrl}/${route}`;
  }

  /**
   * Realiza uma requisição GET para a API.
   *
   * @param {string} route Caminho da rota dentro da API.
   * @param {object} [params={}] Parâmetros opcionais da requisição (formato chave-valor).
   * @returns {Observable<any>} Observable contendo a resposta da API.
   * @memberof AbstractService
   */
  get(route: string, params?: { [key: string]: any }): Observable<any> {
    return this.http.get(this.getUrl(route), {
      params: params,
    });
  }

  /**
   * Realiza uma requisição POST para a API.
   *
   * @param {string} route Caminho da rota dentro da API.
   * @param {any} [body={}] Corpo da requisição (opcional).
   * @returns {Observable<any>} Observable contendo a resposta da API.
   * @memberof AbstractService
   */
  post(route: string, body?: any): Observable<any> {
    return this.http.post(this.getUrl(route), body);
  }

  /**
   * Realiza uma requisição PATCH para a API.
   *
   * @param {string} route Caminho da rota dentro da API.
   * @param {any} [body={}] Corpo da requisição (opcional).
   * @returns {Observable<any>} Observable contendo a resposta da API.
   * @memberof AbstractService
   */
  patch(route: string, body?: any): Observable<any> {
    return this.http.patch(this.getUrl(route), body);
  }

  /**
   * Realiza uma requisição DELETE para a API.
   *
   * @param {string} route Caminho da rota dentro da API.
   * @returns {Observable<any>} Observable contendo a resposta da API.
   * @memberof AbstractService
   */
  delete(route: string): Observable<any> {
    return this.http.delete(this.getUrl(route));
  }
}
