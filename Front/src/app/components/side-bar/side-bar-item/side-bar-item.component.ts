import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-side-bar-item',
  templateUrl: './side-bar-item.component.html',
  styleUrls: ['./side-bar-item.component.scss']
})
export class SideBarItemComponent {

  bCollapsed: boolean = true;
  bHovered: boolean = false;
  bHighlight: boolean = false;
  @Input() level: number = 0;
  @Input() data: any = {}

  @ViewChild('collapseIcon') collapseIcon: any;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.bHighlight = this.router.url == this.data.path;
      }
    });
  }


  onClick() {
    if (this.data.items.length > 0) {
      this.bCollapsed = !this.bCollapsed;
    }
    else {
      this.router.navigateByUrl(this.data.path);
    }
  }

}
