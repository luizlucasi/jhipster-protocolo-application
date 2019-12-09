import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Numeracao } from 'app/shared/model/numeracao.model';
import { NumeracaoService } from './numeracao.service';
import { NumeracaoComponent } from './numeracao.component';
import { NumeracaoDetailComponent } from './numeracao-detail.component';
import { NumeracaoUpdateComponent } from './numeracao-update.component';
import { INumeracao } from 'app/shared/model/numeracao.model';

@Injectable({ providedIn: 'root' })
export class NumeracaoResolve implements Resolve<INumeracao> {
  constructor(private service: NumeracaoService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INumeracao> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((numeracao: HttpResponse<Numeracao>) => numeracao.body));
    }
    return of(new Numeracao());
  }
}

export const numeracaoRoute: Routes = [
  {
    path: '',
    component: NumeracaoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Numeracaos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: NumeracaoDetailComponent,
    resolve: {
      numeracao: NumeracaoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Numeracaos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: NumeracaoUpdateComponent,
    resolve: {
      numeracao: NumeracaoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Numeracaos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: NumeracaoUpdateComponent,
    resolve: {
      numeracao: NumeracaoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Numeracaos'
    },
    canActivate: [UserRouteAccessService]
  }
];
