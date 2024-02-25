import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; //Para enviar a una ruta Especifica
//Alertas
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
//Entidad
import { BuscaGrupoService } from 'src/app/servicios/busca-grupo.service';
//Album
import { BuscaAlbumGrupoService } from 'src/app/servicios/busca-album-grupo.service';
import { AlbumService } from 'src/app/servicios/album.service';
//Ordenamiento
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-busca-album-grupo',
  templateUrl: './busca-album-grupo.component.html',
  styleUrls: ['./busca-album-grupo.component.css'],
})
export class BuscaAlbumGrupoComponent implements OnInit {
  //Creamos el arreglo vacio llamado Canciones
  Album: any = [];
  Grupo: any = [];
  total: number = 0;
  Usuario: string = '';

  //Busqueda
  search: any;
  show: boolean = false;
  tabla: boolean = true;

  //Ordenamiento
  order: string = 'id';
  reverse: boolean = false;
  caseInsensitive: boolean = false;
  sortedCollection: any[];

  constructor(
    private Service: BuscaAlbumGrupoService,
    private activatedRoute: ActivatedRoute,
    private AlbumService: AlbumService,
    private GrupoService: BuscaGrupoService,
    private toastr: ToastrService,
    private router: Router,
    private orderPipe: OrderPipe
  ) {
    this.sortedCollection = orderPipe.transform(this.Album, 'Lanzamiento');
  }

  ngOnInit(): void {
    if (localStorage.getItem('Usuario') == null) {
      this.router.navigate(['login']);
    } else {
      this.obtenerLista();
      this.obtenerGrupo();
      localStorage.removeItem('idAlbum');
    }
  }

  obtenerLista() {
    const params = this.activatedRoute.snapshot.params;
    if (params['idGrupo']) {
      this.Service.getAlbum(params['idGrupo']).subscribe(
        (res) => {
          //console.log(res); //Muestra en consola
          this.Album = res; //Muestra en el navegador
          this.total = this.Album.length;
        },
        (err) => console.error(err)
      );
    }
  }

  obtenerGrupo() {
    const params = this.activatedRoute.snapshot.params;
    if (params['idGrupo']) {
      this.GrupoService.getGrupo(params['idGrupo']).subscribe(
        (res) => {
          //console.log(res); //Muestra en consola
          this.Grupo = res; //Muestra en el navegador
          this.toastr.success(
            `Álbums del grupo '${this.Grupo.Nombre}'`,
            'Lista de Álbums'
          );
          localStorage.setItem('idGrupo', this.Grupo.idGrupo!);
        },
        (err) => console.error(err)
      );
    }
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
        this.AlbumService.delete(idAlbum, this.Usuario).subscribe(
          (res) => {
            //Llena el arreglo con la respuesta que enviamos
            //console.log(res);
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
