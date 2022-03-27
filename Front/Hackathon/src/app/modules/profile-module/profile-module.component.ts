import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-module',
  templateUrl: './profile-module.component.html',
  styleUrls: ['./profile-module.component.scss']
})
export class ProfileModuleComponent {

  profileForm: FormGroup;
  profileImageSource:string = 'assets/images/default-profile.svg';
  private bEditing = false;

  constructor(private _formBuilder: FormBuilder) {
    this.profileForm = this._formBuilder.group({
      name: [{ value: '', disabled: true }, Validators.required],
      lastName: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '', disabled: true }, Validators.required, Validators.email],
      phoneNumber: [{ value: '', disabled: true }, Validators.required, Validators.pattern(/^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/)],
      position: [{ value: '', disabled: true }, Validators.required],
    });
  }

  getEditing(): boolean {
    return this.bEditing;
  }
  private setEditing(value: boolean) {
    this.bEditing = value;

    if (this.bEditing) {
      this.profileForm.controls['name'].enable();
      this.profileForm.controls['lastName'].enable();
      this.profileForm.controls['email'].enable();
      this.profileForm.controls['phoneNumber'].enable();
    }
    else{
      this.profileForm.controls['name'].disable();
      this.profileForm.controls['lastName'].disable();
      this.profileForm.controls['email'].disable();
      this.profileForm.controls['phoneNumber'].disable();
    }
  }

  btnEditClick() {
    this.setEditing(true);

  }
  btnCancelClick() {
    this.setEditing(false);
  }
  btnSaveClick() {
    this.setEditing(true);
  }

}
