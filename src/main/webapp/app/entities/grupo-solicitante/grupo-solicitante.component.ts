import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IGrupoSolicitante } from 'app/shared/model/grupo-solicitante.model';
import { GrupoSolicitanteService } from './grupo-solicitante.service';
import { GrupoSolicitanteDeleteDialogComponent } from './grupo-solicitante-delete-dialog.component';

@Component({
  selector: 'jhi-grupo-solicitante',
  templateUrl: './grupo-solicitante.component.html'
})
export class GrupoSolicitanteComponent implements OnInit, OnDestroy {
  grupoSolicitantes: IGrupoSolicitante[];
  eventSubscriber: Subscription;

  constructor(
    protected grupoSolicitanteService: GrupoSolicitanteService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll() {
    this.grupoSolicitanteService.query().subscribe((res: HttpResponse<IGrupoSolicitante[]>) => {
      this.grupoSolicitantes = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInGrupoSolicitantes();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IGrupoSolicitante) {
    return item.id;
  }

  registerChangeInGrupoSolicitantes() {
    this.eventSubscriber = this.eventManager.subscribe('grupoSolicitanteListModification', () => this.loadAll());
  }

  delete(grupoSolicitante: IGrupoSolicitante) {
    const modalRef = this.modalService.open(GrupoSolicitanteDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.grupoSolicitante = grupoSolicitante;
  }
}
