import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterProtocoloSharedModule } from 'app/shared/shared.module';
import { VersaoComponent } from './versao.component';
import { VersaoDetailComponent } from './versao-detail.component';
import { VersaoUpdateComponent } from './versao-update.component';
import { VersaoDeleteDialogComponent } from './versao-delete-dialog.component';
import { versaoRoute } from './versao.route';

@NgModule({
  imports: [JhipsterProtocoloSharedModule, RouterModule.forChild(versaoRoute)],
  declarations: [VersaoComponent, VersaoDetailComponent, VersaoUpdateComponent, VersaoDeleteDialogComponent],
  entryComponents: [VersaoDeleteDialogComponent]
})
export class JhipsterProtocoloVersaoModule {}
