import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; //Para enviar a una ruta Especifica
//Alertas
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
//Entidad
import { BuscaGrupoService } from 'src/app/servicios/busca-grupo.service';
//Canciones
import { BuscaCancionGrupoService } from 'src/app/servicios/busca-cancion-grupo.service';
import { CancionesService } from 'src/app/servicios/canciones.service';
//Ordenamiento
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-busca-cancion-grupo',
  templateUrl: './busca-cancion-grupo.component.html',
  styleUrls: ['./busca-cancion-grupo.component.css'],
})
export class BuscaCancionGrupoComponent implements OnInit {
  //Creamos el arreglo vacio llamado Canciones
  Canciones: any = [];
  Grupo: any = [];
  total: number = 0;

  //Busqueda
  search: any;

  //Ordenamiento
  order: string = 'id';
  reverse: boolean = false;
  caseInsensitive: boolean = false;
  sortedCollection: any[];

  constructor(
    private Service: BuscaCancionGrupoService,
    private activatedRoute: ActivatedRoute,
    private CancionesAlbumService: CancionesService,
    private GrupoService: BuscaGrupoService,
    private toastr: ToastrService,
    private router: Router,
    private orderPipe: OrderPipe
  ) {
    this.sortedCollection = orderPipe.transform(this.Canciones, 'Nombre');
  }

  ngOnInit(): void {
    if (localStorage.getItem('Usuario') == null) {
      this.router.navigate(['login']);
    } else {
      this.obtenerLista();
      this.obtenerGrupo();
    }
  }

  obtenerLista() {
    const params = this.activatedRoute.snapshot.params;
    if (params['idGrupo']) {
      this.Service.getCancion(params['idGrupo']).subscribe(
        (res) => {
          console.log(res); //Muestra en consola
          this.Canciones = res; //Muestra en el navegador
          this.total = this.Canciones.length;
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
          console.log(res); //Muestra en consola
          this.Grupo = res; //Muestra en el navegador
          this.toastr.success(
            `Canciones del grupo '${this.Grupo.Nombre}'`,
            'Lista de Canciones'
          );
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
            console.log(res);
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
