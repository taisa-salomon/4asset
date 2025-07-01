import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';

/**
 * Interface que representa os dados de configuração para o diálogo de confirmação.
 *
 * @interface DataConfirmDialog
 * @property {boolean} display - Indica se o diálogo deve estar visível.
 * @property {string} [title] - Título exibido no diálogo (opcional).
 * @property {string} [message] - Mensagem exibida no diálogo (opcional).
 * @property {boolean} [isDelete] - Indica se a ação de confirmação é de exclusão (opcional).
 */
export interface DataConfirmDialog {
  display: boolean;
  title?: string;
  message?: string;
  isDelete?: boolean;
}

/**
 * Componente de diálogo de confirmação genérico.
 * Este componente exibe uma janela de confirmação, que pode ser usada para ações de delete ou outras confirmações.
 *
 * @props
 * - @output {event} handleConfirmDelete: Evento emitido ao confirmar a ação de exclusão ou confirmação geral.
 * - @input {DataConfirmDialog} data: Dados de configuração do diálogo.
 *
 * @export
 * @Component
 * @class ConfirmDialogComponent
 * @typedef {TableComponent}
 * @implements {ConfirmDialogComponent}
 */
@Component({
  standalone: true,
  selector: 'app-confirm-dialog',
  imports: [Dialog, ButtonModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css',
})
export class ConfirmDialogComponent implements OnChanges {
  @Output() handleConfirmDelete = new EventEmitter<any>();
  @Input() data!: DataConfirmDialog;

  /**
   * Detecta alterações nas propriedades de entrada.
   *
   * @param {SimpleChanges} changes - Objeto que contém as mudanças detectadas.
   * @public
   * @return {void}
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue)
      this.data = changes['data'].currentValue;
  }
}
