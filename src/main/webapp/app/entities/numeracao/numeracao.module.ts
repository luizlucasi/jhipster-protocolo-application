import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterProtocoloSharedModule } from 'app/shared/shared.module';
import { NumeracaoComponent } from './numeracao.component';
import { NumeracaoDetailComponent } from './numeracao-detail.component';
import { NumeracaoUpdateComponent } from './numeracao-update.component';
import { NumeracaoDeleteDialogComponent } from './numeracao-delete-dialog.component';
import { numeracaoRoute } from './numeracao.route';

@NgModule({
  imports: [JhipsterProtocoloSharedModule, RouterModule.forChild(numeracaoRoute)],
  declarations: [NumeracaoComponent, NumeracaoDetailComponent, NumeracaoUpdateComponent, NumeracaoDeleteDialogComponent],
  entryComponents: [NumeracaoDeleteDialogComponent]
})
export class JhipsterProtocoloNumeracaoModule {}
