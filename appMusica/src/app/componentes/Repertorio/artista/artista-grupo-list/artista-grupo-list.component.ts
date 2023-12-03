import { Component, OnInit } from '@angular/core';
//Importamos el archivo de Artista.service.ts
import { ArtistaGrupoService } from 'src/app/servicios/artista-grupo.service';
/* ALERTAS */
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artista-grupo-list',
  templateUrl: './artista-grupo-list.component.html',
  styleUrls: ['./artista-grupo-list.component.css'],
})
export class ArtistaGrupoListComponent implements OnInit {
  //Creamos el arreglo vacio llamado artistas
  artistas: any = [];
  search: any;
  show: boolean = false;
  total: number = 0;

  constructor(
    private Service: ArtistaGrupoService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('Usuario') == null) {
      this.router.navigate(['login']);
    } else {
      this.obtenerLista();
    }
  }

  obtenerLista() {
    this.Service.getArtistas().subscribe(
      (res) => {
        console.log(res); //Muestra en consola
        //Llena el arreglo con la respuesta que enviamos
        this.artistas = res;
        this.total = this.artistas.length;
      },
      (err) => console.error(err)
    );
  }

  /* borrar(Codigo: string) {
    this.Service.delete(Codigo).subscribe(
      (res) => {
        //Llena el arreglo con la respuesta que enviamos
        console.log(res);
        this.obtenerLista();
        this.toastr.warning(
          'El artista fue eliminado con éxito',
          'Artista eliminado'
        );
      },
      (err) => console.error(err)
    );
  } */

  borrar(Codigo: string) {
    Swal.fire({
      title: '¿Estas seguro de eliminar el registro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, bórralo!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        /* Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        ) */
        this.Service.delete(Codigo).subscribe(
          (res) => {
            //Llena el arreglo con la respuesta que enviamos
            console.log(res);
            this.obtenerLista();
            this.toastr.warning(
              'El artista fue eliminado con éxito',
              'Artista eliminado'
            );
          },
          (err) => console.error(err)
        );
      }
    });
  }
}
