import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TipoProtocolo } from 'app/shared/model/tipo-protocolo.model';
import { TipoProtocoloService } from './tipo-protocolo.service';
import { TipoProtocoloComponent } from './tipo-protocolo.component';
import { TipoProtocoloDetailComponent } from './tipo-protocolo-detail.component';
import { TipoProtocoloUpdateComponent } from './tipo-protocolo-update.component';
import { ITipoProtocolo } from 'app/shared/model/tipo-protocolo.model';

@Injectable({ providedIn: 'root' })
export class TipoProtocoloResolve implements Resolve<ITipoProtocolo> {
  constructor(private service: TipoProtocoloService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITipoProtocolo> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((tipoProtocolo: HttpResponse<TipoProtocolo>) => tipoProtocolo.body));
    }
    return of(new TipoProtocolo());
  }
}

export const tipoProtocoloRoute: Routes = [
  {
    path: '',
    component: TipoProtocoloComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TipoProtocolos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TipoProtocoloDetailComponent,
    resolve: {
      tipoProtocolo: TipoProtocoloResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TipoProtocolos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TipoProtocoloUpdateComponent,
    resolve: {
      tipoProtocolo: TipoProtocoloResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TipoProtocolos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TipoProtocoloUpdateComponent,
    resolve: {
      tipoProtocolo: TipoProtocoloResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TipoProtocolos'
    },
    canActivate: [UserRouteAccessService]
  }
];
