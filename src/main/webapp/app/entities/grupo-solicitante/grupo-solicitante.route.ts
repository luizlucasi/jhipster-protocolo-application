import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { GrupoSolicitante } from 'app/shared/model/grupo-solicitante.model';
import { GrupoSolicitanteService } from './grupo-solicitante.service';
import { GrupoSolicitanteComponent } from './grupo-solicitante.component';
import { GrupoSolicitanteDetailComponent } from './grupo-solicitante-detail.component';
import { GrupoSolicitanteUpdateComponent } from './grupo-solicitante-update.component';
import { IGrupoSolicitante } from 'app/shared/model/grupo-solicitante.model';

@Injectable({ providedIn: 'root' })
export class GrupoSolicitanteResolve implements Resolve<IGrupoSolicitante> {
  constructor(private service: GrupoSolicitanteService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IGrupoSolicitante> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((grupoSolicitante: HttpResponse<GrupoSolicitante>) => grupoSolicitante.body));
    }
    return of(new GrupoSolicitante());
  }
}

export const grupoSolicitanteRoute: Routes = [
  {
    path: '',
    component: GrupoSolicitanteComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'GrupoSolicitantes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: GrupoSolicitanteDetailComponent,
    resolve: {
      grupoSolicitante: GrupoSolicitanteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'GrupoSolicitantes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: GrupoSolicitanteUpdateComponent,
    resolve: {
      grupoSolicitante: GrupoSolicitanteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'GrupoSolicitantes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: GrupoSolicitanteUpdateComponent,
    resolve: {
      grupoSolicitante: GrupoSolicitanteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'GrupoSolicitantes'
    },
    canActivate: [UserRouteAccessService]
  }
];
