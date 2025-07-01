import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { PhoneMaskPipe } from '../../pipes/phone-mask.pipe';
import { DisplayDashOnNullPipe } from '../../pipes/display-dash-on-null.pipe';
import { FormatDatePipe } from '../../pipes/format-date.pipe';

/**
 * Interface que define a estrutura de uma coluna da tabela.
 * @interface  Column
 * @property { string} field -  O campo do objeto de dados a ser exibido nesta coluna.
 * @property { string} header - O cabeçalho da coluna.
 * @property { string} [mask] - Máscara opcional a ser aplicada ao valor do campo (ex: 'phone', 'date').
 */
export interface Column {
  field: string;
  header: string;
  mask?: string;
}

/**
 * Este componente permite exibir uma lista de itens em uma tabela configurável,
 * com suporte a colunas dinâmicas, cabeçalhos de ação e emissão de eventos
 * quando uma linha é selecionada para ação.
 *
 * @props
 * @output {EventEmitter}  onLineSelected - Emite um evento quando uma ação é disparada em uma linha da tabela.
 * @input {string} actionHeader - O texto do cabeçalho da coluna de ações.
 * @input {boolean}  isAction - Indica se a coluna de ações deve ser exibida
 * @input {Column[]} columns - Um array de objetos que define as colunas da tabela.
 * @input {any[]} listItens - A lista de itens a serem exibidos na tabela
 *
 * @export
 * @Component
 * @class TableComponent
 * @typedef {TableComponent}
 * @implements {OnChanges}
 */
@Component({
  standalone: true,
  selector: 'app-table',
  imports: [
    CommonModule,
    ButtonModule,
    RippleModule,
    TableModule,
    PhoneMaskPipe,
    DisplayDashOnNullPipe,
    FormatDatePipe,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent implements OnChanges {
  @Output() onLineSelected = new EventEmitter<any>();
  @Input() actionHeader!: string;
  @Input() isAction: boolean = false;
  @Input() columns: Column[] = [];
  @Input() listItens: any[] = [];

  /**
   * Detecta alterações nas propriedades de entrada.
   *
   * @param changes Objeto contendo informações sobre as mudanças detectadas.
   * @public
   * @return {void}
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['columns'] && changes['columns'].currentValue)
      this.columns = changes['columns'].currentValue;

    if (changes['actionHeader'] && changes['actionHeader'].currentValue)
      this.actionHeader = changes['actionHeader'].currentValue;

    if (changes['isAction'] && changes['isAction'].currentValue)
      this.isAction = changes['isAction'].currentValue;

    if (changes['listItens'] && changes['listItens'].currentValue)
      this.listItens = changes['listItens'].currentValue;
  }

  /**
   * Método disparado quando a ação em uma linha da tabela é clicada.
   * Emite o evento `onLineSelected` com os dados da linha.
   *
   * @param row - dados da linha em que a ação foi clicada.
   * @public
   * @return {void}
   * @example
   * // O objeto emitido pode ser, por exemplo: `{ type: 'edit', data: item }`
   */
  onAction(row: any): void {
    this.onLineSelected.emit(row);
  }
}
