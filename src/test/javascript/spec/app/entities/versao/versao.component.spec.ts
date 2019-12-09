import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterProtocoloTestModule } from '../../../test.module';
import { VersaoComponent } from 'app/entities/versao/versao.component';
import { VersaoService } from 'app/entities/versao/versao.service';
import { Versao } from 'app/shared/model/versao.model';

describe('Component Tests', () => {
  describe('Versao Management Component', () => {
    let comp: VersaoComponent;
    let fixture: ComponentFixture<VersaoComponent>;
    let service: VersaoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterProtocoloTestModule],
        declarations: [VersaoComponent],
        providers: []
      })
        .overrideTemplate(VersaoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(VersaoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(VersaoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Versao(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.versaos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
