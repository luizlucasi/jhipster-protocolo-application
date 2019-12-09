import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterProtocoloTestModule } from '../../../test.module';
import { TipoUsuarioComponent } from 'app/entities/tipo-usuario/tipo-usuario.component';
import { TipoUsuarioService } from 'app/entities/tipo-usuario/tipo-usuario.service';
import { TipoUsuario } from 'app/shared/model/tipo-usuario.model';

describe('Component Tests', () => {
  describe('TipoUsuario Management Component', () => {
    let comp: TipoUsuarioComponent;
    let fixture: ComponentFixture<TipoUsuarioComponent>;
    let service: TipoUsuarioService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterProtocoloTestModule],
        declarations: [TipoUsuarioComponent],
        providers: []
      })
        .overrideTemplate(TipoUsuarioComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoUsuarioComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoUsuarioService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TipoUsuario(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tipoUsuarios[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
