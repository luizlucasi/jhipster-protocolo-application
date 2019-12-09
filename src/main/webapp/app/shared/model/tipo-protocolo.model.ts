import { IProtocolo } from 'app/shared/model/protocolo.model';

export interface ITipoProtocolo {
  id?: number;
  nomeProtocolo?: string;
  codProtocolo?: string;
  isActive?: boolean;
  protocolos?: IProtocolo[];
}

export class TipoProtocolo implements ITipoProtocolo {
  constructor(
    public id?: number,
    public nomeProtocolo?: string,
    public codProtocolo?: string,
    public isActive?: boolean,
    public protocolos?: IProtocolo[]
  ) {
    this.isActive = this.isActive || false;
  }
}
