import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoProtocolo } from 'app/shared/model/tipo-protocolo.model';

@Component({
  selector: 'jhi-tipo-protocolo-detail',
  templateUrl: './tipo-protocolo-detail.component.html'
})
export class TipoProtocoloDetailComponent implements OnInit {
  tipoProtocolo: ITipoProtocolo;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tipoProtocolo }) => {
      this.tipoProtocolo = tipoProtocolo;
    });
  }

  previousState() {
    window.history.back();
  }
}
