import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; //Para enviar a una ruta Especifica
/* ENTIDAD */
import { Cancion } from 'src/app/modelos/Canciones';
import { CancionesService } from 'src/app/servicios/canciones.service';
/* LLAVE FORANEA */
import { GruposService } from 'src/app/servicios/grupos.service';
/* ALERTAS */
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-canciones-form',
  templateUrl: './canciones-form.component.html',
  styleUrls: ['./canciones-form.component.css'],
})
export class CancionesFormComponent implements OnInit {
  form: FormGroup;

  cancion: Cancion = {
    idCancion: 0,
    Nombre: '',
    Duracion: '',
    Publicacion: '',
    Genero: '',
    Interpretacion: '',
    idGrupo: '',
  };

  idGrupo: any;

  search: any;
  Grupo: any = [];
  edit: boolean = false;

  constructor(
    private Service: CancionesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private GruposService: GruposService
  ) {
    this.form = this.fb.group({
      Grupo: [''],
      Nombre: ['', Validators.required],
      Duracion: ['', Validators.required],
      Publicacion: ['', Validators.required],
      Genero: ['', Validators.required],
      Interpretacion: ['', Validators.required],
      idGrupo: ['', Validators.required],
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
      this.obtenerGrupo();
      const params = this.activatedRoute.snapshot.params;
      if (params['idCancion']) {
        this.Service.getCancion(params['idCancion']).subscribe(
          (res) => {
            console.log(res); //Muestra en consola
            this.cancion = res; //Muestra en el navegador
            this.edit = true; //Asignamos que es verdadero
          },
          (err) => console.error(err)
        );
      }
    }
  }

  add() {
    this.cancion.Usuario = localStorage.getItem('Correo') || '';
    this.Service.create(this.cancion).subscribe(
      (res) => {
        //Llenamos el arreglo con la respuesta
        console.log(res);
        if (this.idGrupo != null) {
          this.router.navigate([
            'repertorio/buscaCancion_Grupo/' + this.idGrupo,
          ]);
          localStorage.removeItem('idGrupo');
        } else {
          this.router.navigate(['repertorio/canciones']);
        }
        this.toastr.success(
          `La canción '${this.cancion.Nombre}' fue agregada con éxito`,
          'Canción Agregada'
        );
      },
      (err) => console.error(err)
    );
  }

  actualiza() {
    this.cancion.Usuario = localStorage.getItem('Correo') || '';
    const params = this.activatedRoute.snapshot.params;

    this.Service.update(params['idCancion'], this.cancion).subscribe(
      (res) => {
        console.log(res);
        if (this.idGrupo != null) {
          this.router.navigate([
            'repertorio/buscaCancion_Grupo/' + this.idGrupo,
          ]);
          localStorage.removeItem('idGrupo');
        } else {
          this.router.navigate(['repertorio/canciones']);
        }
        this.toastr.info(
          `La canción '${this.cancion.Nombre}' fue actualizada con éxito`,
          'Canción Actualizada'
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
}
