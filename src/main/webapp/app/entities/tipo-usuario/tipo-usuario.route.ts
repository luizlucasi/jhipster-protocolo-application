import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TipoUsuario } from 'app/shared/model/tipo-usuario.model';
import { TipoUsuarioService } from './tipo-usuario.service';
import { TipoUsuarioComponent } from './tipo-usuario.component';
import { TipoUsuarioDetailComponent } from './tipo-usuario-detail.component';
import { TipoUsuarioUpdateComponent } from './tipo-usuario-update.component';
import { ITipoUsuario } from 'app/shared/model/tipo-usuario.model';

@Injectable({ providedIn: 'root' })
export class TipoUsuarioResolve implements Resolve<ITipoUsuario> {
  constructor(private service: TipoUsuarioService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITipoUsuario> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((tipoUsuario: HttpResponse<TipoUsuario>) => tipoUsuario.body));
    }
    return of(new TipoUsuario());
  }
}

export const tipoUsuarioRoute: Routes = [
  {
    path: '',
    component: TipoUsuarioComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TipoUsuarios'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TipoUsuarioDetailComponent,
    resolve: {
      tipoUsuario: TipoUsuarioResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TipoUsuarios'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TipoUsuarioUpdateComponent,
    resolve: {
      tipoUsuario: TipoUsuarioResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TipoUsuarios'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TipoUsuarioUpdateComponent,
    resolve: {
      tipoUsuario: TipoUsuarioResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TipoUsuarios'
    },
    canActivate: [UserRouteAccessService]
  }
];
