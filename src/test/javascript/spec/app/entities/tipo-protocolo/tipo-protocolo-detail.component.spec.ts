import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterProtocoloTestModule } from '../../../test.module';
import { TipoProtocoloDetailComponent } from 'app/entities/tipo-protocolo/tipo-protocolo-detail.component';
import { TipoProtocolo } from 'app/shared/model/tipo-protocolo.model';

describe('Component Tests', () => {
  describe('TipoProtocolo Management Detail Component', () => {
    let comp: TipoProtocoloDetailComponent;
    let fixture: ComponentFixture<TipoProtocoloDetailComponent>;
    const route = ({ data: of({ tipoProtocolo: new TipoProtocolo(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterProtocoloTestModule],
        declarations: [TipoProtocoloDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TipoProtocoloDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipoProtocoloDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tipoProtocolo).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
