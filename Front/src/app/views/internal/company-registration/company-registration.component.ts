import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-company-registration',
  templateUrl: './company-registration.component.html',
  styleUrls: ['./company-registration.component.scss']
})
export class CompanyRegistrationComponent {

  companyForm: FormGroup;
  profileImageSource: string = 'assets/images/default-profile.svg';

  constructor(private formBuilder: FormBuilder) { 
    this.companyForm = this.formBuilder.group({
      razaoSocial: ['', Validators.required],
      nomeFantasia: [''],
      CNPJ: ['', Validators.required],
      inscricaoEstadual: [''],
      email: ['', Validators.required],
      celular: ['', [Validators.required, Validators.pattern(/^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/)]],
    });
  }

  btnConfrmiClick() {
    
  }

}
