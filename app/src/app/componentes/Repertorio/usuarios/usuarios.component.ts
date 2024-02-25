import { Component, OnInit } from '@angular/core';
//Importamos el archivo de .service.ts
import { UserService } from 'src/app/servicios/user.service';
/* ALERTAS */
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

//Ordenamiento
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  Usuarios: any = [];
  total: number = 0;

  //Busqueda
  search: any;

  //Ordenamiento
  order: string = 'Nombre';
  reverse: boolean = false;
  caseInsensitive: boolean = false;
  sortedCollection: any[];

  constructor(
    private Service: UserService,
    private toastr: ToastrService,
    private router: Router,
    private orderPipe: OrderPipe
  ) {
    this.sortedCollection = orderPipe.transform(this.Usuarios, 'Nombre');
  }

  ngOnInit(): void {
    if (localStorage.getItem('Usuario') == null) {
      this.router.navigate(['login']);
    } else {
      this.obtenerLista();
    }
  }

  obtenerLista() {
    this.Service.lista().subscribe(
      (res) => {
        //console.log(res); //Muestra en consola
        //Llena el arreglo con la respuesta que enviamos
        this.Usuarios = res;
        this.total = this.Usuarios.length;
      },
      (err) => console.error(err)
    );
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }
}
