import { IProtocolo } from 'app/shared/model/protocolo.model';

export interface ISetor {
  id?: number;
  nomeSetor?: string;
  codigoSetor?: string;
  isActive?: boolean;
  protocolos?: IProtocolo[];
}

export class Setor implements ISetor {
  constructor(
    public id?: number,
    public nomeSetor?: string,
    public codigoSetor?: string,
    public isActive?: boolean,
    public protocolos?: IProtocolo[]
  ) {
    this.isActive = this.isActive || false;
  }
}
