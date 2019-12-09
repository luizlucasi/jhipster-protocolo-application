import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterProtocoloTestModule } from '../../../test.module';
import { NumeracaoComponent } from 'app/entities/numeracao/numeracao.component';
import { NumeracaoService } from 'app/entities/numeracao/numeracao.service';
import { Numeracao } from 'app/shared/model/numeracao.model';

describe('Component Tests', () => {
  describe('Numeracao Management Component', () => {
    let comp: NumeracaoComponent;
    let fixture: ComponentFixture<NumeracaoComponent>;
    let service: NumeracaoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterProtocoloTestModule],
        declarations: [NumeracaoComponent],
        providers: []
      })
        .overrideTemplate(NumeracaoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NumeracaoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NumeracaoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Numeracao(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.numeracaos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
