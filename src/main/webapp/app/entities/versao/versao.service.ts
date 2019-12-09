import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IVersao } from 'app/shared/model/versao.model';

type EntityResponseType = HttpResponse<IVersao>;
type EntityArrayResponseType = HttpResponse<IVersao[]>;

@Injectable({ providedIn: 'root' })
export class VersaoService {
  public resourceUrl = SERVER_API_URL + 'api/versaos';

  constructor(protected http: HttpClient) {}

  create(versao: IVersao): Observable<EntityResponseType> {
    return this.http.post<IVersao>(this.resourceUrl, versao, { observe: 'response' });
  }

  update(versao: IVersao): Observable<EntityResponseType> {
    return this.http.put<IVersao>(this.resourceUrl, versao, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IVersao>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IVersao[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
