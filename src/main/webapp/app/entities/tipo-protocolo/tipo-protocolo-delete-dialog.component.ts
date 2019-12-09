import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoProtocolo } from 'app/shared/model/tipo-protocolo.model';
import { TipoProtocoloService } from './tipo-protocolo.service';

@Component({
  templateUrl: './tipo-protocolo-delete-dialog.component.html'
})
export class TipoProtocoloDeleteDialogComponent {
  tipoProtocolo: ITipoProtocolo;

  constructor(
    protected tipoProtocoloService: TipoProtocoloService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.tipoProtocoloService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'tipoProtocoloListModification',
        content: 'Deleted an tipoProtocolo'
      });
      this.activeModal.dismiss(true);
    });
  }
}
