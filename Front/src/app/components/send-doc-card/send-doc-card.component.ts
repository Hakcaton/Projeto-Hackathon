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

  @ViewChild('imgSendCancel') imgSendCancel: any;
  @ViewChild('spanSendCancel') spanSendCancel: any;
  @ViewChild('imgCancel') imgCancel: any;
  @ViewChild('spanCancel') spanCancel: any;

  constructor(private documentService: DocumentsService) {}

  @Input() data: DocumentModel = {
    id: '1',
    title: '',
    subtitle: '',
    tooltip_text: '',
    state: -1,
    file: null,
  };

  tags: any = tags;

  ngOnInit(): void {}

  onFileChanges(event: any) {
    this.data.file = {
      base64: event[0].base64,
      name: event[0].name,
    };
  }

  btnCancelClick() {
    this.data.file = null;
  }

  btnSendClick() {
    this.documentService
      .insertFile(this.data)
      .pipe(
        map((response: any) => {
          this.data = response.document;
        })
      )
      .subscribe();
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
    this.data.state = 0;
    this.data = this.documentService.updateDocument(this.data);
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
