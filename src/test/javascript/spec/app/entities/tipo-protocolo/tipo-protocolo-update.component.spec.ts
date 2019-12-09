import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterProtocoloTestModule } from '../../../test.module';
import { TipoProtocoloUpdateComponent } from 'app/entities/tipo-protocolo/tipo-protocolo-update.component';
import { TipoProtocoloService } from 'app/entities/tipo-protocolo/tipo-protocolo.service';
import { TipoProtocolo } from 'app/shared/model/tipo-protocolo.model';

describe('Component Tests', () => {
  describe('TipoProtocolo Management Update Component', () => {
    let comp: TipoProtocoloUpdateComponent;
    let fixture: ComponentFixture<TipoProtocoloUpdateComponent>;
    let service: TipoProtocoloService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterProtocoloTestModule],
        declarations: [TipoProtocoloUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TipoProtocoloUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoProtocoloUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoProtocoloService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TipoProtocolo(123);
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
        const entity = new TipoProtocolo();
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
