import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterProtocoloTestModule } from '../../../test.module';
import { GrupoSolicitanteDetailComponent } from 'app/entities/grupo-solicitante/grupo-solicitante-detail.component';
import { GrupoSolicitante } from 'app/shared/model/grupo-solicitante.model';

describe('Component Tests', () => {
  describe('GrupoSolicitante Management Detail Component', () => {
    let comp: GrupoSolicitanteDetailComponent;
    let fixture: ComponentFixture<GrupoSolicitanteDetailComponent>;
    const route = ({ data: of({ grupoSolicitante: new GrupoSolicitante(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterProtocoloTestModule],
        declarations: [GrupoSolicitanteDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(GrupoSolicitanteDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(GrupoSolicitanteDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.grupoSolicitante).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
