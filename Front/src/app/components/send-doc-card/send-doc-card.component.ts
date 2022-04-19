import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { tags } from 'src/app/constants/tags.constant';
import { DocumentModel } from 'src/app/models/document.model';
import { DocumentsService } from 'src/app/services/documents.service';

@Component({
  selector: 'app-send-doc-card',
  templateUrl: './send-doc-card.component.html',
  styleUrls: ['./send-doc-card.component.scss'],
})
export class SendDocCardComponent implements OnInit {
  file: File | null = null;

  @ViewChild('imgSendCancel') imgSendCancel: any;
  @ViewChild('spanSendCancel') spanSendCancel: any;
  @ViewChild('imgCancel') imgCancel: any;
  @ViewChild('spanCancel') spanCancel: any;


  constructor(private documentService: DocumentsService) {}

  @Input() data: DocumentModel = {
    id: -1,
    title: '',
    subtitle: '',
    tooltip_text: '',
    state: -1,
  };
  tags: any = tags; 

  ngOnInit(): void {}

  fileChange(event: any){
     this.file=event.target.files[0];
  }

  btnCancelClick(){
    this.file = null;
  }
  
  btnSendClick(){
    this.data.state = 1;
    this.data = this.documentService.updateDocument(this.data);
  }

  btnSendCancelHover(){
    this.imgSendCancel.nativeElement.setAttribute('src', '/assets/icons/cancel.svg');
    this.spanSendCancel.nativeElement.innerHTML = 'Cancelar';
  }

  btnSendCancelUnhover(){
    this.imgSendCancel.nativeElement.setAttribute('src', '/assets/icons/check.svg');
    this.spanSendCancel.nativeElement.innerHTML = 'Enviado';
  }

  btnSendCancelClick(){
    this.data.state  = 0;
    this.data = this.documentService.updateDocument(this.data);
  }

  btnCancelHover(){
    this.imgCancel.nativeElement.setAttribute('src', '/assets/icons/cancel.svg');
    this.spanCancel.nativeElement.innerHTML = 'Remover';
  }

  btnCancelUnhover(){
    this.imgCancel.nativeElement.setAttribute('src', '/assets/icons/check.svg');
    this.spanCancel.nativeElement.innerHTML = 'Carregado';
  }
}
