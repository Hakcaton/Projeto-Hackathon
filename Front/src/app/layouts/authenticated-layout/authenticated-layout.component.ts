import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SideBarComponent } from 'src/app/components/side-bar/side-bar.component';

@Component({
  selector: 'app-authenticated-layout',
  templateUrl: './authenticated-layout.component.html',
  styleUrls: ['./authenticated-layout.component.scss'],
})
export class AuthenticatedLayoutComponent {

  @ViewChild('sideBar') sideBar!: SideBarComponent;

  onSideBarCollapseClick(collapsed: boolean){
    this.sideBar.bCollapsed = collapsed;
  }
}
