import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-authenticated-layout',
  templateUrl: './authenticated-layout.component.html',
  styleUrls: ['./authenticated-layout.component.scss'],
})
export class AuthenticatedLayoutComponent implements OnInit {
  constructor(private appService: AppService) {}

  ngOnInit(): void {}
  getClasses() {
    const classes = {
      'pinned-sidebar': this.appService.getSidebarStat().isSidebarPinned,
      'toggeled-sidebar': this.appService.getSidebarStat().isSidebarToggeled,
    };
    return classes;
  }
  toggleSidebar() {
    this.appService.toggleSidebar();
  }
}
