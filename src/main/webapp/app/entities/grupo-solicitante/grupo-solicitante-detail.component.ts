import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGrupoSolicitante } from 'app/shared/model/grupo-solicitante.model';

@Component({
  selector: 'jhi-grupo-solicitante-detail',
  templateUrl: './grupo-solicitante-detail.component.html'
})
export class GrupoSolicitanteDetailComponent implements OnInit {
  grupoSolicitante: IGrupoSolicitante;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ grupoSolicitante }) => {
      this.grupoSolicitante = grupoSolicitante;
    });
  }

  previousState() {
    window.history.back();
  }
}
