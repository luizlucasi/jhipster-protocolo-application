import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterProtocoloTestModule } from '../../../test.module';
import { TipoProtocoloComponent } from 'app/entities/tipo-protocolo/tipo-protocolo.component';
import { TipoProtocoloService } from 'app/entities/tipo-protocolo/tipo-protocolo.service';
import { TipoProtocolo } from 'app/shared/model/tipo-protocolo.model';

describe('Component Tests', () => {
  describe('TipoProtocolo Management Component', () => {
    let comp: TipoProtocoloComponent;
    let fixture: ComponentFixture<TipoProtocoloComponent>;
    let service: TipoProtocoloService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterProtocoloTestModule],
        declarations: [TipoProtocoloComponent],
        providers: []
      })
        .overrideTemplate(TipoProtocoloComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoProtocoloComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoProtocoloService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TipoProtocolo(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tipoProtocolos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
