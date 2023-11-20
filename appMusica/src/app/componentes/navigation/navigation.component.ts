import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  logeado: boolean = false;
  user: any;
  rol: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.user = localStorage.getItem('Usuario');
    this.rol = localStorage.getItem('Rol');
  }

  Salir() {
    Swal.fire({
      title: '¿Estas seguro de salir de la aplicación?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Salir!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('Usuario');
        localStorage.removeItem('User');
        this.router.navigate(['login']);
      }
    });
  }
}
