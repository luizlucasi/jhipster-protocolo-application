import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterProtocoloTestModule } from '../../../test.module';
import { GrupoSolicitanteDeleteDialogComponent } from 'app/entities/grupo-solicitante/grupo-solicitante-delete-dialog.component';
import { GrupoSolicitanteService } from 'app/entities/grupo-solicitante/grupo-solicitante.service';

describe('Component Tests', () => {
  describe('GrupoSolicitante Management Delete Component', () => {
    let comp: GrupoSolicitanteDeleteDialogComponent;
    let fixture: ComponentFixture<GrupoSolicitanteDeleteDialogComponent>;
    let service: GrupoSolicitanteService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterProtocoloTestModule],
        declarations: [GrupoSolicitanteDeleteDialogComponent]
      })
        .overrideTemplate(GrupoSolicitanteDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(GrupoSolicitanteDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GrupoSolicitanteService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
