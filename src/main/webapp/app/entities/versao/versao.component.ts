import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IVersao } from 'app/shared/model/versao.model';
import { VersaoService } from './versao.service';
import { VersaoDeleteDialogComponent } from './versao-delete-dialog.component';

@Component({
  selector: 'jhi-versao',
  templateUrl: './versao.component.html'
})
export class VersaoComponent implements OnInit, OnDestroy {
  versaos: IVersao[];
  eventSubscriber: Subscription;

  constructor(protected versaoService: VersaoService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.versaoService.query().subscribe((res: HttpResponse<IVersao[]>) => {
      this.versaos = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInVersaos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IVersao) {
    return item.id;
  }

  registerChangeInVersaos() {
    this.eventSubscriber = this.eventManager.subscribe('versaoListModification', () => this.loadAll());
  }

  delete(versao: IVersao) {
    const modalRef = this.modalService.open(VersaoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.versao = versao;
  }
}
