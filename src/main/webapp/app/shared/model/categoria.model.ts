import { IProtocolo } from 'app/shared/model/protocolo.model';

export interface ICategoria {
  id?: number;
  nomeCategoria?: string;
  codCategoria?: string;
  isActive?: boolean;
  protocolos?: IProtocolo[];
}

export class Categoria implements ICategoria {
  constructor(
    public id?: number,
    public nomeCategoria?: string,
    public codCategoria?: string,
    public isActive?: boolean,
    public protocolos?: IProtocolo[]
  ) {
    this.isActive = this.isActive || false;
  }
}
