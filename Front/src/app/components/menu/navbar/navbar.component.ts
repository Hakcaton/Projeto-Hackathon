import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AppService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  userPermission: number = -1;

  isCollapsed: boolean = true;

  constructor(
    private appService: AppService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userPermission = this.authService.getPermission();
  }

  onClickLogout() {
    this.authService.logout();
  }

  toggleSidebarPin() {
    this.appService.toggleSidebarPin();
  }
  toggleSidebar() {
    this.appService.toggleSidebar();
  }
}
