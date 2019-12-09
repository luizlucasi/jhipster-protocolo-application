import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterProtocoloTestModule } from '../../../test.module';
import { NumeracaoDetailComponent } from 'app/entities/numeracao/numeracao-detail.component';
import { Numeracao } from 'app/shared/model/numeracao.model';

describe('Component Tests', () => {
  describe('Numeracao Management Detail Component', () => {
    let comp: NumeracaoDetailComponent;
    let fixture: ComponentFixture<NumeracaoDetailComponent>;
    const route = ({ data: of({ numeracao: new Numeracao(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterProtocoloTestModule],
        declarations: [NumeracaoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(NumeracaoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NumeracaoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.numeracao).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
