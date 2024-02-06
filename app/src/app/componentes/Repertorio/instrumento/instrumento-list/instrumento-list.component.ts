import { Component, OnInit } from '@angular/core';
//Importamos el archivo de Instrumentos.service.ts
import { InstrumentosService } from 'src/app/servicios/instrumentos.service';
/* ALERTAS */
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instrumento-list',
  templateUrl: './instrumento-list.component.html',
  styleUrls: ['./instrumento-list.component.css'],
})
export class InstrumentoListComponent implements OnInit {
  //Creamos el arreglo vacio llamado paises
  instrumentos: any = [];
  total: number = 0;
  search: any;
  show: boolean = false;
  Usuario: string = '';

  constructor(
    private instrumentosService: InstrumentosService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('Usuario') == null) {
      this.router.navigate(['login']);
    } else {
      if (localStorage.getItem('Rol') == '1') {
        this.obtenerInstrumentos();
      } else {
        this.router.navigate(['/']);
      }
    }
  }

  obtenerInstrumentos() {
    this.instrumentosService.getInstrumentos().subscribe(
      (res) => {
        console.log(res); //Muestra en consola
        //Llena el arreglo con la respuesta que enviamos
        this.instrumentos = res;
        this.total = this.instrumentos.length;
      },
      (err) => console.error(err)
    );
  }

  /* borrarInstrumento(idInstrumento: string) {
    this.instrumentosService.deleteInstrumento(idInstrumento).subscribe(
      (res) => {
        //Llena el arreglo con la respuesta que enviamos
        console.log(res);
        this.obtenerInstrumentos();
        this.toastr.warning(
          'El instrumento fue eliminado con éxito',
          'Instrumento eliminado'
        );
      },
      (err) => console.error(err)
    );
  } */

  borrar(idInstrumento: string) {
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
        this.Usuario = localStorage.getItem('Correo') || '';
        this.instrumentosService.deleteInstrumento(idInstrumento, this.Usuario).subscribe(
          (res) => {
            //Llena el arreglo con la respuesta que enviamos
            console.log(res);
            this.obtenerInstrumentos();
            this.toastr.warning(
              'El instrumento fue eliminado con éxito',
              'Instrumento eliminado'
            );
          },
          (err) => console.error(err)
        );
      }
    });
  }
}
