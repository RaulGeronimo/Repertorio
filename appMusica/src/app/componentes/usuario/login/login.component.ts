import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; //Para enviar a una ruta Especifica
/* ENTIDAD */
import { User } from 'src/app/modelos/User';
import { UserService } from 'src/app/servicios/user.service';
/* ALERTAS */
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  fieldTextType: boolean = false;
  form: FormGroup;

  user: User = {
    IdUsuario: 0,
    Nombre: '',
    ApellidoPaterno: '',
    ApellidoMaterno: '',
    Usuario: '',
    Correo: '',
    Password: '',
    Rol: 0,
  };

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      Usuario: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    localStorage.removeItem('Usuario');
    localStorage.removeItem('User');

    /* if (localStorage.getItem('Usuario') != null) {
      this.router.navigate(['repertorio/grupo']);
    } */
  }

  login() {
    this.userService.login(this.user.Usuario!, this.user.Password!).subscribe(
      (res: any) => {
        if (res != null) {
          this.router.navigate(['repertorio/grupo']);
          this.user = res;
          console.log(res);

          localStorage.setItem('Rol', this.user.Rol.toString());

          localStorage.setItem('Usuario', this.user.Usuario!);
          this.toastr.success(
            `Bienvenido '${this.user.Usuario}'`,
            'Usuario Logeado'
          );
        } else {
          this.router.navigate(['login']);
          /* this.toastr.warning(
            'No se encontro al usuario',
            'Usuario no encontrado'
          ); */

          Swal.fire({
            title: 'No se encontro al usuario',
            text: 'Usuario no encontrado',
            icon: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          });
        }
      },
      (err) => {
        console.error(err);
        this.error();
      }
    );
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  error() {
    Swal.fire({
      title: 'Error de Servidor',
      text: 'Espere un momento',
      icon: 'question',
    });
  }
}
