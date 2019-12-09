import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { JhipsterProtocoloSharedModule } from 'app/shared/shared.module';
import { JhipsterProtocoloCoreModule } from 'app/core/core.module';
import { JhipsterProtocoloAppRoutingModule } from './app-routing.module';
import { JhipsterProtocoloHomeModule } from './home/home.module';
import { JhipsterProtocoloEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    JhipsterProtocoloSharedModule,
    JhipsterProtocoloCoreModule,
    JhipsterProtocoloHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    JhipsterProtocoloEntityModule,
    JhipsterProtocoloAppRoutingModule
  ],
  declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [JhiMainComponent]
})
export class JhipsterProtocoloAppModule {}
