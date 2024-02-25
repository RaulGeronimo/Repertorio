import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; //Para enviar a una ruta Especifica
//Alertas
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
//Entidad
import { BuscaAlbumService } from 'src/app/servicios/busca-album.service';
//Canciones
import { BuscaCancionAlbumService } from 'src/app/servicios/busca-cancion-album.service';
import { CancionesAlbumService } from 'src/app/servicios/canciones-album.service';
//Ordenamiento
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-busca-cancion-album',
  templateUrl: './busca-cancion-album.component.html',
  styleUrls: ['./busca-cancion-album.component.css'],
})
export class BuscaCancionAlbumComponent implements OnInit {
  //Creamos el arreglo vacio llamado Canciones
  Canciones: any = [];
  Album: any = [];

  //Busqueda
  search: any;

  //Ordenamiento
  order: string = 'id';
  reverse: boolean = false;
  caseInsensitive: boolean = false;
  sortedCollection: any[];

  constructor(
    private Service: BuscaCancionAlbumService,
    private activatedRoute: ActivatedRoute,
    private CancionesAlbumService: CancionesAlbumService,
    private AlbumService: BuscaAlbumService,
    private toastr: ToastrService,
    private router: Router,
    private orderPipe: OrderPipe
  ) {
    this.sortedCollection = orderPipe.transform(this.Canciones, 'Codigo');
  }

  ngOnInit(): void {
    if (localStorage.getItem('Usuario') == null) {
      this.router.navigate(['login']);
    } else {
      this.obtenerLista();
      this.obtenerAlbum();
      localStorage.removeItem('idGrupo');
    }
  }

  obtenerLista() {
    const params = this.activatedRoute.snapshot.params;
    if (params['idAlbum']) {
      this.Service.getCancion(params['idAlbum']).subscribe(
        (res) => {
          //console.log(res); //Muestra en consola
          this.Canciones = res; //Muestra en el navegador
        },
        (err) => console.error(err)
      );
    }
  }

  obtenerAlbum() {
    const params = this.activatedRoute.snapshot.params;
    if (params['idAlbum']) {
      this.AlbumService.getAlbum(params['idAlbum']).subscribe(
        (res) => {
          //console.log(res); //Muestra en consola
          this.Album = res; //Muestra en el navegador
          this.toastr.success(
            `Canciones del álbum '${this.Album.Nombre}'`,
            'Lista de Canciones'
          );
          localStorage.setItem('idAlbum', this.Album.idAlbum!);
        },
        (err) => console.error(err)
      );
    }
  }

  borrar(idCancion: string) {
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
        this.CancionesAlbumService.delete(idCancion).subscribe(
          (res) => {
            //Llena el arreglo con la respuesta que enviamos
            //console.log(res);
            this.obtenerLista();
            this.toastr.warning(
              'La canción fue eliminada con éxito',
              'Canción eliminada'
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
