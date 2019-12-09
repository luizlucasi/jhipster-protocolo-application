import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVersao } from 'app/shared/model/versao.model';
import { VersaoService } from './versao.service';

@Component({
  templateUrl: './versao-delete-dialog.component.html'
})
export class VersaoDeleteDialogComponent {
  versao: IVersao;

  constructor(protected versaoService: VersaoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.versaoService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'versaoListModification',
        content: 'Deleted an versao'
      });
      this.activeModal.dismiss(true);
    });
  }
}
