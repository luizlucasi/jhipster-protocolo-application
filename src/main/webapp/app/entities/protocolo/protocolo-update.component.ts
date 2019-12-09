import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IProtocolo, Protocolo } from 'app/shared/model/protocolo.model';
import { ProtocoloService } from './protocolo.service';
import { IVersao } from 'app/shared/model/versao.model';
import { VersaoService } from 'app/entities/versao/versao.service';
import { IDocumento } from 'app/shared/model/documento.model';
import { DocumentoService } from 'app/entities/documento/documento.service';
import { ITipoProtocolo } from 'app/shared/model/tipo-protocolo.model';
import { TipoProtocoloService } from 'app/entities/tipo-protocolo/tipo-protocolo.service';
import { ISetor } from 'app/shared/model/setor.model';
import { SetorService } from 'app/entities/setor/setor.service';
import { ICategoria } from 'app/shared/model/categoria.model';
import { CategoriaService } from 'app/entities/categoria/categoria.service';
import { INumeracao } from 'app/shared/model/numeracao.model';
import { NumeracaoService } from 'app/entities/numeracao/numeracao.service';

@Component({
  selector: 'jhi-protocolo-update',
  templateUrl: './protocolo-update.component.html'
})
export class ProtocoloUpdateComponent implements OnInit {
  isSaving: boolean;

  versaos: IVersao[];

  documentos: IDocumento[];

  tipoprotocolos: ITipoProtocolo[];

  setors: ISetor[];

  categorias: ICategoria[];

  numeracaos: INumeracao[];

  editForm = this.fb.group({
    id: [],
    solicitante: [null, [Validators.required]],
    dataSolicitacao: [null, [Validators.required]],
    dataEnvio: [],
    enviadoPor: [],
    dataCriacao: [null, [Validators.required]],
    usuarioCriacao: [null, [Validators.required]],
    localizacao: [],
    observacao: [],
    nomenclatura: [],
    formato: [],
    versao: [],
    documento: [],
    tipoProtocolo: [],
    setor: [],
    categoria: [],
    numeracao: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected protocoloService: ProtocoloService,
    protected versaoService: VersaoService,
    protected documentoService: DocumentoService,
    protected tipoProtocoloService: TipoProtocoloService,
    protected setorService: SetorService,
    protected categoriaService: CategoriaService,
    protected numeracaoService: NumeracaoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ protocolo }) => {
      this.updateForm(protocolo);
    });
    this.versaoService
      .query()
      .subscribe((res: HttpResponse<IVersao[]>) => (this.versaos = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.documentoService
      .query()
      .subscribe((res: HttpResponse<IDocumento[]>) => (this.documentos = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.tipoProtocoloService
      .query()
      .subscribe(
        (res: HttpResponse<ITipoProtocolo[]>) => (this.tipoprotocolos = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.setorService
      .query()
      .subscribe((res: HttpResponse<ISetor[]>) => (this.setors = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.categoriaService
      .query()
      .subscribe((res: HttpResponse<ICategoria[]>) => (this.categorias = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.numeracaoService
      .query()
      .subscribe((res: HttpResponse<INumeracao[]>) => (this.numeracaos = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(protocolo: IProtocolo) {
    this.editForm.patchValue({
      id: protocolo.id,
      solicitante: protocolo.solicitante,
      dataSolicitacao: protocolo.dataSolicitacao != null ? protocolo.dataSolicitacao.format(DATE_TIME_FORMAT) : null,
      dataEnvio: protocolo.dataEnvio != null ? protocolo.dataEnvio.format(DATE_TIME_FORMAT) : null,
      enviadoPor: protocolo.enviadoPor,
      dataCriacao: protocolo.dataCriacao != null ? protocolo.dataCriacao.format(DATE_TIME_FORMAT) : null,
      usuarioCriacao: protocolo.usuarioCriacao != null ? protocolo.usuarioCriacao.format(DATE_TIME_FORMAT) : null,
      localizacao: protocolo.localizacao,
      observacao: protocolo.observacao,
      nomenclatura: protocolo.nomenclatura,
      formato: protocolo.formato,
      versao: protocolo.versao,
      documento: protocolo.documento,
      tipoProtocolo: protocolo.tipoProtocolo,
      setor: protocolo.setor,
      categoria: protocolo.categoria,
      numeracao: protocolo.numeracao
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const protocolo = this.createFromForm();
    if (protocolo.id !== undefined) {
      this.subscribeToSaveResponse(this.protocoloService.update(protocolo));
    } else {
      this.subscribeToSaveResponse(this.protocoloService.create(protocolo));
    }
  }

  private createFromForm(): IProtocolo {
    return {
      ...new Protocolo(),
      id: this.editForm.get(['id']).value,
      solicitante: this.editForm.get(['solicitante']).value,
      dataSolicitacao:
        this.editForm.get(['dataSolicitacao']).value != null
          ? moment(this.editForm.get(['dataSolicitacao']).value, DATE_TIME_FORMAT)
          : undefined,
      dataEnvio:
        this.editForm.get(['dataEnvio']).value != null ? moment(this.editForm.get(['dataEnvio']).value, DATE_TIME_FORMAT) : undefined,
      enviadoPor: this.editForm.get(['enviadoPor']).value,
      dataCriacao:
        this.editForm.get(['dataCriacao']).value != null ? moment(this.editForm.get(['dataCriacao']).value, DATE_TIME_FORMAT) : undefined,
      usuarioCriacao:
        this.editForm.get(['usuarioCriacao']).value != null
          ? moment(this.editForm.get(['usuarioCriacao']).value, DATE_TIME_FORMAT)
          : undefined,
      localizacao: this.editForm.get(['localizacao']).value,
      observacao: this.editForm.get(['observacao']).value,
      nomenclatura: this.editForm.get(['nomenclatura']).value,
      formato: this.editForm.get(['formato']).value,
      versao: this.editForm.get(['versao']).value,
      documento: this.editForm.get(['documento']).value,
      tipoProtocolo: this.editForm.get(['tipoProtocolo']).value,
      setor: this.editForm.get(['setor']).value,
      categoria: this.editForm.get(['categoria']).value,
      numeracao: this.editForm.get(['numeracao']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProtocolo>>) {
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

  trackVersaoById(index: number, item: IVersao) {
    return item.id;
  }

  trackDocumentoById(index: number, item: IDocumento) {
    return item.id;
  }

  trackTipoProtocoloById(index: number, item: ITipoProtocolo) {
    return item.id;
  }

  trackSetorById(index: number, item: ISetor) {
    return item.id;
  }

  trackCategoriaById(index: number, item: ICategoria) {
    return item.id;
  }

  trackNumeracaoById(index: number, item: INumeracao) {
    return item.id;
  }
}
