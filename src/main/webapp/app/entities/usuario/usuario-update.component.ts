import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IUsuario, Usuario } from 'app/shared/model/usuario.model';
import { UsuarioService } from './usuario.service';
import { ITipoUsuario } from 'app/shared/model/tipo-usuario.model';
import { TipoUsuarioService } from 'app/entities/tipo-usuario/tipo-usuario.service';

@Component({
  selector: 'jhi-usuario-update',
  templateUrl: './usuario-update.component.html'
})
export class UsuarioUpdateComponent implements OnInit {
  isSaving: boolean;

  tipousuarios: ITipoUsuario[];

  editForm = this.fb.group({
    id: [],
    nomeUsuario: [null, [Validators.required]],
    isActive: [null, [Validators.required]],
    tipoUsuario: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected usuarioService: UsuarioService,
    protected tipoUsuarioService: TipoUsuarioService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ usuario }) => {
      this.updateForm(usuario);
    });
    this.tipoUsuarioService
      .query()
      .subscribe(
        (res: HttpResponse<ITipoUsuario[]>) => (this.tipousuarios = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(usuario: IUsuario) {
    this.editForm.patchValue({
      id: usuario.id,
      nomeUsuario: usuario.nomeUsuario,
      isActive: usuario.isActive,
      tipoUsuario: usuario.tipoUsuario
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const usuario = this.createFromForm();
    if (usuario.id !== undefined) {
      this.subscribeToSaveResponse(this.usuarioService.update(usuario));
    } else {
      this.subscribeToSaveResponse(this.usuarioService.create(usuario));
    }
  }

  private createFromForm(): IUsuario {
    return {
      ...new Usuario(),
      id: this.editForm.get(['id']).value,
      nomeUsuario: this.editForm.get(['nomeUsuario']).value,
      isActive: this.editForm.get(['isActive']).value,
      tipoUsuario: this.editForm.get(['tipoUsuario']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUsuario>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackTipoUsuarioById(index: number, item: ITipoUsuario) {
    return item.id;
  }
}
