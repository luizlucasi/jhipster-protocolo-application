import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterProtocoloSharedModule } from 'app/shared/shared.module';
import { GrupoSolicitanteComponent } from './grupo-solicitante.component';
import { GrupoSolicitanteDetailComponent } from './grupo-solicitante-detail.component';
import { GrupoSolicitanteUpdateComponent } from './grupo-solicitante-update.component';
import { GrupoSolicitanteDeleteDialogComponent } from './grupo-solicitante-delete-dialog.component';
import { grupoSolicitanteRoute } from './grupo-solicitante.route';

@NgModule({
  imports: [JhipsterProtocoloSharedModule, RouterModule.forChild(grupoSolicitanteRoute)],
  declarations: [
    GrupoSolicitanteComponent,
    GrupoSolicitanteDetailComponent,
    GrupoSolicitanteUpdateComponent,
    GrupoSolicitanteDeleteDialogComponent
  ],
  entryComponents: [GrupoSolicitanteDeleteDialogComponent]
})
export class JhipsterProtocoloGrupoSolicitanteModule {}
