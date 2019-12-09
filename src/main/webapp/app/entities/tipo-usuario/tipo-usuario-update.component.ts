import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ITipoUsuario, TipoUsuario } from 'app/shared/model/tipo-usuario.model';
import { TipoUsuarioService } from './tipo-usuario.service';

@Component({
  selector: 'jhi-tipo-usuario-update',
  templateUrl: './tipo-usuario-update.component.html'
})
export class TipoUsuarioUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    descricao: [null, [Validators.required]]
  });

  constructor(protected tipoUsuarioService: TipoUsuarioService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ tipoUsuario }) => {
      this.updateForm(tipoUsuario);
    });
  }

  updateForm(tipoUsuario: ITipoUsuario) {
    this.editForm.patchValue({
      id: tipoUsuario.id,
      descricao: tipoUsuario.descricao
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const tipoUsuario = this.createFromForm();
    if (tipoUsuario.id !== undefined) {
      this.subscribeToSaveResponse(this.tipoUsuarioService.update(tipoUsuario));
    } else {
      this.subscribeToSaveResponse(this.tipoUsuarioService.create(tipoUsuario));
    }
  }

  private createFromForm(): ITipoUsuario {
    return {
      ...new TipoUsuario(),
      id: this.editForm.get(['id']).value,
      descricao: this.editForm.get(['descricao']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoUsuario>>) {
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
