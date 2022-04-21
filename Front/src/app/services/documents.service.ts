import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentModel } from '../models/document.model';
import { EmployeeDocumentModel } from '../models/employee-document.model';

@Injectable({
  providedIn: 'root',
})
export class DocumentsService {
  employeesPendingDocs: EmployeeDocumentModel[] = [
    {
      id: '1',
      fullName: 'livis',
      cpf: '123.456.789-10',
      documents: [
        {
          id: '1',
          title: 'Documento A',
          subtitle: '20/01/2001',
          tooltip_text: '',
          state: 0,
          file: null,
        },
      ],
      active: true,
    },
  ];

  constructor(private http: HttpClient) {}

  public getPendingDocuments(contractId: string): Observable<any> {
    const url = `/api/documents/pending/${contractId}`;
    return this.http.get<any>(url);
  }

  public getEmployeesPendingDocuments(): EmployeeDocumentModel[] {
    return this.employeesPendingDocs;
  }

  updateDocument(doc: DocumentModel): any {}

  insertFile(doc: DocumentModel): Observable<any> {
    const url = `/api/documents/${doc.id}`;
    return this.http.patch(url, doc.file);
  }

  updateEmployee(employee: EmployeeDocumentModel): EmployeeDocumentModel {
    let oldEmployeeIndex = this.employeesPendingDocs.findIndex((x) => {
      return x.id === employee.id;
    });
    this.employeesPendingDocs[oldEmployeeIndex] = employee;
    return this.employeesPendingDocs[oldEmployeeIndex];
  }

  addEmployee(employee: EmployeeDocumentModel): EmployeeDocumentModel {
    if (
      this.employeesPendingDocs.find((x) => {
        return x.cpf === employee.cpf;
      })
    ) {
      throw new Error('CPF já cadastrado!');
    }
    this.employeesPendingDocs.push(employee);
    return this.employeesPendingDocs[this.employeesPendingDocs.length - 1];
  }
}
