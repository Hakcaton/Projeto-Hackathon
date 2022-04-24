import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent implements OnInit {

  @Input() text: string = '✓';
  @Input() color: string = '#5CB85C';

  constructor() { }

  ngOnInit(): void {
  }

}
