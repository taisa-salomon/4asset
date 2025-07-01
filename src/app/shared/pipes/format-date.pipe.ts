import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'formatDate',
  standalone: true,
})
export class FormatDatePipe implements PipeTransform {
  /**
   * Transforma uma data em uma string no formato `DD/MM/YYYY`.
   *
   * @param {Date | string | null | undefined} value - A data a ser formatada. Pode ser um objeto `Date`, uma string ou `null`/`undefined`.
   * @returns {string} A data formatada como `DD/MM/YYYY` ou uma mensagem de erro em caso de data inválida.
   */
  transform(value: Date | string | null | undefined): string {
    // Se o valor for nulo ou indefinido, retorne um valor padrão
    if (
      !value ||
      value == '' ||
      value == '-' ||
      value == null ||
      value == 'null' ||
      value == undefined
    )
      return '-';

    // A expressão regular para validar DD/MM/YYYY
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

    if (dateRegex.test(value.toString())) return value.toString();

    const momenDate = moment(value);

    // Verifica se a data é válida
    if (!momenDate.isValid()) return 'Data inválida';

    return momenDate.format('DD/MM/YYYY');
  }
}
