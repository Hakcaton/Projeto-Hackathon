import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private toastr: ToastrService) {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(320)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void { }

  onLoginClick() {
    this.authService.login(this.formGroup.value).pipe(
      map((data) => {
        window.location.href = '';
      }),
      catchError((err) => {
        if (err.status = 401) {
          this.toastr.error('Credenciais inválidas', 'Autenticação');
        }
        return throwError(() => err);
      })
    ).subscribe();
  }

  onRecoverClick() { }
}
