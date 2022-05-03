import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs';
import { tags } from 'src/app/constants/tags.constant';
import { DocumentModel, FileModel } from 'src/app/models/document.model';
import { DocumentsService } from 'src/app/services/documents.service';

@Component({
  selector: 'app-send-doc-card',
  templateUrl: './send-doc-card.component.html',
  styleUrls: ['./send-doc-card.component.scss'],
})
export class SendDocCardComponent implements OnInit {
  file: FileModel = <FileModel>{};

  @ViewChild('inputFile') inputFile: any;
  @ViewChild('imgSendCancel') imgSendCancel: any;
  @ViewChild('spanSendCancel') spanSendCancel: any;
  @ViewChild('imgCancel') imgCancel: any;
  @ViewChild('spanCancel') spanCancel: any;

  constructor(private documentService: DocumentsService) { }

  @Input() data: DocumentModel = {
    id: '',
    title: '',
    subtitle: '',
    tooltipText: '',
    status: -1,
    file: {
      base64: '',
      format: '',
      name: ''
    },
    requestDate: new Date()
  };

  tags: any = tags;

  ngOnInit(): void { }

  onFileChanges(event: any) {
    this.data.file = {
      base64: event[0].base64,
      format: event[0].type,
      name: event[0].name
    };
  }

  btnCancelClick() {
    this.data.file.base64 = "";
    this.data.file.format = "";
    this.inputFile.nativeElement.value = null;
  }

  btnSendClick() {
    this.documentService.sendFile(this.data).pipe(
      map(() => {
        this.documentService.getDocument(this.data).pipe(
          map((document: DocumentModel) => {
            this.data = document;
          })
        ).subscribe();
      })
    ).subscribe();
  }

  btnSendCancelHover() {
    this.imgSendCancel.nativeElement.setAttribute(
      'src',
      '/assets/icons/cancel.svg'
    );
    this.spanSendCancel.nativeElement.innerHTML = 'Cancelar';
  }

  btnSendCancelUnhover() {
    this.imgSendCancel.nativeElement.setAttribute(
      'src',
      '/assets/icons/check.svg'
    );
    this.spanSendCancel.nativeElement.innerHTML = 'Enviado';
  }

  btnSendCancelClick() {
    this.documentService.deleteFile(this.data).pipe(
      map(() => {
        this.documentService.getDocument(this.data).pipe(
          map((document: DocumentModel) => {
            this.data = document;
          })
        ).subscribe();
      })
    ).subscribe();
  }

  btnCancelHover() {
    this.imgCancel.nativeElement.setAttribute(
      'src',
      '/assets/icons/cancel.svg'
    );
    this.spanCancel.nativeElement.innerHTML = 'Remover';
  }

  btnCancelUnhover() {
    this.imgCancel.nativeElement.setAttribute('src', '/assets/icons/check.svg');
    this.spanCancel.nativeElement.innerHTML = 'Carregado';
  }
}
