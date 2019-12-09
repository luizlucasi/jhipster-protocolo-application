import { IProtocolo } from 'app/shared/model/protocolo.model';

export interface INumeracao {
  id?: number;
  numero?: number;
  ano?: number;
  protocolos?: IProtocolo[];
}

export class Numeracao implements INumeracao {
  constructor(public id?: number, public numero?: number, public ano?: number, public protocolos?: IProtocolo[]) {}
}
