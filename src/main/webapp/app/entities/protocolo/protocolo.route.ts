import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Protocolo } from 'app/shared/model/protocolo.model';
import { ProtocoloService } from './protocolo.service';
import { ProtocoloComponent } from './protocolo.component';
import { ProtocoloDetailComponent } from './protocolo-detail.component';
import { ProtocoloUpdateComponent } from './protocolo-update.component';
import { IProtocolo } from 'app/shared/model/protocolo.model';

@Injectable({ providedIn: 'root' })
export class ProtocoloResolve implements Resolve<IProtocolo> {
  constructor(private service: ProtocoloService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProtocolo> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((protocolo: HttpResponse<Protocolo>) => protocolo.body));
    }
    return of(new Protocolo());
  }
}

export const protocoloRoute: Routes = [
  {
    path: '',
    component: ProtocoloComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Protocolos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ProtocoloDetailComponent,
    resolve: {
      protocolo: ProtocoloResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Protocolos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ProtocoloUpdateComponent,
    resolve: {
      protocolo: ProtocoloResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Protocolos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ProtocoloUpdateComponent,
    resolve: {
      protocolo: ProtocoloResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Protocolos'
    },
    canActivate: [UserRouteAccessService]
  }
];
