import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITipoProtocolo } from 'app/shared/model/tipo-protocolo.model';
import { TipoProtocoloService } from './tipo-protocolo.service';
import { TipoProtocoloDeleteDialogComponent } from './tipo-protocolo-delete-dialog.component';

@Component({
  selector: 'jhi-tipo-protocolo',
  templateUrl: './tipo-protocolo.component.html'
})
export class TipoProtocoloComponent implements OnInit, OnDestroy {
  tipoProtocolos: ITipoProtocolo[];
  eventSubscriber: Subscription;

  constructor(
    protected tipoProtocoloService: TipoProtocoloService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll() {
    this.tipoProtocoloService.query().subscribe((res: HttpResponse<ITipoProtocolo[]>) => {
      this.tipoProtocolos = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInTipoProtocolos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITipoProtocolo) {
    return item.id;
  }

  registerChangeInTipoProtocolos() {
    this.eventSubscriber = this.eventManager.subscribe('tipoProtocoloListModification', () => this.loadAll());
  }

  delete(tipoProtocolo: ITipoProtocolo) {
    const modalRef = this.modalService.open(TipoProtocoloDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.tipoProtocolo = tipoProtocolo;
  }
}
