import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { Person } from '../../core/models/person.model';
import {
  Column,
  TableComponent,
} from '../../shared/components/table/table.component';
import { Subject, takeUntil } from 'rxjs';
import { RegisterPersonComponent } from '../register-person/register-person.component';
import { PersonsService } from '../../core/services/persons.service';
import { MessageService } from 'primeng/api';
import {
  DataConfirmDialog,
  ConfirmDialogComponent,
} from '../../shared/components/confirm-dialog/confirm-dialog.component';

/**
 * Componente responsável pela página de gerenciamento de pessoas.
 * Este componente exibe uma lista de pessoas, permite o cadastro, edição e exclusão via modais.
 *
 * @props
 * @private{Subject<void>} unsubscribe$ - Subject utilizado para cancelar assinaturas ao destruir o componente, prevenindo vazamentos de memória.
 * - @public {Person[]} list - Lista de objetos `Person` exibidos na tabela.
 * - @public {Person | null} person - Pessoa selecionada para edição, ou null.
 * - @public {boolean} visibleDialogRegister - Controla a visibilidade do modal de cadastro/edição.
 * - @public {boolean} visibleSuccessDialog - Controla a visibilidade do diálogo de sucesso.
 * - @public {DataConfirmDialog} modalInformationSuccess - Dados do diálogo de confirmação de sucesso.
 *
 * @export
 * @Component
 * @class PersonComponent
 * @typedef {PersonComponent}
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  standalone: true,
  selector: 'app-person',
  imports: [
    CommonModule,
    ButtonModule,
    RippleModule,
    TableModule,
    TableComponent,
    RegisterPersonComponent,
    ConfirmDialogComponent,
  ],
  templateUrl: './person.component.html',
  styleUrl: './person.component.css',
  providers: [MessageService],
})
export class PersonComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  list!: Person[];
  person!: Person | null;
  visibleDialogRegister: boolean = false;
  visibleSuccessDialog: boolean = false;
  modalInformationSuccess!: DataConfirmDialog;

  constructor(
    private personsService: PersonsService,
    private messageService: MessageService
  ) {}

  /**
   * Hook de ciclo de vida que é chamado após a inicialização do componente.
   * Responsável por carregar os dados de registro das pessoas.
   *
   * @public
   * @return {void}
   */
  ngOnInit(): void {
    this.getPeopleRegistration();
  }

  /**
   * Carrega os dados de registro das pessoas.
   * Atualmente, popula a lista com dados mockados. Em uma aplicação real,
   * este método faria uma chamada para um serviço de API.
   *
   * @public
   * @return {void}
   */
  getPeopleRegistration(): void {
    this.personsService
      .getAll()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (resp: any) => (this.list = resp.results),
        error: (err: any) =>
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: err.message,
          }),
      });
  }

  /**
   * Exclui um registro de pessoa com base no ID fornecido, após validação.
   * Atualiza a lista de pessoas e exibe uma mensagem de sucesso ou erro.
   *
   * @param {any} data - Objeto de dados contendo informações para a exclusão.
   * Espera-se que 'data.isDelete' seja um booleano indicando a confirmação da exclusão.
   *
   * @public
   * @return {void}
   */
  deleteRegistration(data: any): void {
    if (!data.isDelete || !this.person?.id) return;

    this.personsService
      .del(this.person?.id.toString())
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (resp: any) => {
          this.list = resp.results;

          this.messageService.add({
            severity: 'success',
            summary: 'Successo',
            detail: 'Registro excluído com sucesso!',
          });
        },
        error: (err: any) =>
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: err.message,
          }),
      });
  }

  /**
   * Hook de ciclo de vida que é chamado antes da destruição do componente.
   * Garante que todas as assinaturas pendentes sejam canceladas para evitar
   * vazamentos de memória.
   *
   * @public
   * @return {void}
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next(); // Emite um valor para cancelar as subscrições
    this.unsubscribe$.complete(); // Completa o subject
  }

  /**
   * Lida com o evento de fechamento do diálogo de registro de pessoa.
   * Redefine a pessoa selecionada e o estado de visibilidade do diálogo.
   * Se houver dados de retorno (indicando sucesso em uma operação),
   * dispara a exibição de um diálogo de sucesso e atualiza a lista de pessoas.
   *
   * @param {any} data - Objeto de dados retornado do diálogo, contendo informações sobre a operação (ex: { action: 'edit' | 'del' | 'create' }).
   *
   * @public
   * @return {void}
   */
  onDialogClose(data: any): void {
    this.person = null;
    this.visibleDialogRegister = false;

    if (data) {
      this.openSuccessDialog(data);
      this.getPeopleRegistration();
    }
  }

  /**
   * Abre e configura o modal de informações de sucesso com base na ação realizada.
   * Define o título e a mensagem do modal de acordo com a operação (edição, exclusão ou criação).
   *
   * @param {any} data - Objeto de dados contendo a 'action' realizada (ex: 'edit', 'del', 'create').
   *
   * @public
   * @return {void}
   */
  openSuccessDialog(data: any) {
    if (data.action === 'edit')
      this.modalInformationSuccess = {
        display: true,
        title: 'Cadastro editado',
        message: 'Cadastro editado com sucesso!',
      };

    if (data.action === 'del')
      this.modalInformationSuccess = {
        display: true,
        title: 'Cadastro excluído',
        message: 'Cadastro excluído com sucesso!',
      };
    else
      this.modalInformationSuccess = {
        display: true,
        title: 'Cadastro criado',
        message: 'Cadastro criado com sucesso!',
      };
  }

  /**
   * Lida com a ação disparada pelo `TableComponent` quando uma linha é selecionada.
   * Imprime os detalhes da ação no console.
   *
   * @param action Um objeto contendo o tipo de ação (ex: 'edit', 'delete') e os dados da pessoa associada.
   * @public
   * @return {void}
   */
  onAction(action: { type: string; data: Person }): void {
    if (action.type === 'edit') {
      this.person = action.data;
      this.visibleDialogRegister = true;
    }

    if (action.type === 'del') {
      this.person = action.data;
      this.modalInformationSuccess = {
        display: true,
        isDelete: true,
        title: 'Excluir cadastro',
        message:
          'O cadastro será excluído definitivamente. Você tem certeza que deseja continuar?',
      };
    }
  }

  /**
   * Retorna a configuração das colunas para o `TableComponent`.
   * Define quais campos da interface `Person` serão exibidos e seus respectivos cabeçalhos,
   * além de máscaras de formatação.
   * @returns Um array de objetos.
   */
  get columns(): Column[] {
    return [
      { field: 'name', header: 'Nome' },
      { field: 'email', header: 'E-mail' },
      { field: 'phone', header: 'Telefone', mask: 'tel' },
      { field: 'birthDate', header: 'Data de nascimento', mask: 'date' },
    ];
  }
}
