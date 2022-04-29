import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IconData } from 'src/app/constants/icons.constant';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {
  @Input() icon: string = '';
  @Input() scale: number = 1;

  icons = IconData;

  iconSource = '';
  width = 24;
  heigth = 24;

  ngOnInit(): void {
    this.iconSource = this.icons.get(this.icon).source;
    this.width = 24 * this.scale * this.icons.get(this.icon).w;
    this.heigth = 24 * this.scale * this.icons.get(this.icon).h;
  }
}
