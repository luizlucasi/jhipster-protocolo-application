export interface IGrupoSolicitante {
  id?: number;
  nomeGrupoSolicitante?: string;
}

export class GrupoSolicitante implements IGrupoSolicitante {
  constructor(public id?: number, public nomeGrupoSolicitante?: string) {}
}
