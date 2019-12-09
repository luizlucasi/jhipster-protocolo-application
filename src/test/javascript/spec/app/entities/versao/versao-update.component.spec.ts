import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterProtocoloTestModule } from '../../../test.module';
import { VersaoUpdateComponent } from 'app/entities/versao/versao-update.component';
import { VersaoService } from 'app/entities/versao/versao.service';
import { Versao } from 'app/shared/model/versao.model';

describe('Component Tests', () => {
  describe('Versao Management Update Component', () => {
    let comp: VersaoUpdateComponent;
    let fixture: ComponentFixture<VersaoUpdateComponent>;
    let service: VersaoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterProtocoloTestModule],
        declarations: [VersaoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(VersaoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(VersaoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(VersaoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Versao(123);
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
        const entity = new Versao();
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
