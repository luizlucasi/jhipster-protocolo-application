import { Moment } from 'moment';
import { IVersao } from 'app/shared/model/versao.model';
import { IDocumento } from 'app/shared/model/documento.model';
import { ITipoProtocolo } from 'app/shared/model/tipo-protocolo.model';
import { ISetor } from 'app/shared/model/setor.model';
import { ICategoria } from 'app/shared/model/categoria.model';
import { INumeracao } from 'app/shared/model/numeracao.model';

export interface IProtocolo {
  id?: number;
  solicitante?: string;
  dataSolicitacao?: Moment;
  dataEnvio?: Moment;
  enviadoPor?: string;
  dataCriacao?: Moment;
  usuarioCriacao?: Moment;
  localizacao?: string;
  observacao?: string;
  nomenclatura?: string;
  formato?: string;
  versao?: IVersao;
  documento?: IDocumento;
  tipoProtocolo?: ITipoProtocolo;
  setor?: ISetor;
  categoria?: ICategoria;
  numeracao?: INumeracao;
}

export class Protocolo implements IProtocolo {
  constructor(
    public id?: number,
    public solicitante?: string,
    public dataSolicitacao?: Moment,
    public dataEnvio?: Moment,
    public enviadoPor?: string,
    public dataCriacao?: Moment,
    public usuarioCriacao?: Moment,
    public localizacao?: string,
    public observacao?: string,
    public nomenclatura?: string,
    public formato?: string,
    public versao?: IVersao,
    public documento?: IDocumento,
    public tipoProtocolo?: ITipoProtocolo,
    public setor?: ISetor,
    public categoria?: ICategoria,
    public numeracao?: INumeracao
  ) {}
}
