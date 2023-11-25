//Importacion que permite definir las rutas de la app
import { NgModule } from '@angular/core';
//Importamos el archivo que viene en la ruta sig.
import { RouterModule, Routes } from '@angular/router';
//List Component
import { PaisListComponent } from './componentes/Repertorio/pais/pais-list/pais-list.component';
import { InstrumentoListComponent } from './componentes/Repertorio/instrumento/instrumento-list/instrumento-list.component';
import { GruposListComponent } from './componentes/Repertorio/grupo/grupos-list/grupos-list.component';
import { ArtistaListComponent } from './componentes/Repertorio/artista/artista-list/artista-list.component';
import { ArtistaGrupoListComponent } from './componentes/Repertorio/artista/artista-grupo-list/artista-grupo-list.component';
import { DisqueraListComponent } from './componentes/Repertorio/disquera/disquera-list/disquera-list.component';
import { AlbumListComponent } from './componentes/Repertorio/album/album-list/album-list.component';
import { CancionesListComponent } from './componentes/Repertorio/canciones/canciones-list/canciones-list.component';
import { CancionesAlbumListComponent } from './componentes/Repertorio/canciones/canciones-album-list/canciones-album-list.component';
import { InstrumetoArtistaListComponent } from './componentes/Repertorio/instrumento/instrumeto-artista-list/instrumeto-artista-list.component';

//Form Component
import { PaisFormComponent } from './componentes/Repertorio/pais/pais-form/pais-form.component';
import { InstrumentoFormComponent } from './componentes/Repertorio/instrumento/instrumento-form/instrumento-form.component';
import { GruposFormComponent } from './componentes/Repertorio/grupo/grupos-form/grupos-form.component';
import { ArtistaFormComponent } from './componentes/Repertorio/artista/artista-form/artista-form.component';
import { ArtistaGrupoFormComponent } from './componentes/Repertorio/artista/artista-grupo-form/artista-grupo-form.component';
import { DisqueraFormComponent } from './componentes/Repertorio/disquera/disquera-form/disquera-form.component';
import { AlbumFormComponent } from './componentes/Repertorio/album/album-form/album-form.component';
import { CancionesFormComponent } from './componentes/Repertorio/canciones/canciones-form/canciones-form.component';
import { CancionesAlbumFormComponent } from './componentes/Repertorio/canciones/canciones-album-form/canciones-album-form.component';
import { InstrumetoArtistaFormComponent } from './componentes/Repertorio/instrumento/instrumeto-artista-form/instrumeto-artista-form.component';

//Busqueda
import { BuscaCancionAlbumComponent } from './componentes/Repertorio/album/busca-cancion-album/busca-cancion-album.component';
import { BuscaAlbumGrupoComponent } from './componentes/Repertorio/grupo/busca-album-grupo/busca-album-grupo.component';
import { BuscaCancionGrupoComponent } from './componentes/Repertorio/grupo/busca-cancion-grupo/busca-cancion-grupo.component';
import { BuscaIntegrantesGrupoComponent } from './componentes/Repertorio/grupo/busca-integrantes-grupo/busca-integrantes-grupo.component';

import { LoginComponent } from './componentes/usuario/login/login.component';
import { RegisterComponent } from './componentes/usuario/register/register.component';
import { PrincipalComponent } from './componentes/Repertorio/principal/principal.component';
import { AuditoriaComponent } from './componentes/Repertorio/auditoria/auditoria.component';
import { UsuariosComponent } from './componentes/Repertorio/usuarios/usuarios.component';

const routes: Routes = [
  //Creacion de los Objetos
  /* GRUPOS */
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login', //Se creo la ruta para abrir un componente
    component: LoginComponent,
  },
  {
    path: 'register', //Se creo la ruta para abrir un componente
    component: RegisterComponent,
  },
  {
    path: 'repertorio',
    component: PrincipalComponent,
    children: [
      {
        path: '',
        redirectTo: 'grupo',
        pathMatch: 'full',
      },
      {
        path: 'grupo', //Se creo la ruta para abrir un componente
        component: GruposListComponent,
      },
      {
        path: 'grupo/agregar',
        component: GruposFormComponent,
      },
      {
        path: 'grupo/actualizar/:idGrupo',
        component: GruposFormComponent,
      },

      /* CANCIONES ALBUM */
      {
        path: 'canciones_Album', //Se creo la ruta para abrir un componente
        component: CancionesAlbumListComponent,
      },
      {
        path: 'canciones_Album/agregar',
        component: CancionesAlbumFormComponent,
      },
      {
        path: 'canciones_Album/actualizar/:Codigo',
        component: CancionesAlbumFormComponent,
      },

      /* CANCIONES */
      {
        path: 'canciones', //Se creo la ruta para abrir un componente
        component: CancionesListComponent,
      },
      {
        path: 'canciones/agregar',
        component: CancionesFormComponent,
      },
      {
        path: 'canciones/actualizar/:idCancion',
        component: CancionesFormComponent,
      },

      /* ALBUM */
      {
        path: 'album', //Se creo la ruta para abrir un componente
        component: AlbumListComponent,
      },
      {
        path: 'album/agregar',
        component: AlbumFormComponent,
      },
      {
        path: 'album/actualizar/:idAlbum',
        component: AlbumFormComponent,
      },

      /* DISQUERA */
      {
        path: 'disquera', //Se creo la ruta para abrir un componente
        component: DisqueraListComponent,
      },
      {
        path: 'disquera/agregar',
        component: DisqueraFormComponent,
      },
      {
        path: 'disquera/actualizar/:idDisquera',
        component: DisqueraFormComponent,
      },

      /* ARTISTA GRUPO */
      {
        path: 'artista_Grupo', //Se creo la ruta para abrir un componente
        component: ArtistaGrupoListComponent,
      },
      {
        path: 'artista_Grupo/agregar',
        component: ArtistaGrupoFormComponent,
      },
      {
        path: 'artista_Grupo/actualizar/:Codigo',
        component: ArtistaGrupoFormComponent,
      },

      /* ARTISTA */
      {
        path: 'artista', //Se creo la ruta para abrir un componente
        component: ArtistaListComponent,
      },
      {
        path: 'artista/agregar',
        component: ArtistaFormComponent,
      },
      {
        path: 'artista/actualizar/:idArtista',
        component: ArtistaFormComponent,
      },

      /* INSTRUMENTOS */
      {
        path: 'instrumento', //Se creo la ruta para abrir un componente
        component: InstrumentoListComponent,
      },
      {
        path: 'instrumento/agregar',
        component: InstrumentoFormComponent,
      },
      {
        path: 'instrumento/actualizar/:idInstrumento',
        component: InstrumentoFormComponent,
      },

      /* INSTRUMENTOS */
      {
        path: 'instrumento_Artista', //Se creo la ruta para abrir un componente
        component: InstrumetoArtistaListComponent,
      },
      {
        path: 'instrumento_Artista/agregar',
        component: InstrumetoArtistaFormComponent,
      },
      {
        path: 'instrumento_Artista/actualizar/:Codigo',
        component: InstrumetoArtistaFormComponent,
      },

      /* PAIS */
      {
        path: 'pais', //Se creo la ruta para abrir un componente
        component: PaisListComponent,
      },
      {
        path: 'pais/agregar',
        component: PaisFormComponent,
      },
      {
        path: 'pais/actualizar/:idPais',
        component: PaisFormComponent,
      },
      /* Usuarios */
      {
        path: 'users', //Se creo la ruta para abrir un componente
        component: UsuariosComponent,
      },

      /* ---------------------------------------------------------- BUSQUEDA ---------------------------------------------------------- */
      /* BUSCA CANCION ALBUM */
      {
        path: 'buscaCancion_Album/:idAlbum',
        component: BuscaCancionAlbumComponent,
      },

      /* BUSCA ALBUM GRUPO */
      {
        path: 'buscaAlbum_Grupo/:idGrupo',
        component: BuscaAlbumGrupoComponent,
      },

      /* BUSCA CANCION GRUPO */
      {
        path: 'buscaCancion_Grupo/:idGrupo',
        component: BuscaCancionGrupoComponent,
      },

      /* BUSCA INTEGRANTE GRUPO */
      {
        path: 'buscaIntegrante_Grupo/:idGrupo',
        component: BuscaIntegrantesGrupoComponent,
      },

      /* AUDITORIA */
      {
        path: 'auditoria',
        component: AuditoriaComponent,
      },
    ],
  },

  /* Pagina no existente */
  { path: '**', redirectTo: '/repertorio/grupo', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
