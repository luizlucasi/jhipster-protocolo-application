import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterProtocoloTestModule } from '../../../test.module';
import { GrupoSolicitanteUpdateComponent } from 'app/entities/grupo-solicitante/grupo-solicitante-update.component';
import { GrupoSolicitanteService } from 'app/entities/grupo-solicitante/grupo-solicitante.service';
import { GrupoSolicitante } from 'app/shared/model/grupo-solicitante.model';

describe('Component Tests', () => {
  describe('GrupoSolicitante Management Update Component', () => {
    let comp: GrupoSolicitanteUpdateComponent;
    let fixture: ComponentFixture<GrupoSolicitanteUpdateComponent>;
    let service: GrupoSolicitanteService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterProtocoloTestModule],
        declarations: [GrupoSolicitanteUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(GrupoSolicitanteUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GrupoSolicitanteUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GrupoSolicitanteService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new GrupoSolicitante(123);
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
        const entity = new GrupoSolicitante();
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
