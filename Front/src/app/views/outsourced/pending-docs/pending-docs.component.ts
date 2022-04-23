import { HttpClient } from '@angular/common/http';
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
export class PendingDocsComponent {
  private _generalDocumentsFilter: string = '';
  get generalDocumentsFilter() {
    return this._generalDocumentsFilter;
  }
  set generalDocumentsFilter(value: string) {
    this._generalDocumentsFilter = value;
    this.filteredGeneralDocuments = this.generalDocuments.filter(document => {
      return this.checkGeneralDocumentsFilter(document);
    });
  }

  private _employeesFilter: string = '';
  get employeesFilter() {
    return this._employeesFilter;
  }
  set employeesFilter(value: string) {
    this._employeesFilter = value;
    this.filteredEmployees = this.employees.filter(employee => {
      return this.checkEmployeesFilter(employee);
    });
  }

  bAddEmployee: boolean = false;

  private generalDocuments: DocumentModel[] = [];
  filteredGeneralDocuments: DocumentModel[] = [];


  private employees: EmployeeDocumentModel[] = [];
  filteredEmployees: EmployeeDocumentModel[] = [];

  constructor(private documentsService: DocumentsService, private http: HttpClient) {
    this.documentsService.getPendingDocuments('0123456')
      .pipe(
        map((generalDocuments: DocumentModel[]) => {
          generalDocuments.forEach((doc) => {
            doc.requestDate = new Date(doc.requestDate)
          });

          this.generalDocuments = generalDocuments.sort((docA, docB) => {
            return docA.requestDate.getTime() - docB.requestDate.getTime();
          });

          this.filteredGeneralDocuments = this.generalDocuments;
        })
      )
      .subscribe();
    this.documentsService.getEmployeesPendingDocuments('0123456')
      .pipe(
        map((employeesDocuments: EmployeeDocumentModel[]) => {
          employeesDocuments.forEach((employee) => {
            employee.documents.forEach((doc) => {
              doc.requestDate = new Date(doc.requestDate)
            })
            employee.documents = employee.documents.sort((docA, docB) => {
              return docA.requestDate.getTime() - docB.requestDate.getTime();
            })
          });

          this.employees = employeesDocuments.sort((employeeA, employeeB) => {
            return employeeA.fullName.localeCompare(employeeB.fullName)
          });

          this.filteredEmployees = this.employees;
        })
      )
      .subscribe();
  }

  checkGeneralDocumentsFilter(document: DocumentModel) {
    let formattedFilter = this.generalDocumentsFilter
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[.,\-\s]/g, '');
    let formattedTitle = document.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[.,\-\s]/g, '');

    return formattedTitle.includes(formattedFilter);
  }

  checkEmployeesFilter(employeeDoc: EmployeeDocumentModel) {
    let formattedFilter = this.employeesFilter
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

  clearGeneralDocumentsFilter() {
    this.generalDocumentsFilter = '';
  }

  clearEmployeesFilter() {
    this.employeesFilter = '';
  }

  btnAddEmployeeClick() {
    this.bAddEmployee = true;
  }

  onEmployeeAdded(employee: any) {
    employee.documents = [];
    this.bAddEmployee = false;
    this.employees.push(employee);
    this.employeesFilter = this.employeesFilter;
  }

  onEmployeeCancel() {
    this.bAddEmployee = false;
  }

  // onEmployeeRemoved()
}
