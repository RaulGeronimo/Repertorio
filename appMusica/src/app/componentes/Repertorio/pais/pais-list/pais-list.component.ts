import { Component, OnInit } from '@angular/core';
//Importamos el archivo de Pais.service.ts
import { PaisService } from 'src/app/servicios/pais.service';
/* ALERTAS */
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pais-list',
  templateUrl: './pais-list.component.html',
  styleUrls: ['./pais-list.component.css'],
})
export class PaisListComponent implements OnInit {
  //Creamos el arreglo vacio llamado paises
  paises: any = [];
  search: any;
  show: boolean = false;

  constructor(
    private paisService: PaisService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('Usuario') == null) {
      this.router.navigate(['login']);
    } else {
      if (localStorage.getItem('Rol') == '1') {
        this.obtenerPaises();
      } else {
        this.router.navigate(['/']);
      }
    }
  }

  obtenerPaises() {
    this.paisService.getPaises().subscribe(
      (res) => {
        console.log(res); //Muestra en consola
        //Llena el arreglo con la respuesta que enviamos
        this.paises = res;
      },
      (err) => console.error(err)
    );
  }

  /* borrarPais(idPais: string) {
    this.paisService.deletePais(idPais).subscribe(
      (res) => {
        //Llena el arreglo con la respuesta que enviamos
        console.log(res);
        this.obtenerPaises();
        this.toastr.warning(
          'El pais fue eliminado con éxito',
          'Pais eliminado'
        );
      },
      (err) => console.error(err)
    );
  } */

  borrar(idPais: string) {
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
        this.paisService.deletePais(idPais).subscribe(
          (res) => {
            //Llena el arreglo con la respuesta que enviamos
            console.log(res);
            this.obtenerPaises();
            this.toastr.warning(
              'El pais fue eliminado con éxito',
              'Pais eliminado'
            );
          },
          (err) => console.error(err)
        );
      }
    });
  }
}
