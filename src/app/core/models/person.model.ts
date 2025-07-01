/**
 * @interface Person
 * @description Define a estrutura de um objeto que representa uma pessoa.
 */
export interface Person {
  /**
   * @property {number} [id] - O identificador único da pessoa. É opcional, geralmente usado para pessoas já persistidas.
   */
  id?: number;

  /**
   * @property {any} [photo] - Dados da foto da pessoa. O tipo pode variar dependendo de como a foto é armazenada (ex: string para URL, File para upload). É opcional.
   */
  photo?: any;

  /**
   * @property {string} name - O nome completo da pessoa. É obrigatório.
   */
  name: string;

  /**
   * @property {string} email - O endereço de e-mail da pessoa. É obrigatório e deve ser um formato de e-mail válido.
   */
  email?: string;

  /**
   * @property {string} phone - O número de telefone da pessoa. É obrigatório e geralmente formatado como string.
   */
  phone: string;

  /**
   * @property {string} birthDate - A data de nascimento da pessoa, representada como uma string. É obrigatório.
   */
  birthDate: string;

  /**
   * @property {string} birthDate - A data de nascimento formatada ('DD/MM/YYYY').
   */
  formattedDate?: string;
}
