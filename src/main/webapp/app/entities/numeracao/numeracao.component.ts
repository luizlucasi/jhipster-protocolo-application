import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { INumeracao } from 'app/shared/model/numeracao.model';
import { NumeracaoService } from './numeracao.service';
import { NumeracaoDeleteDialogComponent } from './numeracao-delete-dialog.component';

@Component({
  selector: 'jhi-numeracao',
  templateUrl: './numeracao.component.html'
})
export class NumeracaoComponent implements OnInit, OnDestroy {
  numeracaos: INumeracao[];
  eventSubscriber: Subscription;

  constructor(protected numeracaoService: NumeracaoService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.numeracaoService.query().subscribe((res: HttpResponse<INumeracao[]>) => {
      this.numeracaos = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInNumeracaos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: INumeracao) {
    return item.id;
  }

  registerChangeInNumeracaos() {
    this.eventSubscriber = this.eventManager.subscribe('numeracaoListModification', () => this.loadAll());
  }

  delete(numeracao: INumeracao) {
    const modalRef = this.modalService.open(NumeracaoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.numeracao = numeracao;
  }
}
