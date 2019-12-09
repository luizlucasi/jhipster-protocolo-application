import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IVersao, Versao } from 'app/shared/model/versao.model';
import { VersaoService } from './versao.service';

@Component({
  selector: 'jhi-versao-update',
  templateUrl: './versao-update.component.html'
})
export class VersaoUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    numeroVersao: [null, [Validators.required]]
  });

  constructor(protected versaoService: VersaoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ versao }) => {
      this.updateForm(versao);
    });
  }

  updateForm(versao: IVersao) {
    this.editForm.patchValue({
      id: versao.id,
      numeroVersao: versao.numeroVersao
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const versao = this.createFromForm();
    if (versao.id !== undefined) {
      this.subscribeToSaveResponse(this.versaoService.update(versao));
    } else {
      this.subscribeToSaveResponse(this.versaoService.create(versao));
    }
  }

  private createFromForm(): IVersao {
    return {
      ...new Versao(),
      id: this.editForm.get(['id']).value,
      numeroVersao: this.editForm.get(['numeroVersao']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVersao>>) {
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
