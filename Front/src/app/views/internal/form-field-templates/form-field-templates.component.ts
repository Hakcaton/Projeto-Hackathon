import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, throwError } from 'rxjs';
import { recurrence } from 'src/app/constants/recurrence.constant';
import { FormFieldTemplateModel } from 'src/app/models/form-field-template.model';
import { FormFieldService } from 'src/app/services/form-field.service';
import { DateHelper } from 'src/app/tools/helpers/date.helper';
import { clamp } from 'src/app/tools/helpers/math.helper';

@Component({
  selector: 'app-form-field-templates',
  templateUrl: './form-field-templates.component.html',
  styleUrls: ['./form-field-templates.component.scss'],
})
export class FormFieldTemplatesComponent implements OnInit {

  bAddContract: boolean = false;
  private formFiledTemplates: FormFieldTemplateModel[] = [];
  filteredFormFieldTemplates: FormFieldTemplateModel[] = [];

  private _pageIndex: number = 0;
  get pageIndex() {
    return this._pageIndex;
  }
  set pageIndex(value: number) {
    const totalPages = Math.floor(
      (this.filteredFormFieldTemplates.length - 1) / 10
    );
    this._pageIndex = clamp(value, 0, totalPages > 0 ? totalPages : 0);
  }

  private _filter: string = '';
  get filter() {
    return this._filter;
  }
  set filter(value: string) {
    this._filter = value;
    this.filteredFormFieldTemplates = this.formFiledTemplates.filter(
      (formFileTemplate) => {
        return this.checkFilter(formFileTemplate);
      }
    );
    this.pageIndex = this.pageIndex;
  }
  constructor(
    public dateHelper: DateHelper,
    private formFieldService: FormFieldService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.formFieldService.getFormFieldTemplates()
      .pipe(
        map((formFieldTemplates) => {
          this.formFiledTemplates = formFieldTemplates;
          this.filteredFormFieldTemplates = this.formFiledTemplates;
        }),
        catchError((err) => {
          this.toastr.error('Não foi possivel obter os dados dos tipos de documentos');
          return throwError(()=>err);
        })
      )
      .subscribe();
  }

  checkFilter(formFieldTemplate: FormFieldTemplateModel) {
    let formattedFilter = this.filter
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[.,\-\s]/g, '');
    let formattedTitle = formFieldTemplate.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[.,\-\s]/g, '');
    let formattedRecurrence = this.formatRecurrence(formFieldTemplate.recurrence)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[.,\-\s]/g, '');

    return formattedTitle.includes(formattedFilter)
    || formattedRecurrence.includes(formattedFilter);
  }

  firstPage() {
    this.pageIndex = 0;
  }
  lastPage() {
    this.pageIndex = Math.floor(this.filteredFormFieldTemplates.length / 10);
  }
  previousPage() {
    this.pageIndex--;
  }
  nextPage() {
    this.pageIndex++;
  }

  clearFilter() {
    this.filter = '';
  }

  btnAddContractClick() {
    this.bAddContract = true;
    //Add Um novo Form Field Template atraves de um modal que vai ser criado.
  }

  onEditClick(formFieldTemplate: FormFieldTemplateModel) {
    //Abrir Modal com o formFieldTemplate Id; pra visualiza o carinha
  }

  onDeleteClick(formFieldTemplate: FormFieldTemplateModel) {
    //chama uma funcao no service pra deletar o campo no back.
  }

  formatRecurrence(value: number): string{
    return recurrence.get(value) as string;
  }

 
}
