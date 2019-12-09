import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterProtocoloSharedModule } from 'app/shared/shared.module';
import { ProtocoloComponent } from './protocolo.component';
import { ProtocoloDetailComponent } from './protocolo-detail.component';
import { ProtocoloUpdateComponent } from './protocolo-update.component';
import { ProtocoloDeleteDialogComponent } from './protocolo-delete-dialog.component';
import { protocoloRoute } from './protocolo.route';

@NgModule({
  imports: [JhipsterProtocoloSharedModule, RouterModule.forChild(protocoloRoute)],
  declarations: [ProtocoloComponent, ProtocoloDetailComponent, ProtocoloUpdateComponent, ProtocoloDeleteDialogComponent],
  entryComponents: [ProtocoloDeleteDialogComponent]
})
export class JhipsterProtocoloProtocoloModule {}
