import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loading.service';

/**
 *Interceptor HTTP para gerenciar a visibilidade de um loader (indicador de carregamento).
 *
 * Este interceptor automaticamente exibe o loader antes de uma requisição HTTP ser enviada
 * e o oculta quando a requisição é finalizada (seja por sucesso ou por erro).
 *
 * É possível pular o comportamento do loader para requisições específicas
 * adicionando o cabeçalho `'X-SKIP-LOADING'` à requisição.
 *
 * @param {HttpRequest<unknown>} req - A requisição HTTP de saída.
 * @param {HttpHandlerFn} next - O próximo manipulador na cadeia de interceptores.
 * @returns {Observable<HttpEvent<unknown>>} Um Observable do evento HTTP.
 *
 * @param next
 * @returns
 */
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loader = inject(LoadingService);
  const skipLoading = req.headers.has('X-SKIP-LOADING');

  if (skipLoading) return next(req);

  loader.showLoader();

  return next(req).pipe(finalize(() => loader.hideLoader()));
};
