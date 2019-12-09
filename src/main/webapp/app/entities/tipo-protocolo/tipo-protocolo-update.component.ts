import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ITipoProtocolo, TipoProtocolo } from 'app/shared/model/tipo-protocolo.model';
import { TipoProtocoloService } from './tipo-protocolo.service';

@Component({
  selector: 'jhi-tipo-protocolo-update',
  templateUrl: './tipo-protocolo-update.component.html'
})
export class TipoProtocoloUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nomeProtocolo: [null, [Validators.required]],
    codProtocolo: [null, [Validators.required]],
    isActive: [null, [Validators.required]]
  });

  constructor(protected tipoProtocoloService: TipoProtocoloService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ tipoProtocolo }) => {
      this.updateForm(tipoProtocolo);
    });
  }

  updateForm(tipoProtocolo: ITipoProtocolo) {
    this.editForm.patchValue({
      id: tipoProtocolo.id,
      nomeProtocolo: tipoProtocolo.nomeProtocolo,
      codProtocolo: tipoProtocolo.codProtocolo,
      isActive: tipoProtocolo.isActive
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const tipoProtocolo = this.createFromForm();
    if (tipoProtocolo.id !== undefined) {
      this.subscribeToSaveResponse(this.tipoProtocoloService.update(tipoProtocolo));
    } else {
      this.subscribeToSaveResponse(this.tipoProtocoloService.create(tipoProtocolo));
    }
  }

  private createFromForm(): ITipoProtocolo {
    return {
      ...new TipoProtocolo(),
      id: this.editForm.get(['id']).value,
      nomeProtocolo: this.editForm.get(['nomeProtocolo']).value,
      codProtocolo: this.editForm.get(['codProtocolo']).value,
      isActive: this.editForm.get(['isActive']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoProtocolo>>) {
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
