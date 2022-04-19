import { Injectable } from '@angular/core';
import { DocumentModel } from '../models/document.model';
import { EmployeeDocumentModel } from '../models/employee-document.model';

@Injectable({
  providedIn: 'root',
})
export class DocumentsService {

  pendingDocs =  [
    {
      id: 1,
      title: 'Documento A',
      subtitle: '20/01/2001',
      tooltip_text: '',
      state: 0,
    },
    {
      id: 2,
      title: 'Documento B',
      subtitle: '20/01/2001',
      tooltip_text: '',
      state: 1,
    },
    {
      id: 3,
      title: 'Documento C',
      subtitle: '20/01/2001',
      tooltip_text: '',
      state: 2,
    },
    {
      id: 4,
      title: 'Documento D',
      subtitle: '20/01/2001',
      tooltip_text: '',
      state: 3,
    },
  ];

  employeesPendingDocs =  [
    {
      id: 1,
      fullName: 'livis',
      cpf: '123.456.789-10',
      documents: [
        {
          id: 1,
          title: 'Documento A',
          subtitle: '20/01/2001',
          tooltip_text: '',
          state: 0,
        },
        {
          id: 2,
          title: 'Documento B',
          subtitle: '20/01/2001',
          tooltip_text: '',
          state: 1,
        },
        {
          id: 3,
          title: 'Documento C',
          subtitle: '20/01/2001',
          tooltip_text: '',
          state: 2,
        },
        {
          id: 4,
          title: 'Documento D',
          subtitle: '20/01/2001',
          tooltip_text: '',
          state: 3,
        },
      ],
      active: true,
    },
    {
      id: 2,
      fullName: 'gustavo',
      cpf: '109.876.543-21',
      documents: [
        {
          id: 1,
          title: 'macaco',
          subtitle: '20/01/2001',
          tooltip_text: '',
          state: 0,
        },
        {
          id: 2,
          title: 'Documento B',
          subtitle: '20/01/2001',
          tooltip_text: '',
          state: 1,
        },
        {
          id: 3,
          title: 'Documento C',
          subtitle: '20/01/2001',
          tooltip_text: '',
          state: 2,
        },
        {
          id: 4,
          title: 'Documento D',
          subtitle: '20/01/2001',
          tooltip_text: '',
          state: 3,
        },
      ],
      active: true,
    },
  ];

  constructor() {}

  public getPendingDocuments(): DocumentModel[] {
    return this.pendingDocs;
  }

  public getEmployeesPendingDocuments(): EmployeeDocumentModel[] {
    return this.employeesPendingDocs;
  }

  updateDocument(doc: DocumentModel):DocumentModel{
    let oldDocIndex = this.pendingDocs.findIndex(x => {
      return x.id === doc.id;
    });
    this.pendingDocs[oldDocIndex] = doc;
    return this.pendingDocs[oldDocIndex];
  }

  updateEmployee(employee: EmployeeDocumentModel):EmployeeDocumentModel{
    let oldEmployeeIndex = this.employeesPendingDocs.findIndex(x => {
      return x.id === employee.id;
    });
    this.employeesPendingDocs[oldEmployeeIndex] = employee;
    return this.employeesPendingDocs[oldEmployeeIndex];
  }

  addEmployee(employee: EmployeeDocumentModel): EmployeeDocumentModel{
    if(this.employeesPendingDocs.find(x => {return x.cpf === employee.cpf})){
      throw new Error("CPF já cadastrado!");
    }
    this.employeesPendingDocs.push(employee);
    return this.employeesPendingDocs[this.employeesPendingDocs.length-1];
  }
}
