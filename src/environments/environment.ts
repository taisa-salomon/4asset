/**
 * Configurações da aplicação.
 *
 * Esta classe contém as configurações da aplicação, como URL da API, tempo de espera de spinner,
 * mensagens de erro e outras configurações específicas para cada ambiente.
 *
 * **Propriedades:**
 *   - `production` {boolean}: Indica se a aplicação está em modo de produção.
 *   - `environmentName` {string}: Nome do ambiente atual (dev, prod, staging, etc.).
 *   - `apiUrl` {string}: URL da API da aplicação.
 *   - `redirectUri` {string}: URL de redirecionamento para determinadas operações.
 *   - `spinnerDelayTime` {number}: Tempo de espera em milissegundos antes de exibir o spinner de carregamento.
 *   - `snackBarDurationTime` {number}: Tempo de exibição em milissegundos das mensagens de snackbar.
 *   - `apiErrorMessage` {string}: Mensagem de erro padrão a ser exibida em caso de falhas na API.
 *
 * @export
 * @interface environment
 */
export const environment = {
  production: false,
  environmentName: 'dev',
  spinnerDelayTime: 2000,
  snackBarDurationTime: 2000,
  redirectUri: 'http://localhost:4200/person',
  apiUrl: 'https://dev-api-plt.4asset.net.br/exam/v1',
  apiErrorMessage: 'Erro em nossos servidores, por favor, contate o suporte.',
};
