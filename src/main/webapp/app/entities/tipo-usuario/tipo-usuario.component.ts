import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITipoUsuario } from 'app/shared/model/tipo-usuario.model';
import { TipoUsuarioService } from './tipo-usuario.service';
import { TipoUsuarioDeleteDialogComponent } from './tipo-usuario-delete-dialog.component';

@Component({
  selector: 'jhi-tipo-usuario',
  templateUrl: './tipo-usuario.component.html'
})
export class TipoUsuarioComponent implements OnInit, OnDestroy {
  tipoUsuarios: ITipoUsuario[];
  eventSubscriber: Subscription;

  constructor(
    protected tipoUsuarioService: TipoUsuarioService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll() {
    this.tipoUsuarioService.query().subscribe((res: HttpResponse<ITipoUsuario[]>) => {
      this.tipoUsuarios = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInTipoUsuarios();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITipoUsuario) {
    return item.id;
  }

  registerChangeInTipoUsuarios() {
    this.eventSubscriber = this.eventManager.subscribe('tipoUsuarioListModification', () => this.loadAll());
  }

  delete(tipoUsuario: ITipoUsuario) {
    const modalRef = this.modalService.open(TipoUsuarioDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.tipoUsuario = tipoUsuario;
  }
}
