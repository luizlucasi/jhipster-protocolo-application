import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterProtocoloTestModule } from '../../../test.module';
import { VersaoDetailComponent } from 'app/entities/versao/versao-detail.component';
import { Versao } from 'app/shared/model/versao.model';

describe('Component Tests', () => {
  describe('Versao Management Detail Component', () => {
    let comp: VersaoDetailComponent;
    let fixture: ComponentFixture<VersaoDetailComponent>;
    const route = ({ data: of({ versao: new Versao(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterProtocoloTestModule],
        declarations: [VersaoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(VersaoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(VersaoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.versao).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
