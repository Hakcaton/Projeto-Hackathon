import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, throwError } from 'rxjs';
import { DocumentModel } from 'src/app/models/document.model';
import { DocumentsService } from 'src/app/services/documents.service';
import { DateHelper } from 'src/app/tools/helpers/date.helper';

@Component({
  selector: 'app-document-validation-card',
  templateUrl: './document-validation-card.component.html',
  styleUrls: ['./document-validation-card.component.scss']
})
export class DocumentValidationCardComponent implements OnInit {

  bRefuseModal: boolean = false;

  @Input() data: DocumentModel = <DocumentModel>{};

  constructor(private documentService: DocumentsService, private toastr: ToastrService, public dateHelper: DateHelper) { }

  ngOnInit(): void {
  }

  btnApproveClick() {
    this.documentService.validateDocument(this.data.id, { approved: true }).pipe(
      map(() => {
        this.toastr.success('Documento validado com sucesso!', 'Validação de documento');
      }),
      catchError((err) => {
        this.toastr.error('Ocorreu um erro durante validação do documento', 'Validação de documento');
        return throwError(() => err);
      })
    ).subscribe();
  }

  btnRefuseClick() {
    this.bRefuseModal = true;
  }

  onRefuseConfirm(reason: string) {
    this.documentService.validateDocument(this.data.id, { approved: false, reason: reason }).pipe(
      map(() => {
        this.data.status = 2;
        this.bRefuseModal = false;
      }),
      catchError((err) => {
        this.toastr.error('Ocorreu um erro durante validação do documento', 'Validação de documento');
        return throwError(() => err);
      })
    ).subscribe();
  }

  onRefuseCancel() {
    this.bRefuseModal = false;
  }

  openDocumentFile() {
    const uri: string = 'data:' + this.data.file.format + ';base64,' + encodeURI(this.data.file.base64);

    let newWindow = window.open(uri);
    if (newWindow) {
      newWindow.document.write("<style>body{margin: 0}</style>");
      newWindow.document.write("<style>iframe{border: none}</style>");
      newWindow.document.write("<iframe width='100%' height='100%' src='" + uri + "'></iframe>");
    }
  }

}
