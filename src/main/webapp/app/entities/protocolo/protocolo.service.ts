import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProtocolo } from 'app/shared/model/protocolo.model';

type EntityResponseType = HttpResponse<IProtocolo>;
type EntityArrayResponseType = HttpResponse<IProtocolo[]>;

@Injectable({ providedIn: 'root' })
export class ProtocoloService {
  public resourceUrl = SERVER_API_URL + 'api/protocolos';

  constructor(protected http: HttpClient) {}

  create(protocolo: IProtocolo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(protocolo);
    return this.http
      .post<IProtocolo>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(protocolo: IProtocolo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(protocolo);
    return this.http
      .put<IProtocolo>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IProtocolo>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProtocolo[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(protocolo: IProtocolo): IProtocolo {
    const copy: IProtocolo = Object.assign({}, protocolo, {
      dataSolicitacao: protocolo.dataSolicitacao != null && protocolo.dataSolicitacao.isValid() ? protocolo.dataSolicitacao.toJSON() : null,
      dataEnvio: protocolo.dataEnvio != null && protocolo.dataEnvio.isValid() ? protocolo.dataEnvio.toJSON() : null,
      dataCriacao: protocolo.dataCriacao != null && protocolo.dataCriacao.isValid() ? protocolo.dataCriacao.toJSON() : null,
      usuarioCriacao: protocolo.usuarioCriacao != null && protocolo.usuarioCriacao.isValid() ? protocolo.usuarioCriacao.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dataSolicitacao = res.body.dataSolicitacao != null ? moment(res.body.dataSolicitacao) : null;
      res.body.dataEnvio = res.body.dataEnvio != null ? moment(res.body.dataEnvio) : null;
      res.body.dataCriacao = res.body.dataCriacao != null ? moment(res.body.dataCriacao) : null;
      res.body.usuarioCriacao = res.body.usuarioCriacao != null ? moment(res.body.usuarioCriacao) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((protocolo: IProtocolo) => {
        protocolo.dataSolicitacao = protocolo.dataSolicitacao != null ? moment(protocolo.dataSolicitacao) : null;
        protocolo.dataEnvio = protocolo.dataEnvio != null ? moment(protocolo.dataEnvio) : null;
        protocolo.dataCriacao = protocolo.dataCriacao != null ? moment(protocolo.dataCriacao) : null;
        protocolo.usuarioCriacao = protocolo.usuarioCriacao != null ? moment(protocolo.usuarioCriacao) : null;
      });
    }
    return res;
  }
}
