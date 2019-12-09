import { ITipoUsuario } from 'app/shared/model/tipo-usuario.model';

export interface IUsuario {
  id?: number;
  nomeUsuario?: string;
  isActive?: boolean;
  tipoUsuario?: ITipoUsuario;
}

export class Usuario implements IUsuario {
  constructor(public id?: number, public nomeUsuario?: string, public isActive?: boolean, public tipoUsuario?: ITipoUsuario) {
    this.isActive = this.isActive || false;
  }
}
