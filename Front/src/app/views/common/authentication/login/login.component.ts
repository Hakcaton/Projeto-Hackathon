import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { 
    this.formGroup = formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(320)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      remember: ['']
    })
  }

  ngOnInit(): void {
  }

  onLoginClick(){
    this.authService.login(this.formGroup.value)
    .pipe(map(data=>{
      this.router.navigateByUrl('/perfil');
    }))
    .subscribe();
  }

  onRecoverClick(){

  }

}
