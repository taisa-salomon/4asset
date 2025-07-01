# Desafio Desenvolvedor Front-End - Cadastro de Pessoas

## 📝 Descrição do Projeto

Este projeto é a resolução de um desafio técnico para a vaga de Desenvolvedor Front-End. O objetivo foi desenvolver uma aplicação web para o **cadastro, listagem, edição e exclusão de registros de pessoas**, consumindo uma API pública fornecida.

As informações manipuladas por cada registro são: **nome, e-mail, telefone e data de nascimento.**

---

## 🚀 Tecnologias Utilizadas

- **Angular 18+:** Framework principal para o desenvolvimento da aplicação.
- **PrimeNG:** Biblioteca de componentes UI para a construção da interface.
- **Tailwind CSS (v3.0):** Framework CSS para estilização rápida e responsiva.

---

## ✨ Funcionalidades (Requisitos Atendidos)

- **RF01 - Cadastro de Pessoas:** Permite incluir novos registros de pessoas.
- **RF02 - Edição de Pessoas:** Permite atualizar os dados de uma pessoa existente.
- **RF03 - Listagem de Pessoas:** Exibe a lista completa de pessoas cadastradas.
- **RF04 - Exclusão de Pessoas:** Permite remover registros de pessoas.

---

## ⚙️ Configuração e Execução do Projeto

Este projeto foi gerado utilizando o [Angular CLI](https://github.com/angular/angular-cli) versão 19.1.8.

### Versões do Ambiente de Desenvolvimento

Para garantir a compatibilidade e uma execução fluida do projeto, as seguintes versões foram utilizadas durante o desenvolvimento:

- **Angular CLI:** 19.2.15
- **Node:** 22.14.0
- **npm:** 11.2.0
- **Sistema Operacional:** darwin arm64 (macOS Apple Silicon)
- **Angular Core:** 19.2.14
- **TypeScript:** 5.7.3

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- [**Node.js**](https://nodejs.org/en/) (versão 22.14.0 ou compatível)
- [**npm**](https://www.npmjs.com/) (versão 11.2.0 ou compatível)
- [**Angular CLI**](https://angular.io/cli) (instalável via `npm install -g @angular/cli`, versão 19.2.15 ou compatível)

### Instalação

1.  **Clone o repositório:**

    ```bash
    git clone [https://github.com/taisa-salomon/4asset.git](https://github.com/taisa-salomon/4asset.git)
    cd 4asset
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

### Execução do Servidor de Desenvolvimento

Para iniciar o servidor de desenvolvimento local, execute:

```bash
ng serve
```

Assim que o servidor estiver em execução, abra seu navegador e navegue até `http://localhost:4200/person`. O aplicativo será recarregado automaticamente sempre que você modificar qualquer um dos arquivos de origem.

## Estrutura de código

O Angular CLI inclui ferramentas poderosas de estrutura de código. Para gerar um novo componente, execute:

```bash
ng generate component nome-do-componente
```

Para obter uma lista completa dos esquemas disponíveis (como `componentes`, `diretivas` ou `pipes`), execute:

```bash
ng generate --help
```

## Building

Para realizar o build do projeto, execute:

```bash
ng build
```

Isso compilará seu projeto e armazenará os artefatos de compilação no diretório `dist/`. Por padrão, a compilação de produção otimiza seu aplicativo para desempenho e velocidade.

## 💻 Recursos Adicionais

Para obter mais informações sobre o uso do Angular CLI, PrimeNG e Tailwind CSS, incluindo referências detalhadas, visite:

- [**Visão Geral e Referência de Comandos do Angular CLI**](https://angular.dev/tools/cli).
- [**Configurando o PrimeNG em um projeto Angular CLI**](https://primeng.org/installation)
- [**Tailwind CSS com Angular**](https://tailwindcss.com/docs/installation/framework-guides/angular)
