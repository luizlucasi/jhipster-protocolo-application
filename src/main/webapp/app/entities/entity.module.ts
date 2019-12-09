import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'categoria',
        loadChildren: () => import('./categoria/categoria.module').then(m => m.JhipsterProtocoloCategoriaModule)
      },
      {
        path: 'documento',
        loadChildren: () => import('./documento/documento.module').then(m => m.JhipsterProtocoloDocumentoModule)
      },
      {
        path: 'grupo-solicitante',
        loadChildren: () => import('./grupo-solicitante/grupo-solicitante.module').then(m => m.JhipsterProtocoloGrupoSolicitanteModule)
      },
      {
        path: 'numeracao',
        loadChildren: () => import('./numeracao/numeracao.module').then(m => m.JhipsterProtocoloNumeracaoModule)
      },
      {
        path: 'setor',
        loadChildren: () => import('./setor/setor.module').then(m => m.JhipsterProtocoloSetorModule)
      },
      {
        path: 'tipo-protocolo',
        loadChildren: () => import('./tipo-protocolo/tipo-protocolo.module').then(m => m.JhipsterProtocoloTipoProtocoloModule)
      },
      {
        path: 'tipo-usuario',
        loadChildren: () => import('./tipo-usuario/tipo-usuario.module').then(m => m.JhipsterProtocoloTipoUsuarioModule)
      },
      {
        path: 'usuario',
        loadChildren: () => import('./usuario/usuario.module').then(m => m.JhipsterProtocoloUsuarioModule)
      },
      {
        path: 'versao',
        loadChildren: () => import('./versao/versao.module').then(m => m.JhipsterProtocoloVersaoModule)
      },
      {
        path: 'protocolo',
        loadChildren: () => import('./protocolo/protocolo.module').then(m => m.JhipsterProtocoloProtocoloModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class JhipsterProtocoloEntityModule {}
