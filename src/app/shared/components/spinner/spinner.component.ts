import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ProgressSpinner,
  ProgressSpinnerModule,
} from 'primeng/progressspinner';
import { LoadingService } from '../../../core/services/loading.service';

/**
 * Este componente standalone exibe um spinner de progresso,
 * ideal para indicar estados de carregamento em requisições assíncronas ou operações demoradas.
 * Ele utiliza o componente `ProgressSpinner` do PrimeNG e se integra
 * ao `LoadingService` para controlar sua visibilidade globalmente na aplicação.
 *
 * A encapsulamento de view é definido como `ViewEncapsulation.None` para permitir
 * que os estilos definidos em `spinner.component.css` afetem o DOM global ou sejam
 * facilmente sobrescritos.
 *
 * @export
 * @Component
 * @class SpinnerComponent
 * @typedef {SpinnerComponent}
 */
@Component({
  standalone: true,
  selector: 'app-spinner',
  imports: [CommonModule, ProgressSpinnerModule, ProgressSpinner],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class SpinnerComponent {
  constructor(public loader: LoadingService) {}
}
