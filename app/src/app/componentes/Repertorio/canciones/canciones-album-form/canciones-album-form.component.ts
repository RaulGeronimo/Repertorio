import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; //Para enviar a una ruta Especifica
/* ENTIDAD */
import { CancionesAlbum } from 'src/app/modelos/CancionesAlbum';
import { CancionesAlbumService } from 'src/app/servicios/canciones-album.service';
/* LLAVE FORANEA */
import { CancionesService } from 'src/app/servicios/canciones.service';
import { AlbumService } from 'src/app/servicios/album.service';
/* ALERTAS */
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-canciones-album-form',
  templateUrl: './canciones-album-form.component.html',
  styleUrls: ['./canciones-album-form.component.css'],
})
export class CancionesAlbumFormComponent implements OnInit {
  form: FormGroup;

  cancionesAlbum: CancionesAlbum = {
    Codigo: 0,
    idAlbum: '',
    idCancion: '',
    Numero: '',
  };

  idGrupo: any;
  idAlbum: any;

  edit: boolean = false;

  /* LLAVE FORANEA */
  Canciones: any = [];
  Album: any = [];
  search: any;

  constructor(
    private Service: CancionesAlbumService,
    private CancionesService: CancionesService,
    private AlbumService: AlbumService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      Grupo: [''],
      idAlbum: ['', Validators.required],
      idCancion: ['', Validators.required],
      Numero: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('Usuario') == null) {
      this.router.navigate(['login']);
    } else {
      if (localStorage.getItem('idGrupo') != null) {
        this.idGrupo = localStorage.getItem('idGrupo');
        console.log('Grupo: ' + this.idGrupo)
      }
      if (localStorage.getItem('idAlbum') != null) {
        this.idAlbum = localStorage.getItem('idAlbum');
        console.log('Album: ' + this.idAlbum)
      }
      this.obtenerCancion();
      this.obtenerAlbum();
      const params = this.activatedRoute.snapshot.params;
      if (params['Codigo']) {
        this.Service.getCancion(params['Codigo']).subscribe(
          (res) => {
            //console.log(res); //Muestra en consola
            this.cancionesAlbum = res; //Muestra en el navegador
            this.edit = true; //Asignamos que es verdadero
          },
          (err) => console.error(err)
        );
      }
    }
  }

  add() {
    this.Service.create(this.cancionesAlbum).subscribe(
      (res) => {
        //Llenamos el arreglo con la respuesta
        //console.log(res);
        if (this.idGrupo != null) {
          this.router.navigate([
            'repertorio/buscaCancion_Grupo/' + this.idGrupo,
          ]);
          localStorage.removeItem('idGrupo');
        }
        if (this.idAlbum != null) {
          this.router.navigate(['repertorio/buscaCancion_Album/' + this.idAlbum]);
          localStorage.removeItem('idAlbum');
        } else {
          this.router.navigate(['repertorio/canciones_Album']);
        }
        this.toastr.success(
          'La canción fue agregada al álbum con éxito',
          'Canción Agregada'
        );
      },
      (err) => console.error(err)
    );
  }

  actualiza() {
    const params = this.activatedRoute.snapshot.params;

    this.Service.update(params['Codigo'], this.cancionesAlbum).subscribe(
      (res) => {
        //console.log(res);
        if (this.idGrupo != null) {
          this.router.navigate(['repertorio/buscaAlbum_Grupo/' + this.idGrupo]);
          localStorage.removeItem('idGrupo');
        } else {
          this.router.navigate(['repertorio/canciones_Album']);
        }
        this.toastr.info(
          'La canción fue actualizada con éxito',
          'Canción Actualizada'
        );
      },
      (err) => console.error(err)
    );
  }

  obtenerCancion() {
    this.CancionesService.getCanciones().subscribe(
      (res) => {
        //Llena el arreglo con la respuesta que enviamos
        this.Canciones = res;
      },
      (err) => console.error(err)
    );
  }

  obtenerAlbum() {
    this.AlbumService.getAlbums().subscribe(
      (res) => {
        //Llena el arreglo con la respuesta que enviamos
        this.Album = res;
      },
      (err) => console.error(err)
    );
  }
}
