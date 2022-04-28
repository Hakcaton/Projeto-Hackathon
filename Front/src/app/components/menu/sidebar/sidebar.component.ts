import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs';
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

  constructor(
    public accountService: AccountService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.accountService.getProfile().subscribe();
    this.userPermission = this.authService.getPermission();
  }
}
