import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INumeracao } from 'app/shared/model/numeracao.model';

@Component({
  selector: 'jhi-numeracao-detail',
  templateUrl: './numeracao-detail.component.html'
})
export class NumeracaoDetailComponent implements OnInit {
  numeracao: INumeracao;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ numeracao }) => {
      this.numeracao = numeracao;
    });
  }

  previousState() {
    window.history.back();
  }
}
