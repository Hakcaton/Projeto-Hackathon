import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, throwError } from 'rxjs';
import { CreateCompanyModel } from 'src/app/models/create-company.model';
import { GetCompanyModel } from 'src/app/models/get-company.model';
import { UpdateCompanyModel } from 'src/app/models/update-company.model';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-company-registration',
  templateUrl: './company-registration.component.html',
  styleUrls: ['./company-registration.component.scss'],
})
export class CompanyRegistrationComponent implements OnInit {

  bRegistering: boolean = false;
  _bEditing: boolean = false;
  get bEditing(): boolean {
    return this._bEditing;
  }
  set bEditing(value: boolean) {
    this._bEditing = value;

    if (this._bEditing) {
      this.companyForm.controls['corporateName'].enable();
      this.companyForm.controls['fantasyName'].enable();
      this.companyForm.controls['stateRegistration'].enable();

      this.userCompanyForm.enable();
    }
    else {
      this.companyForm.disable();
      this.userCompanyForm.disable();
    }
  }
  btnConfirmDisabled: boolean = false;

  company: GetCompanyModel = <GetCompanyModel>{};

  userCompanyForm: FormGroup;
  companyForm: FormGroup;

  profileImageSource: string = 'assets/images/default-profile.svg';

  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    //form da empresa terceira.
    this.companyForm = this.formBuilder.group({
      cnpj: [{ value: '', disabled: true }, Validators.required],
      corporateName: [{ value: '', disabled: true }, Validators.required],
      fantasyName: [{ value: '', disabled: true }, Validators.required],
      stateRegistration: [{ value: '', disabled: true }, Validators.required]
    });

    //form do responsavel da empresa.
    this.userCompanyForm = this.formBuilder.group({
      email: [{ value: '', disabled: true }, Validators.required],
      lastName: [{ value: '', disabled: true }, Validators.required],
      name: [{ value: '', disabled: true }, Validators.required],
      cpf: [{ value: '', disabled: true }, Validators.required],
      phoneNumber: [{ value: '', disabled: true }, [Validators.required, Validators.pattern(/^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/)]]
    });
  }

  ngOnInit(): void {
    this.bRegistering = this.router.url == '/interno/empresas/cadastrar';
    if (this.bRegistering) {
      this.companyForm.enable();
      this.userCompanyForm.enable();
    }
    else {
      this.initForm();
    }
  }

  btnConfrmiClick() {
    if (this.companyForm.controls['cnpj'].invalid) {
      alert('CNPJ inválido.');
      return;
    }
    if (this.companyForm.controls['corporateName'].invalid) {
      alert('Razão Social inválida.');
      return;
    }
    if (this.companyForm.controls['fantasyName'].invalid) {
      alert('Nome Fantasia inválido.');
      return;
    }
    if (this.companyForm.controls['stateRegistration'].invalid) {
      alert('Inscrição Estadual inválida.');
      return;
    }

    if (this.userCompanyForm.controls['email'].invalid) {
      alert('E-Mail inválido.');
      return;
    }
    if (this.userCompanyForm.controls['lastName'].invalid) {
      alert('Sobrenome inválido.');
      return;
    }
    if (this.userCompanyForm.controls['name'].invalid) {
      alert('Nome inválido.');
      return;
    }
    if (this.userCompanyForm.controls['cpf'].invalid) {
      alert('CPF inválido.');
      return;
    }
    if (this.userCompanyForm.controls['phoneNumber'].invalid) {
      alert('Celular inválido.');
      return;
    }

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
          this.router.navigateByUrl('/interno/empresas');
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
    this.route.params.pipe(
      map((params) => {
        this.companyService.getCompany(params['companyCNPJ']).pipe(
          map((company) => {
            this.company = company;

            this.resetForm();
          })
        ).subscribe();
      })
    ).subscribe();
  }

  resetForm() {
    this.companyForm.setValue({
      cnpj: this.company.cnpj,
      corporateName: this.company.corporateName,
      fantasyName: this.company.fantasyName,
      stateRegistration: this.company.stateRegistration
    });

    this.userCompanyForm.setValue({
      email: this.company.responsable.email,
      lastName: this.company.responsable.lastName,
      name: this.company.responsable.name,
      cpf: this.company.responsable.cpf,
      phoneNumber: this.company.responsable.phoneNumber
    });
  }


  btnEditClick() {
    this.bEditing = true;
  }
  btnCancelClick() {
    this.bEditing = false;
    this.resetForm();

  }
  btnSaveClick() {
    if (this.companyForm.controls['cnpj'].invalid) {
      alert('CNPJ inválido.');
      return;
    }
    if (this.companyForm.controls['corporateName'].invalid) {
      alert('Razão Social inválida.');
      return;
    }
    if (this.companyForm.controls['fantasyName'].invalid) {
      alert('Nome Fantasia inválido.');
      return;
    }
    if (this.companyForm.controls['stateRegistration'].invalid) {
      alert('Inscrição Estadual inválida.');
      return;
    }

    if (this.userCompanyForm.controls['email'].invalid) {
      alert('E-Mail inválido.');
      return;
    }
    if (this.userCompanyForm.controls['lastName'].invalid) {
      alert('Sobrenome inválido.');
      return;
    }
    if (this.userCompanyForm.controls['name'].invalid) {
      alert('Nome inválido.');
      return;
    }
    if (this.userCompanyForm.controls['cpf'].invalid) {
      alert('CPF inválido.');
      return;
    }
    if (this.userCompanyForm.controls['phoneNumber'].invalid) {
      alert('Celular inválido.');
      return;
    }

    const company: UpdateCompanyModel = {
      companyData: this.companyForm.value,
      userData: this.userCompanyForm.value
    }

    this.companyService.updateCompany(this.company.cnpj, company).pipe(
      map((company) => {
        this.company = company;
        this.resetForm();
        this.bEditing = false;
      }),
      catchError((err) => {
        alert('Não foi possível salvar as alterações');
        return throwError(() => err);
      })
    ).subscribe();
  }
}
