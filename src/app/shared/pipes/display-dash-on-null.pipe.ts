import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayDashOnNull',
})
export class DisplayDashOnNullPipe implements PipeTransform {
  /**
   * Transforma o valor de entrada. Se o valor for nulo, indefinido, vazio,
   * ou a string 'null' (mas não 0), retorna um valor padrão. Caso contrário,
   * retorna a representação em string do valor original, sem espaços extras.
   *
   * @param value O valor a ser transformado.
   * @param defaultValue O valor a ser retornado se o `value` for nulo, indefinido ou vazio.
   * O padrão é um traço (`-`).
   * @returns Uma string que é o `defaultValue` se o `value` for considerado "vazio",
   * ou a representação em string do `value` original.
   */
  transform(value: any, defaultValue: string = '-'): string {
    if (
      (!value ||
        value === null ||
        value === undefined ||
        value === '' ||
        value === 'null') &&
      value != 0
    ) {
      return defaultValue;
    }
    return String(value).trim();
  }
}
