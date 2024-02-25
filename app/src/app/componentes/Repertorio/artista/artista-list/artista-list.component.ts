import { Component, OnInit } from '@angular/core';
//Importamos el archivo de Artista.service.ts
import { ArtistaService } from 'src/app/servicios/artista.service';
/* ALERTAS */
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
//Ordenamiento
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-artista-list',
  templateUrl: './artista-list.component.html',
  styleUrls: ['./artista-list.component.css'],
})
export class ArtistaListComponent implements OnInit {
  //Creamos el arreglo vacio llamado artistas
  artistas: any = [];
  total: number = 0;
  Usuario: string = '';

  //Busqueda
  search: any;
  show: boolean = false;
  tabla: boolean = true;

  //Ordenamiento
  order: string = 'NombreArtistico';
  reverse: boolean = false;
  caseInsensitive: boolean = false;
  sortedCollection: any[];

  constructor(
    private Service: ArtistaService,
    private toastr: ToastrService,
    private router: Router,
    private orderPipe: OrderPipe
  ) {
    this.sortedCollection = orderPipe.transform(
      this.artistas,
      'NombreArtistico'
    );
  }

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
        //console.log(res); //Muestra en consola
        //Llena el arreglo con la respuesta que enviamos
        this.artistas = res;
        this.total = this.artistas.length;
      },
      (err) => console.error(err)
    );
  }

  borrar(idArtista: string) {
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
        this.Usuario = localStorage.getItem('Correo') || '';
        this.Service.delete(idArtista, this.Usuario).subscribe(
          (res) => {
            //Llena el arreglo con la respuesta que enviamos
            //console.log(res);
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
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }
}
