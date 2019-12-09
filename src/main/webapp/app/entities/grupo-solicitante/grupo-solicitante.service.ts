import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IGrupoSolicitante } from 'app/shared/model/grupo-solicitante.model';

type EntityResponseType = HttpResponse<IGrupoSolicitante>;
type EntityArrayResponseType = HttpResponse<IGrupoSolicitante[]>;

@Injectable({ providedIn: 'root' })
export class GrupoSolicitanteService {
  public resourceUrl = SERVER_API_URL + 'api/grupo-solicitantes';

  constructor(protected http: HttpClient) {}

  create(grupoSolicitante: IGrupoSolicitante): Observable<EntityResponseType> {
    return this.http.post<IGrupoSolicitante>(this.resourceUrl, grupoSolicitante, { observe: 'response' });
  }

  update(grupoSolicitante: IGrupoSolicitante): Observable<EntityResponseType> {
    return this.http.put<IGrupoSolicitante>(this.resourceUrl, grupoSolicitante, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IGrupoSolicitante>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGrupoSolicitante[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
