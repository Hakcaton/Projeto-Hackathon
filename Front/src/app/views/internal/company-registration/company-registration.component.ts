import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, lastValueFrom, map } from 'rxjs';
import { CompanyRegistrationService } from 'src/app/services/company-registration.service';

@Component({
  selector: 'app-company-registration',
  templateUrl: './company-registration.component.html',
  styleUrls: ['./company-registration.component.scss'],
})
export class CompanyRegistrationComponent implements OnInit {
  userCompanyForm: FormGroup;
  companyForm: FormGroup;

  profileImageSource: string = 'assets/images/default-profile.svg';

  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyRegistrationService
  ) {
    //form da empresa terceira.
    this.companyForm = this.formBuilder.group({
      razaoSocial: ['', Validators.required],
      nomeFantasia: ['', Validators.nullValidator],
      CNPJ: ['', Validators.required],
      inscricaoEstadual: [''],
    });

    //form do responsavel da empresa.
    this.userCompanyForm = this.formBuilder.group({
      nome: ['', Validators.required],
      sobreNome: ['', Validators.nullValidator],
      cpf: ['', Validators.required],
      email: ['', Validators.required],
      celular: [
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
    this.registerComapany();
  }

  registerComapany() {
    let companyData = this.companyForm.value;
    let responsibleData = this.userCompanyForm.value;
    let body = {
      companyData,
      responsibleData,
    };

    this.companyService
      .registerCompanyData(body)
      .pipe(
        map((result: any) => {
        })
      )
      .subscribe();
  }

  initForm() {
    this.companyForm.reset();
    this.userCompanyForm.reset();
  }
}
