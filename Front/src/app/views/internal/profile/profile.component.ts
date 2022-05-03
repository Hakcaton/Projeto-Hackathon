import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError, lastValueFrom, map, of, throwError } from 'rxjs';
import { UpdateUserModel } from 'src/app/models/update-profile.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  profileImageSource: string = 'assets/images/default-profile.svg';

  constructor(private formBuilder: FormBuilder, private accountService: AccountService, private toastr: ToastrService) {
    this.profileForm = this.formBuilder.group({
      name: [{ value: '', disabled: true }, Validators.required],
      lastName: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      phoneNumber: [{ value: '', disabled: true }, [Validators.required, Validators.pattern(/^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/)]]
    });
  }

  ngOnInit(): void {
    this.accountService.getProfile().pipe(
      map(() => {
        this.load();
      })
    ).subscribe();
  }

  private _bEditing = false;
  get bEditing(): boolean {
    return this._bEditing;
  }
  private set bEditing(value: boolean) {
    this._bEditing = value;

    if (this._bEditing) {
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
    this.bEditing = true;
  }
  btnCancelClick() {
    this.bEditing = false;
    this.profileForm.controls['name'].setValue(this.accountService.profile.name);
    this.profileForm.controls['lastName'].setValue(this.accountService.profile.lastName);
    this.profileForm.controls['email'].setValue(this.accountService.profile.email);
    this.profileForm.controls['phoneNumber'].setValue(this.accountService.profile.phoneNumber);
  }
  btnSaveClick() {
    if (!this.profileForm.controls['name'].valid) {
      this.toastr.error('O campo "Nome" deve ser preenchido', 'Meu Perfil');
      return;
    }
    if (!this.profileForm.controls['lastName'].valid) {
      this.toastr.error('O campo "Sobrenome" deve ser preenchido', 'Meu Perfil');
      return;
    }
    if (!this.profileForm.controls['email'].valid) {
      this.toastr.error('O E-Mail informado é inválido', 'Meu Perfil');
      return;
    }
    if (!this.profileForm.controls['phoneNumber'].valid) {
      this.toastr.error('O Celular informado é inválido', 'Meu Perfil');
      return;
    }

    const user: UpdateUserModel = <UpdateUserModel>this.profileForm.value;
    this.accountService.updateProfile(user).pipe(
      map(() => {
        this.bEditing = false;
        this.toastr.clear();
        this.toastr.success('Perfil salvo com sucesso', 'Meu Perfil');
      }),
      catchError((err) => {
        if (err.status == 409) {
          this.toastr.error('O E-Mail informado já está sendo usado por outro usuário', 'Meu Perfil');
        }
        else {
          this.toastr.error('Ocorreu um erro inesperado ao salvar o perfil', 'Meu Perfil');
        }
        return throwError(() => err);
      })
    ).subscribe();
  }

  async load() {
    this.profileForm.setValue({
      name: this.accountService.profile.name,
      lastName: this.accountService.profile.lastName,
      email: this.accountService.profile.email,
      phoneNumber: this.accountService.profile.phoneNumber
    });
  }

}
