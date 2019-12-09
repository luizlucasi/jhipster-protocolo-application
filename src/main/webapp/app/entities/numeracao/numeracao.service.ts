import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { INumeracao } from 'app/shared/model/numeracao.model';

type EntityResponseType = HttpResponse<INumeracao>;
type EntityArrayResponseType = HttpResponse<INumeracao[]>;

@Injectable({ providedIn: 'root' })
export class NumeracaoService {
  public resourceUrl = SERVER_API_URL + 'api/numeracaos';

  constructor(protected http: HttpClient) {}

  create(numeracao: INumeracao): Observable<EntityResponseType> {
    return this.http.post<INumeracao>(this.resourceUrl, numeracao, { observe: 'response' });
  }

  update(numeracao: INumeracao): Observable<EntityResponseType> {
    return this.http.put<INumeracao>(this.resourceUrl, numeracao, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<INumeracao>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INumeracao[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
