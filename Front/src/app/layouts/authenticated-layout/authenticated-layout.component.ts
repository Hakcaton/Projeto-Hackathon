import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SideBarComponent } from 'src/app/components/side-bar/side-bar.component';

@Component({
  selector: 'app-authenticated-layout',
  templateUrl: './authenticated-layout.component.html',
  styleUrls: ['./authenticated-layout.component.scss'],
})
export class AuthenticatedLayoutComponent {

  @ViewChild('sideBar') sideBar!: SideBarComponent;

  bDashboard: boolean = true;

  constructor(private route: ActivatedRoute) {
    this.route.url.subscribe(() => {
      this.bDashboard = !this.route.snapshot.firstChild;
    });
  }

  onSideBarCollapseClick(collapsed: boolean) {
    this.sideBar.bCollapsed = collapsed;
  }
}
