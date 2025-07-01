import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Dialog, DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Person } from '../../core/models/person.model';
import { FormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { FormatDatePipe } from '../../shared/pipes/format-date.pipe';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import moment from 'moment';
import { Subject, takeUntil } from 'rxjs';
import { PersonsService } from '../../core/services/persons.service';

/**
 * Componente responsável pelo cadastro e edição de pessoas.
 * Gerencia a exibição do formulário, validações e ações de salvar ou editar registros.
 *
 * @props
 * @private{Subject<void>} unsubscribe$ - Subject utilizado para cancelar assinaturas ao destruir o componente, prevenindo vazamentos de memória.
 * - @Input {any} display: Controla a visibilidade do modal.
 * - @Input {Person | null} person: Pessoa que será editada ou null para novo cadastro.
 * - @Output {EventEmitter} handleDialogClose: Evento emitido ao fechar o diálogo.
 * - @public {Person | null} form: Objeto contendo os dados do formulário.
 * - @public {string} title: Título exibido no modal, varia entre "Criar Novo Cadastro" ou "Editar Cadastro".
 *
 * @export
 * @Component
 * @class RegisterPersonComponent
 * @typedef {RegisterPersonComponent}
 * @implements {OnInit}
 * @implements {OnChanges}
 * @implements {OnDestroy}
 */
@Component({
  standalone: true,
  selector: 'app-register-person',
  imports: [
    CommonModule,
    FormsModule,
    Dialog,
    DialogModule,
    ButtonModule,
    InputTextModule,
    InputMaskModule,
    Toast,
  ],
  templateUrl: './register-person.component.html',
  styleUrl: './register-person.component.css',
  providers: [FormatDatePipe, MessageService],
})
export class RegisterPersonComponent implements OnInit, OnChanges, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  @Output() handleDialogClose = new EventEmitter<any>();
  @Input() display: any;
  @Input() person!: Person | null;

  form!: Person;
  title: string = 'Criar Novo Cadastro';

  constructor(
    private formatDatePipe: FormatDatePipe,
    private messageService: MessageService,
    private personsService: PersonsService
  ) {}

  /**
   * Detecta alterações nas propriedades de entrada.
   *
   * @param {SimpleChanges} changes - Objeto que contém as mudanças detectadas.
   * @public
   * @return {void}
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['person'] && changes['person'].currentValue)
      this.person = changes['person'].currentValue;

    if (changes['visible'] && changes['display'].currentValue)
      this.display = changes['display'].currentValue;

    if (this.person) this.title = 'Editar Cadastro';
  }

  /**
   * Método chamado na inicialização do componente.
   * Preenche o formulário com os dados existentes e altera o estado do modal.
   * @public
   * @return {void}
   */
  ngOnInit(): void {
    this.populateForm();
    this.changeModalState();
  }

  /**
   * Chamado antes da destruição do componente.
   * Garante que todas as assinaturas pendentes sejam canceladas para evitar vazamentos de memória.
   * @public
   * @return {void}
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next(); // Emite um valor para cancelar as subscrições
    this.unsubscribe$.complete(); // Completa o subject
  }

  /**
   * Preenche o formulário com os dados da pessoa ou limpa os campos para novo cadastro.
   * @public
   * @return {void}
   */
  populateForm(): void {
    this.form = {
      name: '',
      email: '',
      phone: '',
      birthDate: '',
    };

    if (this.person) {
      this.form = this.person;
      this.form.birthDate = this.formatDatePipe.transform(
        this.person.birthDate
      );
    }
  }

  /**
   * Alterna o estado de visibilidade do modal.
   * @public
   * @return {void}
   */
  changeModalState(): void {
    this.display = !this.display;
  }

  /**
   * Fecha o diálogo e emite evento de fechamento.
   * @public
   * @return {void}
   */
  dialogClose(): void {
    this.handleDialogClose.emit();
  }

  /**
   * Valida a data de nascimento fornecida.
   *
   * @param {any} date - Objeto de data a ser validado.
   * @returns {boolean} - True se a data for válida, false caso contrário.
   */
  validateDate(date: any): boolean {
    if (!date || (date && !date.isValid())) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Data de nascimento inválida ou em formato incorreto.',
      });
      return false;
    } else return true;
  }

  /**
   * Submete o formulário, validando os dados e decidindo entre criar ou editar o registro.
   * @public
   * @return {void}
   */
  submitForm(): void {
    const birthDate = moment(this.form.birthDate, 'DD/MM/YYYY', true);

    if (!this.validateDate(birthDate)) return;

    const birthDateForDatabase = birthDate.toISOString();

    const personToSave: Person = {
      ...this.form,
      birthDate: birthDateForDatabase,
    };

    if (this.person) this.editFormData(personToSave);
    else this.saveFormData(personToSave);
  }

  /**
   * Edita os dados de uma pessoa existente.
   * @param {Person} personToSave - Dados da pessoa a serem atualizados.
   * @public
   * @return {void}
   */
  editFormData(personToSave: Person): void {
    this.personsService
      .edit(this.person?.id || null, {
        name: personToSave.name,
        email: personToSave.email,
        phone: personToSave.phone,
        birthDate: personToSave.birthDate,
      })
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successo',
            detail: 'Dados editados com sucesso!',
          });
          this.handleDialogClose.emit({ action: 'edit' });
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
   * Cria um novo registro de pessoa.
   * @param {Person} personToSave - Dados da nova pessoa.
   * @public
   * @return {void}
   */
  saveFormData(personToSave: Person): void {
    this.personsService
      .create(personToSave)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successo',
            detail: 'Novo registro criado com sucesso!',
          });
          this.handleDialogClose.emit({ action: 'add' });
        },
        error: (err: any) =>
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: err.message,
          }),
      });
  }
}
