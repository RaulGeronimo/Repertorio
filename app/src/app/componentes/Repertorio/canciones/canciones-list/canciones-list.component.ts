import { Component, OnInit } from '@angular/core';
//Importamos el archivo de .service.ts
import { CancionesService } from 'src/app/servicios/canciones.service';
/* ALERTAS */
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

//Ordenamiento
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-canciones-list',
  templateUrl: './canciones-list.component.html',
  styleUrls: ['./canciones-list.component.css'],
})
export class CancionesListComponent implements OnInit {
  //Creamos el arreglo vacio llamado Canciones
  Canciones: any = [];
  total: number = 0;
  Usuario: string = '';

  //Busqueda
  search: any;

  //Ordenamiento
  order: string = 'Nombre';
  reverse: boolean = false;
  caseInsensitive: boolean = false;
  sortedCollection: any[];

  constructor(
    private Service: CancionesService,
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
      localStorage.removeItem('idGrupo');
    }
  }

  obtenerLista() {
    this.Service.getCanciones().subscribe(
      (res) => {
        //console.log(res); //Muestra en consola
        //Llena el arreglo con la respuesta que enviamos
        this.Canciones = res;
        this.total = this.Canciones.length;
      },
      (err) => console.error(err)
    );
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
        this.Usuario = localStorage.getItem('Correo') || '';
        this.Service.delete(idCancion, this.Usuario).subscribe(
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
