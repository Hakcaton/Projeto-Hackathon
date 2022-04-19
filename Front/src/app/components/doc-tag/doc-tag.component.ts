import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-doc-tag',
  templateUrl: './doc-tag.component.html',
  styleUrls: ['./doc-tag.component.scss']
})
export class DocTagComponent implements OnInit {

  @Input() text: string = '';
  @Input() color: string = '#E1E1E1';
  @Input() font_color: string = '#535353';
  @Input() font_weight: number = 200;
  @Input() tooltip_text: string = '';

  @ViewChild('tag') tag: any;

  constructor() { }

  ngOnInit(): void {
    
  }

}
