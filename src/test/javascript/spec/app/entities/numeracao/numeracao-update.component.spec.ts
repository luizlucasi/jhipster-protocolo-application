import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterProtocoloTestModule } from '../../../test.module';
import { NumeracaoUpdateComponent } from 'app/entities/numeracao/numeracao-update.component';
import { NumeracaoService } from 'app/entities/numeracao/numeracao.service';
import { Numeracao } from 'app/shared/model/numeracao.model';

describe('Component Tests', () => {
  describe('Numeracao Management Update Component', () => {
    let comp: NumeracaoUpdateComponent;
    let fixture: ComponentFixture<NumeracaoUpdateComponent>;
    let service: NumeracaoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterProtocoloTestModule],
        declarations: [NumeracaoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(NumeracaoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NumeracaoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NumeracaoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Numeracao(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Numeracao();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
