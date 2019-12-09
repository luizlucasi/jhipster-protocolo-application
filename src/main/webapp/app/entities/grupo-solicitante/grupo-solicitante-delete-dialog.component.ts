import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGrupoSolicitante } from 'app/shared/model/grupo-solicitante.model';
import { GrupoSolicitanteService } from './grupo-solicitante.service';

@Component({
  templateUrl: './grupo-solicitante-delete-dialog.component.html'
})
export class GrupoSolicitanteDeleteDialogComponent {
  grupoSolicitante: IGrupoSolicitante;

  constructor(
    protected grupoSolicitanteService: GrupoSolicitanteService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.grupoSolicitanteService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'grupoSolicitanteListModification',
        content: 'Deleted an grupoSolicitante'
      });
      this.activeModal.dismiss(true);
    });
  }
}
