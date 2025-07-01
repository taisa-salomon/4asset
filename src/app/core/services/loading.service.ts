import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * @export
 * @class LoadingService
 * @typedef {LoadingService}
 */
@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private apiCount = 0;
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  /**
   * Atualiza o estado do carregador, exibindo-o quando uma nova chamada à API for iniciada.
   *
   * A função verifica se não há requisições ativas (`apiCount` igual a 0). Caso positivo, ela emite `true` para o
   * `isLoadingSubject`, indicando que o carregador deve ser exibido. Em seguida, incrementa o contador de requisições ativas (`apiCount`).
   *
   * @function showLoader
   * @memberof ClasseDoComponente
   * @returns {void} Esta função não retorna nenhum valor.
   */
  showLoader(): void {
    if (this.apiCount === 0) {
      this.isLoadingSubject.next(true);
    }
    this.apiCount++;
  }

  /**
   * Atualiza o estado do carregador, ocultando-o quando todas as chamadas à API forem concluídas.
   *
   * A função decrementa o contador de requisições ativas (`apiCount`). Quando o valor de `apiCount` chegar a zero,
   * ela emite `false` para o `isLoadingSubject`, indicando que o carregador deve ser ocultado.
   *
   * @function hideLoader
   * @memberof ClasseDoComponente
   * @returns {void} Esta função não retorna nenhum valor.
   */
  hideLoader(): void {
    this.apiCount--;
    if (this.apiCount === 0) {
      this.isLoadingSubject.next(false);
    }
  }
}
