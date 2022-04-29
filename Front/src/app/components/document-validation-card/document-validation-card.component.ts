import { Component, Input, OnInit } from '@angular/core';
import { DocumentModel } from 'src/app/models/document.model';

@Component({
  selector: 'app-document-validation-card',
  templateUrl: './document-validation-card.component.html',
  styleUrls: ['./document-validation-card.component.scss']
})
export class DocumentValidationCardComponent implements OnInit {

  @Input() data: DocumentModel = <DocumentModel>{};

  constructor() { }

  ngOnInit(): void {
  }

  btnValidateClick() {

  }

}
