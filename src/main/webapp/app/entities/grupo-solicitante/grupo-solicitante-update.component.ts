import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IGrupoSolicitante, GrupoSolicitante } from 'app/shared/model/grupo-solicitante.model';
import { GrupoSolicitanteService } from './grupo-solicitante.service';

@Component({
  selector: 'jhi-grupo-solicitante-update',
  templateUrl: './grupo-solicitante-update.component.html'
})
export class GrupoSolicitanteUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nomeGrupoSolicitante: [null, [Validators.required]]
  });

  constructor(
    protected grupoSolicitanteService: GrupoSolicitanteService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ grupoSolicitante }) => {
      this.updateForm(grupoSolicitante);
    });
  }

  updateForm(grupoSolicitante: IGrupoSolicitante) {
    this.editForm.patchValue({
      id: grupoSolicitante.id,
      nomeGrupoSolicitante: grupoSolicitante.nomeGrupoSolicitante
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const grupoSolicitante = this.createFromForm();
    if (grupoSolicitante.id !== undefined) {
      this.subscribeToSaveResponse(this.grupoSolicitanteService.update(grupoSolicitante));
    } else {
      this.subscribeToSaveResponse(this.grupoSolicitanteService.create(grupoSolicitante));
    }
  }

  private createFromForm(): IGrupoSolicitante {
    return {
      ...new GrupoSolicitante(),
      id: this.editForm.get(['id']).value,
      nomeGrupoSolicitante: this.editForm.get(['nomeGrupoSolicitante']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGrupoSolicitante>>) {
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
