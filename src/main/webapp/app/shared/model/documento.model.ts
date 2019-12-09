import { IProtocolo } from 'app/shared/model/protocolo.model';

export interface IDocumento {
  id?: number;
  nomeDocumento?: string;
  codDocumento?: string;
  isActive?: boolean;
  protocolos?: IProtocolo[];
}

export class Documento implements IDocumento {
  constructor(
    public id?: number,
    public nomeDocumento?: string,
    public codDocumento?: string,
    public isActive?: boolean,
    public protocolos?: IProtocolo[]
  ) {
    this.isActive = this.isActive || false;
  }
}
