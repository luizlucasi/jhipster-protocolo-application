import { IProtocolo } from 'app/shared/model/protocolo.model';

export interface IVersao {
  id?: number;
  numeroVersao?: string;
  protocolos?: IProtocolo[];
}

export class Versao implements IVersao {
  constructor(public id?: number, public numeroVersao?: string, public protocolos?: IProtocolo[]) {}
}
