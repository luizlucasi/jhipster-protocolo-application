import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVersao } from 'app/shared/model/versao.model';

@Component({
  selector: 'jhi-versao-detail',
  templateUrl: './versao-detail.component.html'
})
export class VersaoDetailComponent implements OnInit {
  versao: IVersao;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ versao }) => {
      this.versao = versao;
    });
  }

  previousState() {
    window.history.back();
  }
}
