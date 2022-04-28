import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProfileModel } from '../models/profile.model';
import { UpdateUserModel } from '../models/update-profile.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {

  private _profileData: ProfileModel = <ProfileModel>{};
  get profile(): ProfileModel {
    return this._profileData;
  }


  constructor(private http: HttpClient) { }

  getProfile() {
    let url = '/api/user/profile';
    return this.http.get<any>(url).pipe(
      map(profile => {
        this._profileData = profile;
      }));
  }

  updateProfile(user: UpdateUserModel): Observable<void> {
    let url = 'api/user/profile';
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.patch<void>(url, user, { headers: headers }).pipe(
      map(() => {
        this.getProfile().subscribe();
      })
    );
  }
}
