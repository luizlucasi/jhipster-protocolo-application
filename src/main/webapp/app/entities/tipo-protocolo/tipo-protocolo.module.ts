import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterProtocoloSharedModule } from 'app/shared/shared.module';
import { TipoProtocoloComponent } from './tipo-protocolo.component';
import { TipoProtocoloDetailComponent } from './tipo-protocolo-detail.component';
import { TipoProtocoloUpdateComponent } from './tipo-protocolo-update.component';
import { TipoProtocoloDeleteDialogComponent } from './tipo-protocolo-delete-dialog.component';
import { tipoProtocoloRoute } from './tipo-protocolo.route';

@NgModule({
  imports: [JhipsterProtocoloSharedModule, RouterModule.forChild(tipoProtocoloRoute)],
  declarations: [TipoProtocoloComponent, TipoProtocoloDetailComponent, TipoProtocoloUpdateComponent, TipoProtocoloDeleteDialogComponent],
  entryComponents: [TipoProtocoloDeleteDialogComponent]
})
export class JhipsterProtocoloTipoProtocoloModule {}
