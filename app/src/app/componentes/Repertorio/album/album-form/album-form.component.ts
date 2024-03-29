import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; //Para enviar a una ruta Especifica
/* ENTIDAD */
import { Album } from 'src/app/modelos/Album';
import { AlbumService } from 'src/app/servicios/album.service';
/* LLAVE FORANEA */
import { GruposService } from 'src/app/servicios/grupos.service';
import { DisqueraService } from 'src/app/servicios/disquera.service';
/* ALERTAS */
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-album-form',
  templateUrl: './album-form.component.html',
  styleUrls: ['./album-form.component.css'],
})
export class AlbumFormComponent implements OnInit {
  form: FormGroup;

  album: Album = {
    idAlbum: 0,
    idGrupo: '',
    idDisquera: '',
    Nombre: '',
    Duracion: '',
    Lanzamiento: '',
    Grabacion: '',
    Genero: '',
    Portada: '',
  };
  edit: boolean = false;

  idGrupo: any;

  Grupo: any = [];
  Disquera: any = [];

  search: any;
  searchDisquera: any;

  constructor(
    private Service: AlbumService,
    private GruposService: GruposService,
    private DisqueraService: DisqueraService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      Grupo: [''],
      Disquera: [''],
      idGrupo: ['', Validators.required],
      idDisquera: ['', Validators.required],
      Nombre: ['', Validators.required],
      Duracion: ['', Validators.required],
      Lanzamiento: ['', Validators.required],
      Grabacion: ['', Validators.required],
      Genero: ['', Validators.required],
      Portada: ['', [Validators.pattern('https?://.*'), Validators.required]],
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('Usuario') == null) {
      this.router.navigate(['login']);
    } else {
      if (localStorage.getItem('idGrupo') != null) {
        this.idGrupo = localStorage.getItem('idGrupo');
        //console.log('Grupo: ' + this.idGrupo)
      }
      this.obtenerDisquera();
      this.obtenerGrupo();
      const params = this.activatedRoute.snapshot.params;
      if (params['idAlbum']) {
        this.Service.getAlbum(params['idAlbum']).subscribe(
          (res) => {
            //console.log(res); //Muestra en consola
            this.album = res; //Muestra en el navegador
            this.edit = true; //Asignamos que es verdadero
          },
          (err) => console.error(err)
        );
      }
    }
  }

  add() {
    this.album.Usuario = localStorage.getItem('Correo') || '';
    this.Service.create(this.album).subscribe(
      (res) => {
        //Llenamos el arreglo con la respuesta
        //console.log(res);
        if (this.idGrupo != null) {
          this.router.navigate(['repertorio/buscaAlbum_Grupo/' + this.idGrupo]);
          localStorage.removeItem('idGrupo');
        } else {
          this.router.navigate(['repertorio/album']);
        }
        this.toastr.success(
          `El álbum '${this.album.Nombre}' fue agregado con éxito`,
          'Álbum Agregado'
        );
      },
      (err) => console.error(err)
    );
  }

  actualiza() {
    this.album.Usuario = localStorage.getItem('Correo') || '';
    const params = this.activatedRoute.snapshot.params;

    this.Service.update(params['idAlbum'], this.album).subscribe(
      (res) => {
        //console.log(res);
        if (this.idGrupo != null) {
          this.router.navigate(['repertorio/buscaAlbum_Grupo/' + this.idGrupo]);
          localStorage.removeItem('idGrupo');
        } else {
          this.router.navigate(['repertorio/album']);
        }
        this.toastr.info(
          `El álbum '${this.album.Nombre}' fue actualizado con éxito`,
          'Álbum Actualizado'
        );
      },
      (err) => console.error(err)
    );
  }

  obtenerGrupo() {
    this.GruposService.getGrupos().subscribe(
      (res) => {
        //Llena el arreglo con la respuesta que enviamos
        this.Grupo = res;
      },
      (err) => console.error(err)
    );
  }

  obtenerDisquera() {
    this.DisqueraService.getDisqueras().subscribe(
      (res) => {
        //Llena el arreglo con la respuesta que enviamos
        this.Disquera = res;
      },
      (err) => console.error(err)
    );
  }
}
