import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UpdateUserModel } from '../models/update-profile.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) { }

  getProfile() {
    let url = '/api/user/profile';
    return this.http.get<any>(url);
  }

  saveProfile(user: UpdateUserModel): Observable<void> {
    let url = 'api/user/profile';
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.patch<void>(url, user, { headers: headers });
  }
}
