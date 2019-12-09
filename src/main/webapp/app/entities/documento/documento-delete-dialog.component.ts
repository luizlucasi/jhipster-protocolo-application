import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDocumento } from 'app/shared/model/documento.model';
import { DocumentoService } from './documento.service';

@Component({
  templateUrl: './documento-delete-dialog.component.html'
})
export class DocumentoDeleteDialogComponent {
  documento: IDocumento;

  constructor(protected documentoService: DocumentoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.documentoService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'documentoListModification',
        content: 'Deleted an documento'
      });
      this.activeModal.dismiss(true);
    });
  }
}
