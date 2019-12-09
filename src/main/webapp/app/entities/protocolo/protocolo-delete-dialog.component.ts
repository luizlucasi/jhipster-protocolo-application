import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProtocolo } from 'app/shared/model/protocolo.model';
import { ProtocoloService } from './protocolo.service';

@Component({
  templateUrl: './protocolo-delete-dialog.component.html'
})
export class ProtocoloDeleteDialogComponent {
  protocolo: IProtocolo;

  constructor(protected protocoloService: ProtocoloService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.protocoloService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'protocoloListModification',
        content: 'Deleted an protocolo'
      });
      this.activeModal.dismiss(true);
    });
  }
}
