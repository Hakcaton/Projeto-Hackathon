import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { map } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  @Output() sideBarCollapseClick: EventEmitter<boolean> = new EventEmitter<boolean>();
  pageTitle: string = '';

  profileOptionsCollapsed: boolean = true;

  _sideBarCollapsed: boolean = true;

  get sideBarCollapsed(): boolean {
    return this._sideBarCollapsed;
  }

  set sideBarCollapsed(value: boolean) {
    this._sideBarCollapsed = value;
    this.sideBarCollapseClick.emit(this._sideBarCollapsed);
  }

  constructor(public accountServise: AccountService, private route: ActivatedRoute, private router: Router, private authService: AuthService) {
    this.accountServise.getProfile().subscribe();
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.refreshPageTitle();
      }
    });
  }

  ngOnInit(): void {

    this.refreshPageTitle();
  }

  refreshPageTitle() {

    if (this.route.firstChild) {
      this.route.firstChild.data.pipe(
        map((data: any) => {
          this.pageTitle = data.title;
        })
      ).subscribe();
    }
    else {
      this.route.data.pipe(
        map((data: any) => {
          this.pageTitle = data.title;
        })
      ).subscribe();
    }
  }

  onSideBarCollapseClick() {
    this.sideBarCollapsed = !this.sideBarCollapsed;
  }

  onProfileClick() {
    this.router.navigateByUrl('/interno/perfil');
    this.profileOptionsCollapsed = true;
  }
  onLogoutClick() {
    this.authService.logout();
    this.profileOptionsCollapsed = true;
  }

}
