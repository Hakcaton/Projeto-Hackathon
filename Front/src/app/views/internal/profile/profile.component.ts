import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  profileImageSource: string = 'assets/images/default-profile.svg';
  private bEditing = false;

  constructor(private formBuilder: FormBuilder, private accountService: AccountService) {
    this.profileForm = this.formBuilder.group({
      name: [{ value: '', disabled: true }, Validators.required],
      lastName: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      phoneNumber: [{ value: '', disabled: true }, [Validators.required, Validators.pattern(/^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/)]],
      position: [{ value: '', disabled: true }, Validators.required],
    });
  }

  ngOnInit(): void {
    this.load();
  }

  get Editing(): boolean {
    return this.bEditing;
  }

  private set Editing(value: boolean) {
    this.bEditing = value;

    if (this.bEditing) {
      this.profileForm.controls['name'].enable();
      this.profileForm.controls['lastName'].enable();
      this.profileForm.controls['email'].enable();
      this.profileForm.controls['phoneNumber'].enable();
    }
    else {
      this.profileForm.controls['name'].disable();
      this.profileForm.controls['lastName'].disable();
      this.profileForm.controls['email'].disable();
      this.profileForm.controls['phoneNumber'].disable();
    }
  }

  btnEditClick() {
    this.Editing = true;
  }
  btnCancelClick() {
    this.Editing = false;
  }
  btnSaveClick() {
    this.Editing = true;
  }

  async load() {
    const profile = await lastValueFrom(this.accountService.getProfile());
    console.log(profile);
    this.profileForm.setValue({
      name: profile.name,
      lastName: profile.lastName,
      email: profile.email,
      phoneNumber: profile.phoneNumber,
      position: 'Teste'
    })
  }

}
