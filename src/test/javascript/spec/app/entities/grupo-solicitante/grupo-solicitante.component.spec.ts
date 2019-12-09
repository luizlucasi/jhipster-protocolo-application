import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterProtocoloTestModule } from '../../../test.module';
import { GrupoSolicitanteComponent } from 'app/entities/grupo-solicitante/grupo-solicitante.component';
import { GrupoSolicitanteService } from 'app/entities/grupo-solicitante/grupo-solicitante.service';
import { GrupoSolicitante } from 'app/shared/model/grupo-solicitante.model';

describe('Component Tests', () => {
  describe('GrupoSolicitante Management Component', () => {
    let comp: GrupoSolicitanteComponent;
    let fixture: ComponentFixture<GrupoSolicitanteComponent>;
    let service: GrupoSolicitanteService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterProtocoloTestModule],
        declarations: [GrupoSolicitanteComponent],
        providers: []
      })
        .overrideTemplate(GrupoSolicitanteComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GrupoSolicitanteComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GrupoSolicitanteService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new GrupoSolicitante(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.grupoSolicitantes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
