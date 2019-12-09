import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Versao } from 'app/shared/model/versao.model';
import { VersaoService } from './versao.service';
import { VersaoComponent } from './versao.component';
import { VersaoDetailComponent } from './versao-detail.component';
import { VersaoUpdateComponent } from './versao-update.component';
import { IVersao } from 'app/shared/model/versao.model';

@Injectable({ providedIn: 'root' })
export class VersaoResolve implements Resolve<IVersao> {
  constructor(private service: VersaoService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IVersao> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((versao: HttpResponse<Versao>) => versao.body));
    }
    return of(new Versao());
  }
}

export const versaoRoute: Routes = [
  {
    path: '',
    component: VersaoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Versaos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: VersaoDetailComponent,
    resolve: {
      versao: VersaoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Versaos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: VersaoUpdateComponent,
    resolve: {
      versao: VersaoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Versaos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: VersaoUpdateComponent,
    resolve: {
      versao: VersaoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Versaos'
    },
    canActivate: [UserRouteAccessService]
  }
];
