import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ProtocoloService } from 'app/entities/protocolo/protocolo.service';
import { IProtocolo, Protocolo } from 'app/shared/model/protocolo.model';

describe('Service Tests', () => {
  describe('Protocolo Service', () => {
    let injector: TestBed;
    let service: ProtocoloService;
    let httpMock: HttpTestingController;
    let elemDefault: IProtocolo;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(ProtocoloService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Protocolo(
        0,
        'AAAAAAA',
        currentDate,
        currentDate,
        'AAAAAAA',
        currentDate,
        currentDate,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA'
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dataSolicitacao: currentDate.format(DATE_TIME_FORMAT),
            dataEnvio: currentDate.format(DATE_TIME_FORMAT),
            dataCriacao: currentDate.format(DATE_TIME_FORMAT),
            usuarioCriacao: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a Protocolo', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dataSolicitacao: currentDate.format(DATE_TIME_FORMAT),
            dataEnvio: currentDate.format(DATE_TIME_FORMAT),
            dataCriacao: currentDate.format(DATE_TIME_FORMAT),
            usuarioCriacao: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dataSolicitacao: currentDate,
            dataEnvio: currentDate,
            dataCriacao: currentDate,
            usuarioCriacao: currentDate
          },
          returnedFromService
        );
        service
          .create(new Protocolo(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Protocolo', () => {
        const returnedFromService = Object.assign(
          {
            solicitante: 'BBBBBB',
            dataSolicitacao: currentDate.format(DATE_TIME_FORMAT),
            dataEnvio: currentDate.format(DATE_TIME_FORMAT),
            enviadoPor: 'BBBBBB',
            dataCriacao: currentDate.format(DATE_TIME_FORMAT),
            usuarioCriacao: currentDate.format(DATE_TIME_FORMAT),
            localizacao: 'BBBBBB',
            observacao: 'BBBBBB',
            nomenclatura: 'BBBBBB',
            formato: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataSolicitacao: currentDate,
            dataEnvio: currentDate,
            dataCriacao: currentDate,
            usuarioCriacao: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of Protocolo', () => {
        const returnedFromService = Object.assign(
          {
            solicitante: 'BBBBBB',
            dataSolicitacao: currentDate.format(DATE_TIME_FORMAT),
            dataEnvio: currentDate.format(DATE_TIME_FORMAT),
            enviadoPor: 'BBBBBB',
            dataCriacao: currentDate.format(DATE_TIME_FORMAT),
            usuarioCriacao: currentDate.format(DATE_TIME_FORMAT),
            localizacao: 'BBBBBB',
            observacao: 'BBBBBB',
            nomenclatura: 'BBBBBB',
            formato: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dataSolicitacao: currentDate,
            dataEnvio: currentDate,
            dataCriacao: currentDate,
            usuarioCriacao: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Protocolo', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
