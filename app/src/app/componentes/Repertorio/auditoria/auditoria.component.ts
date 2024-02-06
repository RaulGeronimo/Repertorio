import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuditoriaService } from 'src/app/servicios/auditoria.service';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-auditoria',
  templateUrl: './auditoria.component.html',
  styleUrls: ['./auditoria.component.css'],
})
export class AuditoriaComponent implements OnInit {
  lista: any = [];
  search: any;

  p: number = 1;
  total: number = 0;

  order: string = 'id';
  reverse: boolean = true;
  caseInsensitive: boolean = false;
  sortedCollection: any[];

  constructor(
    private service: AuditoriaService,
    private router: Router,
    private orderPipe: OrderPipe
  ) {
    this.sortedCollection = orderPipe.transform(this.lista, 'id');
    //console.log(this.sortedCollection);
  }

  ngOnInit(): void {
    if (localStorage.getItem('Usuario') == null) {
      this.router.navigate(['login']);
    } else {
      if (localStorage.getItem('Rol') == '1') {
        this.obtenerLista();
      } else {
        this.router.navigate(['/']);
      }
    }
  }

  obtenerLista() {
    this.service.getLista().subscribe(
      (res) => {
        console.log(res); //Muestra en consola
        //Llena el arreglo con la respuesta que enviamos
        this.lista = res;
        this.total = this.lista.length;
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
