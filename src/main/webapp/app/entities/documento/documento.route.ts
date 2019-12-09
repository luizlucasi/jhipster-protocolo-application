import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Documento } from 'app/shared/model/documento.model';
import { DocumentoService } from './documento.service';
import { DocumentoComponent } from './documento.component';
import { DocumentoDetailComponent } from './documento-detail.component';
import { DocumentoUpdateComponent } from './documento-update.component';
import { IDocumento } from 'app/shared/model/documento.model';

@Injectable({ providedIn: 'root' })
export class DocumentoResolve implements Resolve<IDocumento> {
  constructor(private service: DocumentoService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDocumento> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((documento: HttpResponse<Documento>) => documento.body));
    }
    return of(new Documento());
  }
}

export const documentoRoute: Routes = [
  {
    path: '',
    component: DocumentoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Documentos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DocumentoDetailComponent,
    resolve: {
      documento: DocumentoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Documentos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DocumentoUpdateComponent,
    resolve: {
      documento: DocumentoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Documentos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DocumentoUpdateComponent,
    resolve: {
      documento: DocumentoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Documentos'
    },
    canActivate: [UserRouteAccessService]
  }
];
