import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormFieldTemplateModel } from '../models/form-field-template.model';
import { UpdateFormFieldModel } from '../models/update-formField.model';

@Injectable({
  providedIn: 'root'
})
export class FormFieldService {

  constructor(private http: HttpClient) { }

  getFormFieldTemplates(): Observable<FormFieldTemplateModel[]>{
    const url = '/api/form-field-templates';
    return this.http.get<FormFieldTemplateModel[]>(url);
  }

  updateFormField(formFieldId: string, formField: UpdateFormFieldModel): Observable<void> {
    const url = '/api/form-fields/' + formFieldId;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.patch<void>(url, formField, { headers: headers });
  }
}
