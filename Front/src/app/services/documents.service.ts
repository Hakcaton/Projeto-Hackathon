import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, observable, Observable } from 'rxjs';
import { DocumentModel } from '../models/document.model';
import { EmployeeDocumentModel } from '../models/employee-document.model';

@Injectable({
  providedIn: 'root',
})
export class DocumentsService {
  constructor(private http: HttpClient) {}

  getPendingDocuments(contractId: string): Observable<any> {
    const url = `/api/contracts/${contractId}/documents/pending`;
    return this.http.get<any>(url);
  }

  getEmployeesPendingDocuments(contractId: string): Observable<EmployeeDocumentModel[]> {
    const url = `/api/contracts/${contractId}/employees/documents/pending`;
    return this.http.get<EmployeeDocumentModel[]>(url);
  }

  getSentDocuments(contractId: string): Observable<any> {
    const url = `/api/contracts/${contractId}/documents/sent`;
    return this.http.get<any>(url);
  }

  getEmployeesSentDocuments(contractId: string): Observable<EmployeeDocumentModel[]> {
    const url = `/api/contracts/${contractId}/employees/documents/sent`;
    return this.http.get<EmployeeDocumentModel[]>(url);
  }

  getDocument(document: DocumentModel): Observable<any> {
    const url = `/api/documents/${document.id}`;
    return this.http.get(url);
  }

  deleteFile(document: DocumentModel): Observable<any> {
    const url = `/api/documents/${document.id}/file`;
    return this.http.delete(url);
  }

  sendFile(document: DocumentModel): Observable<any> {
    const url = `/api/documents/${document.id}/file`;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.put(url, document.file, { headers: headers });
  }

  updateEmployeeFullName(
    employeeFullName: string,
    employeeId: string
  ): Observable<any> {
    const url = `/api/employees/${employeeId}`;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.patch(
      url,
      { fullName: employeeFullName },
      { headers: headers }
    );
  }

  updateEmployeeCPF(employeeCPF: string, employeeId: string): any {
    const url = `/api/employees/${employeeId}`;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.patch(url, { cpf: employeeCPF }, { headers: headers });
  }

  addEmployee(employee: any): Observable<any> {
    const url = `/api/contracts/${employee.contractId}/employees`;
    return this.http.post(url, employee);
  }

  removeEmployee(employeeId: string): Observable<any> {
    const url = `/api/employees/${employeeId}`;
    return this.http.delete(url);
  }
}
