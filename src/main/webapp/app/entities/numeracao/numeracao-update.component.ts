import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { INumeracao, Numeracao } from 'app/shared/model/numeracao.model';
import { NumeracaoService } from './numeracao.service';

@Component({
  selector: 'jhi-numeracao-update',
  templateUrl: './numeracao-update.component.html'
})
export class NumeracaoUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    numero: [null, [Validators.required]],
    ano: [null, [Validators.required]]
  });

  constructor(protected numeracaoService: NumeracaoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ numeracao }) => {
      this.updateForm(numeracao);
    });
  }

  updateForm(numeracao: INumeracao) {
    this.editForm.patchValue({
      id: numeracao.id,
      numero: numeracao.numero,
      ano: numeracao.ano
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const numeracao = this.createFromForm();
    if (numeracao.id !== undefined) {
      this.subscribeToSaveResponse(this.numeracaoService.update(numeracao));
    } else {
      this.subscribeToSaveResponse(this.numeracaoService.create(numeracao));
    }
  }

  private createFromForm(): INumeracao {
    return {
      ...new Numeracao(),
      id: this.editForm.get(['id']).value,
      numero: this.editForm.get(['numero']).value,
      ano: this.editForm.get(['ano']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INumeracao>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
