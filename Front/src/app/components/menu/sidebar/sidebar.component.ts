import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';
import { Component, Input, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IUserModel } from 'src/app/models/user.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() userLogged = '';

  user: IUserModel = {
    nome: '',
    funcao: '',
  };

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.load();
    console.log(this.userLogged);
  }

  async load() {
    const resultUserLogged = await lastValueFrom(
      this.accountService.getProfile()
    );
    console.log(resultUserLogged);
    this.user = {
      nome: resultUserLogged.name,
      funcao: resultUserLogged.lastName,
    };
  }
}
