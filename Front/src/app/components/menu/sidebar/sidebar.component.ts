import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';
import { Component, Input, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IUserModel } from 'src/app/models/user.model';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() userLogged = '';

  isCollapsedEmpresas: boolean = true;
  isCollapsedDocumentos: boolean = true;
  userPermission: number = -1;

  user: IUserModel = {
    nome: '',
    funcao: '',
  };

  constructor(
    private accountService: AccountService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userPermission = this.authService.getPermission();

    this.load();
  }

  async load() {
    const resultUserLogged = await lastValueFrom(
      this.accountService.getProfile()
    );
    this.user = {
      nome: resultUserLogged.name,
      funcao: resultUserLogged.lastName,
    };
  }
}
