import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterProtocoloSharedModule } from 'app/shared/shared.module';
import { SetorComponent } from './setor.component';
import { SetorDetailComponent } from './setor-detail.component';
import { SetorUpdateComponent } from './setor-update.component';
import { SetorDeleteDialogComponent } from './setor-delete-dialog.component';
import { setorRoute } from './setor.route';

@NgModule({
  imports: [JhipsterProtocoloSharedModule, RouterModule.forChild(setorRoute)],
  declarations: [SetorComponent, SetorDetailComponent, SetorUpdateComponent, SetorDeleteDialogComponent],
  entryComponents: [SetorDeleteDialogComponent]
})
export class JhipsterProtocoloSetorModule {}
