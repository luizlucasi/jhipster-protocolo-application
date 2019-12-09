import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProtocolo } from 'app/shared/model/protocolo.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { ProtocoloService } from './protocolo.service';
import { ProtocoloDeleteDialogComponent } from './protocolo-delete-dialog.component';

@Component({
  selector: 'jhi-protocolo',
  templateUrl: './protocolo.component.html'
})
export class ProtocoloComponent implements OnInit, OnDestroy {
  protocolos: IProtocolo[];
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

  constructor(
    protected protocoloService: ProtocoloService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.protocolos = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
  }

  loadAll() {
    this.protocoloService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IProtocolo[]>) => this.paginateProtocolos(res.body, res.headers));
  }

  reset() {
    this.page = 0;
    this.protocolos = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInProtocolos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IProtocolo) {
    return item.id;
  }

  registerChangeInProtocolos() {
    this.eventSubscriber = this.eventManager.subscribe('protocoloListModification', () => this.reset());
  }

  delete(protocolo: IProtocolo) {
    const modalRef = this.modalService.open(ProtocoloDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.protocolo = protocolo;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateProtocolos(data: IProtocolo[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.protocolos.push(data[i]);
    }
  }
}
