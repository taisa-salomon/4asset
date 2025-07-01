import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneMask',
})
export class PhoneMaskPipe implements PipeTransform {
  /**
   * Transforma/formata o número de telefone com uma máscara padrão (XX) XXXXX-XXXX.
   *
   * @param value O número de telefone a ser formatado, como uma string.
   * @returns Uma string contendo o número de telefone formatado,
   * ou '-' se o valor de entrada for nulo ou vazio,
   * ou o próprio valor se não for possível aplicar a máscara.
   *
   * @example
   * // Uso no template Angular:
   * {{ '11987654321' | phoneMask }} // Saída: (11) 98765-4321
   * {{ '2134567890' | phoneMask }}  // Saída: (21) 3456-7890
   * {{ null | phoneMask }}         // Saída: -
   * {{ '' | phoneMask }}           // Saída: -
   */
  transform(value: string): string {
    if (!value || value === '') {
      return '-';
    }

    // Remove todos os caracteres não numéricos do valor
    const cleaned = ('' + value).replace(/\D/g, '');

    // Tenta aplicar a máscara com base nos grupos de dígitos
    // (DDD) (5 dígitos ou 4 dígitos) - (4 dígitos)
    const match = cleaned.match(/^(\d{2})(\d{0,5})(\d{0,4})$/);

    if (match) {
      const ddd = match[1];
      const part1 = match[2];
      const part2 = match[3];

      return `(${ddd}) ${part1}-${part2}`;
    }

    return value;
  }
}
