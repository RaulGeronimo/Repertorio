import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Cambiar el idioma
import localeEsMX from '@angular/common/locales/es-MX';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEsMX);

//Importamos el modulo de http
import { HttpClientModule } from '@angular/common/http';

//Importamos los modulos de los formularios
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

//Importamos el modulo de FormModule que va enlazar los input
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

//Elementos del CRUD
import { NavigationComponent } from './componentes/navigation/navigation.component';
import { FooterComponent } from './componentes/footer/footer.component';

//Usuario
import { LoginComponent } from './componentes/usuario/login/login.component';
import { RegisterComponent } from './componentes/usuario/register/register.component';
import { PrincipalComponent } from './componentes/Repertorio/principal/principal.component';


//List
import { PaisListComponent } from './componentes/Repertorio/pais/pais-list/pais-list.component';
import { InstrumentoListComponent } from './componentes/Repertorio/instrumento/instrumento-list/instrumento-list.component';
import { ArtistaListComponent } from './componentes/Repertorio/artista/artista-list/artista-list.component';
import { GruposListComponent } from './componentes/Repertorio/grupo/grupos-list/grupos-list.component';
import { ArtistaGrupoListComponent } from './componentes/Repertorio/artista/artista-grupo-list/artista-grupo-list.component';
import { DisqueraListComponent } from './componentes/Repertorio/disquera/disquera-list/disquera-list.component';
import { AlbumListComponent } from './componentes/Repertorio/album/album-list/album-list.component';
import { CancionesListComponent } from './componentes/Repertorio/canciones/canciones-list/canciones-list.component';
import { CancionesAlbumListComponent } from './componentes/Repertorio/canciones/canciones-album-list/canciones-album-list.component';
import { InstrumetoArtistaListComponent } from './componentes/Repertorio/instrumento/instrumeto-artista-list/instrumeto-artista-list.component';

//Form Component
import { PaisFormComponent } from './componentes/Repertorio/pais/pais-form/pais-form.component';
import { InstrumentoFormComponent } from './componentes/Repertorio/instrumento/instrumento-form/instrumento-form.component';
import { ArtistaFormComponent } from './componentes/Repertorio/artista/artista-form/artista-form.component';
import { GruposFormComponent } from './componentes/Repertorio/grupo/grupos-form/grupos-form.component';
import { ArtistaGrupoFormComponent } from './componentes/Repertorio/artista/artista-grupo-form/artista-grupo-form.component';
import { DisqueraFormComponent } from './componentes/Repertorio/disquera/disquera-form/disquera-form.component';
import { AlbumFormComponent } from './componentes/Repertorio/album/album-form/album-form.component';
import { CancionesFormComponent } from './componentes/Repertorio/canciones/canciones-form/canciones-form.component';
import { CancionesAlbumFormComponent } from './componentes/Repertorio/canciones/canciones-album-form/canciones-album-form.component';
import { InstrumetoArtistaFormComponent } from './componentes/Repertorio/instrumento/instrumeto-artista-form/instrumeto-artista-form.component';

//Servicios
import { PaisService } from './servicios/pais.service';
import { InstrumentosService } from './servicios/instrumentos.service';
import { ArtistaService } from './servicios/artista.service';
import { GruposService } from './servicios/grupos.service';
import { ArtistaGrupoService } from './servicios/artista-grupo.service';
import { DisqueraService } from './servicios/disquera.service';
import { AlbumService } from './servicios/album.service';
import { CancionesService } from './servicios/canciones.service';
import { CancionesAlbumService } from './servicios/canciones-album.service';
import { InstrumentoArtistaService } from './servicios/instrumento-artista.service';
import { UserService } from './servicios/user.service';

//Busqueda
import { BuscaCancionAlbumComponent } from './componentes/Repertorio/album/busca-cancion-album/busca-cancion-album.component';
import { BuscaCancionGrupoComponent } from './componentes/Repertorio/grupo/busca-cancion-grupo/busca-cancion-grupo.component';
import { BuscaAlbumGrupoComponent } from './componentes/Repertorio/grupo/busca-album-grupo/busca-album-grupo.component';
import { BuscaIntegrantesGrupoComponent } from './componentes/Repertorio/grupo/busca-integrantes-grupo/busca-integrantes-grupo.component';

//Paginacion
import { NgxPaginationModule } from 'ngx-pagination';
import { AuditoriaComponent } from './componentes/Repertorio/auditoria/auditoria.component';
import { AuditoriaService } from './servicios/auditoria.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { OrderModule } from 'ngx-order-pipe';
import { UsuariosComponent } from './componentes/Repertorio/usuarios/usuarios.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    PaisListComponent,
    PaisFormComponent,
    InstrumentoListComponent,
    InstrumentoFormComponent,
    ArtistaListComponent,
    ArtistaFormComponent,
    GruposFormComponent,
    GruposListComponent,
    ArtistaGrupoFormComponent,
    ArtistaGrupoListComponent,
    DisqueraFormComponent,
    DisqueraListComponent,
    AlbumListComponent,
    AlbumFormComponent,
    CancionesFormComponent,
    CancionesListComponent,
    CancionesAlbumListComponent,
    CancionesAlbumFormComponent,
    BuscaAlbumGrupoComponent,
    BuscaCancionAlbumComponent,
    BuscaCancionGrupoComponent,
    BuscaIntegrantesGrupoComponent,
    InstrumetoArtistaFormComponent,
    InstrumetoArtistaListComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    PrincipalComponent,
    AuditoriaComponent,
    UsuariosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    Ng2SearchPipeModule,
    NgxPaginationModule,
    NgxDatatableModule,
    OrderModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-MX' },
    PaisService,
    InstrumentosService,
    ArtistaService,
    GruposService,
    ArtistaGrupoService,
    DisqueraService,
    AlbumService,
    CancionesService,
    CancionesAlbumService,
    InstrumentoArtistaService,
    UserService,
    AuditoriaService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
