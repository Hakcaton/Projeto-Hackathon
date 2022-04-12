import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password-module',
  templateUrl: './forgot-password-module.component.html',
  styleUrls: ['./forgot-password-module.component.scss']
})
export class ForgotpasswordModuleComponent implements OnInit {
  
  @Output() onBackClick = new EventEmitter();
  formGroup: FormGroup;
  
  constructor(private formBuilder: FormBuilder) { 
    this.formGroup = formBuilder.group({
      email: ["", Validators.email] 
    })
  }

  ngOnInit(): void {
  }

  btnBackClick(){
    this.onBackClick.emit();
  }

}
