import { Component, OnInit } from '@angular/core';
//Importamos el archivo de .service.ts
import { DisqueraService } from 'src/app/servicios/disquera.service';
/* ALERTAS */
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-disquera-list',
  templateUrl: './disquera-list.component.html',
  styleUrls: ['./disquera-list.component.css'],
})
export class DisqueraListComponent implements OnInit {
  //Creamos el arreglo vacio llamado Grupos
  Disqueras: any = [];
  total: number =0;
  search: any;
  show: boolean = false;

  constructor(
    private Service: DisqueraService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('Usuario') == null) {
      this.router.navigate(['login']);
    } else {
      this.obtenerLista();
    }
  }

  obtenerLista() {
    this.Service.getDisqueras().subscribe(
      (res) => {
        console.log(res); //Muestra en consola
        //Llena el arreglo con la respuesta que enviamos
        this.Disqueras = res;
        this.total = this.Disqueras.length;
      },
      (err) => console.error(err)
    );
  }

  /* borrar(idDisquera: string) {
    this.Service.delete(idDisquera).subscribe(
      (res) => {
        //Llena el arreglo con la respuesta que enviamos
        console.log(res);
        this.obtenerLista();
        this.toastr.warning(
          'La disquera fue eliminada con éxito',
          'Disquera eliminada'
        );
      },
      (err) => console.error(err)
    );
  } */

  borrar(idDisquera: string) {
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
        this.Service.delete(idDisquera).subscribe(
          (res) => {
            //Llena el arreglo con la respuesta que enviamos
            console.log(res);
            this.obtenerLista();
            this.toastr.warning(
              'La disquera fue eliminada con éxito',
              'Disquera eliminada'
            );
          },
          (err) => console.error(err)
        );
      }
    });
  }
}
