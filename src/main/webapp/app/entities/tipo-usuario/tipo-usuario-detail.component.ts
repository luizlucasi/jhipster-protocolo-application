import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoUsuario } from 'app/shared/model/tipo-usuario.model';

@Component({
  selector: 'jhi-tipo-usuario-detail',
  templateUrl: './tipo-usuario-detail.component.html'
})
export class TipoUsuarioDetailComponent implements OnInit {
  tipoUsuario: ITipoUsuario;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tipoUsuario }) => {
      this.tipoUsuario = tipoUsuario;
    });
  }

  previousState() {
    window.history.back();
  }
}
