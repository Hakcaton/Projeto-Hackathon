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

  @Input() data: DocumentModel = {
    id: -1,
    title: '',
    subtitle: '',
    tag_description: '',
    state: -1
  };
  tags: any = tags;

  ngOnInit(): void {
  }

}
