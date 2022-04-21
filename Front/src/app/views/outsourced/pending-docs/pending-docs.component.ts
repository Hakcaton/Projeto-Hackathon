import { Component, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs';
import { DocumentModel } from 'src/app/models/document.model';
import { EmployeeDocumentModel } from 'src/app/models/employee-document.model';
import { DocumentsService } from 'src/app/services/documents.service';

@Component({
  selector: 'app-pending-docs',
  templateUrl: './pending-docs.component.html',
  styleUrls: ['./pending-docs.component.scss'],
})
export class PendingDocsComponent implements OnInit {
  filter: string = '';

  contractId: string = '1';

  bAddEmployee: boolean = false;

  generalDocuments: DocumentModel[] = [];

  employeesDocuments: EmployeeDocumentModel[] = [];

  constructor(private documentsService: DocumentsService) {
    this.employeesDocuments = documentsService.getEmployeesPendingDocuments();
  }

  ngOnInit(): void {
    console.log(this.generalDocuments);
    this.documentsService
      .getPendingDocuments(this.contractId)
      .pipe(
        map((response: any) => {
          this.generalDocuments = response;
        })
      )
      .subscribe();
  }

  checkFilter(employeeDoc: EmployeeDocumentModel) {
    let formattedFilter = this.filter
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[.,\-\s]/g, '');
    let formattedFullName = employeeDoc.fullName
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[.,\-\s]/g, '');
    let formattedCPF = employeeDoc.cpf
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[.,\-\s]/g, '');

    return (
      formattedFullName.includes(formattedFilter) ||
      formattedCPF.includes(formattedFilter) ||
      employeeDoc.documents.find((doc: DocumentModel) => {
        let formattedDocumentTitle = doc.title
          .toLocaleLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[.,\-\s]/g, '');
        return formattedDocumentTitle.includes(formattedFilter);
      })
    );
  }

  clearFilter() {
    this.filter = '';
  }

  btnAddEmployeeClick() {
    this.bAddEmployee = true;
  }

  onEmployeeAdded(employee: any) {
    this.bAddEmployee = false;
  }

  onEmployeeCancel() {
    this.bAddEmployee = false;
  }
}
