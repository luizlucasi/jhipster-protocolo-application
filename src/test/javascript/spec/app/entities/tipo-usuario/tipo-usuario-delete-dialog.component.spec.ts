import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterProtocoloTestModule } from '../../../test.module';
import { TipoUsuarioDeleteDialogComponent } from 'app/entities/tipo-usuario/tipo-usuario-delete-dialog.component';
import { TipoUsuarioService } from 'app/entities/tipo-usuario/tipo-usuario.service';

describe('Component Tests', () => {
  describe('TipoUsuario Management Delete Component', () => {
    let comp: TipoUsuarioDeleteDialogComponent;
    let fixture: ComponentFixture<TipoUsuarioDeleteDialogComponent>;
    let service: TipoUsuarioService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterProtocoloTestModule],
        declarations: [TipoUsuarioDeleteDialogComponent]
      })
        .overrideTemplate(TipoUsuarioDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipoUsuarioDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoUsuarioService);
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
