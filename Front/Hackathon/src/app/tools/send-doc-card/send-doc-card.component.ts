import { Component, Input, OnInit } from '@angular/core';
import { tags } from 'src/app/constants/tags.constant';
import { DocumentModel } from 'src/app/models/document.model';

@Component({
  selector: 'app-send-doc-card',
  templateUrl: './send-doc-card.component.html',
  styleUrls: ['./send-doc-card.component.scss']
})
export class SendDocCardComponent implements OnInit {

  constructor() { }

  @Input() data: DocumentModel;
  tags: any = tags;

  ngOnInit(): void {
  }

}
