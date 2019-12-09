import { IUsuario } from 'app/shared/model/usuario.model';

export interface ITipoUsuario {
  id?: number;
  descricao?: string;
  usuarios?: IUsuario[];
}

export class TipoUsuario implements ITipoUsuario {
  constructor(public id?: number, public descricao?: string, public usuarios?: IUsuario[]) {}
}
