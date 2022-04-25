import { ThisReceiver } from '@angular/compiler';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, lastValueFrom, map, throwError } from 'rxjs';
import { CreateCompanyModel } from 'src/app/models/create-company.model';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-company-registration',
  templateUrl: './company-registration.component.html',
  styleUrls: ['./company-registration.component.scss'],
})
export class CompanyRegistrationComponent implements OnInit {
  // @ViewChild('btnConfirm') btnConfirm: any

  btnConfirmDisabled: boolean = false;

  userCompanyForm: FormGroup;
  companyForm: FormGroup;

  profileImageSource: string = 'assets/images/default-profile.svg';

  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService
  ) {
    //form da empresa terceira.
    this.companyForm = this.formBuilder.group({
      cnpj: ['', Validators.required],
      corporateName: ['', Validators.required],
      fantasyName: ['', Validators.required],
      stateRegistration: ['', Validators.required],
    });

    //form do responsavel da empresa.
    this.userCompanyForm = this.formBuilder.group({
      email: ['', Validators.required],
      lastName: ['', Validators.required],
      name: ['', Validators.required],
      cpf: ['', Validators.required],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/
          ),
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  btnConfrmiClick() {
    this.btnConfirmDisabled = true;

    const companyCreate: CreateCompanyModel = {
      companyData: this.companyForm.value,
      userData: this.userCompanyForm.value,
    };
    this.companyService
      .registerCompany(companyCreate)
      .pipe(
        map((result: any) => {
          alert('Empresa cadastrada com sucesso!');
          this.btnConfirmDisabled = false;
        }),
        catchError((error) => {
          alert('Não foi possível cadastrar a empresa');
          this.btnConfirmDisabled = false;
          return throwError(() => error);
        })
      )
      .subscribe();
  }

  initForm() {
    this.companyForm.reset();
    this.userCompanyForm.reset();
  }
}
