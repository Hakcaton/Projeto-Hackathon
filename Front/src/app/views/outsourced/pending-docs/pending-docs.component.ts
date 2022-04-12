import { Component, OnInit } from '@angular/core';
import { DocumentModel } from 'src/app/models/document.model';

@Component({
  selector: 'app-pending-docs',
  templateUrl: './pending-docs.component.html',
  styleUrls: ['./pending-docs.component.scss']
})
export class PendingDocsComponent implements OnInit {

  generalDocuments: DocumentModel[] = [
    {
      id: 1,
      title: 'Documento A',
      subtitle: '20/01/2001',
      tag_description: '',
      state: 0
    },
    {
      id: 2,
      title: 'Documento B',
      subtitle: '20/01/2001',
      tag_description: '',
      state: 1
    },
    {
      id: 3,
      title: 'Documento C',
      subtitle: '20/01/2001',
      tag_description: '',
      state: 2
    },
    {
      id: 4,
      title: 'Documento D',
      subtitle: '20/01/2001',
      tag_description: '',
      state: 3
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
