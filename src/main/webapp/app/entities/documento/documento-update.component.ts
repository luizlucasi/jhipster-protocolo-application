import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IDocumento, Documento } from 'app/shared/model/documento.model';
import { DocumentoService } from './documento.service';

@Component({
  selector: 'jhi-documento-update',
  templateUrl: './documento-update.component.html'
})
export class DocumentoUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nomeDocumento: [null, [Validators.required]],
    codDocumento: [null, [Validators.required]],
    isActive: [null, [Validators.required]]
  });

  constructor(protected documentoService: DocumentoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ documento }) => {
      this.updateForm(documento);
    });
  }

  updateForm(documento: IDocumento) {
    this.editForm.patchValue({
      id: documento.id,
      nomeDocumento: documento.nomeDocumento,
      codDocumento: documento.codDocumento,
      isActive: documento.isActive
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const documento = this.createFromForm();
    if (documento.id !== undefined) {
      this.subscribeToSaveResponse(this.documentoService.update(documento));
    } else {
      this.subscribeToSaveResponse(this.documentoService.create(documento));
    }
  }

  private createFromForm(): IDocumento {
    return {
      ...new Documento(),
      id: this.editForm.get(['id']).value,
      nomeDocumento: this.editForm.get(['nomeDocumento']).value,
      codDocumento: this.editForm.get(['codDocumento']).value,
      isActive: this.editForm.get(['isActive']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDocumento>>) {
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
