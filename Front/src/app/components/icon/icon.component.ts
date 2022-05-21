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
  @Input() color: string = 'default';

  icons = IconData;

  iconSource = '';
  width = 24;
  heigth = 24;
  filter = 'invert(22%) sepia(89%) saturate(0%) hue-rotate(221deg) brightness(107%) contrast(81%)';

  ngOnInit(): void {
    this.iconSource = this.icons.get(this.icon).source;
    this.width = 24 * this.scale * this.icons.get(this.icon).w;
    this.heigth = 24 * this.scale * this.icons.get(this.icon).h;
    switch (this.color) {
      case 'default':
        this.filter = 'invert(22%) sepia(89%) saturate(0%) hue-rotate(221deg) brightness(107%) contrast(81%)';
        break;
      case 'green':
        this.filter = 'invert(69%) sepia(13%) saturate(1668%) hue-rotate(71deg) brightness(89%) contrast(91%)';
        break;
      case 'red':
        this.filter = 'invert(49%) sepia(12%) saturate(2633%) hue-rotate(314deg) brightness(88%) contrast(101%)';
        break;
      case 'light':
        this.filter = 'invert(95%) sepia(15%) saturate(54%) hue-rotate(186deg) brightness(99%) contrast(96%)';
        break;
      case "primary-blue":
        this.filter = 'invert(32%) sepia(79%) saturate(2949%) hue-rotate(207deg) brightness(97%) contrast(103%)';
        break;

      default:
        break;
    }
  }
}
