import { Component, OnInit } from '@angular/core';
//Importamos el archivo de .service.ts
import { AlbumService } from 'src/app/servicios/album.service';
/* ALERTAS */
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

//Ordenamiento
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css'],
})
export class AlbumListComponent implements OnInit {
  //Creamos el arreglo vacio llamado artistas
  Albums: any = [];
  total: number = 0;
  Usuario: string = '';

  //Busqueda
  search: any;
  show: boolean = false;
  tabla: boolean = true;

  //Ordenamiento
  order: string = 'Nombre';
  reverse: boolean = false;
  caseInsensitive: boolean = false;
  sortedCollection: any[];

  constructor(
    private Service: AlbumService,
    private toastr: ToastrService,
    private router: Router,
    private orderPipe: OrderPipe
  ) {
    this.sortedCollection = orderPipe.transform(this.Albums, 'Nombre');
  }

  ngOnInit(): void {
    if (localStorage.getItem('Usuario') == null) {
      this.router.navigate(['login']);
    } else {
      this.obtenerLista();
    }
  }

  obtenerLista() {
    this.Service.getAlbums().subscribe(
      (res) => {
        console.log(res); //Muestra en consola
        //Llena el arreglo con la respuesta que enviamos
        this.Albums = res;
        this.total = this.Albums.length;
      },
      (err) => console.error(err)
    );
  }

  borrar(idAlbum: string) {
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
        this.Service.delete(idAlbum, this.Usuario).subscribe(
          (res) => {
            //Llena el arreglo con la respuesta que enviamos
            console.log(res);
            this.obtenerLista();
            this.toastr.warning(
              'El álbum fue eliminado con éxito',
              'Álbum eliminado'
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
