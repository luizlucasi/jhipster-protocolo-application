import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INumeracao } from 'app/shared/model/numeracao.model';
import { NumeracaoService } from './numeracao.service';

@Component({
  templateUrl: './numeracao-delete-dialog.component.html'
})
export class NumeracaoDeleteDialogComponent {
  numeracao: INumeracao;

  constructor(protected numeracaoService: NumeracaoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.numeracaoService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'numeracaoListModification',
        content: 'Deleted an numeracao'
      });
      this.activeModal.dismiss(true);
    });
  }
}
