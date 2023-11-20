import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; //Para enviar a una ruta Especifica
/* ENTIDAD */
import { User } from 'src/app/modelos/User';
import { UserService } from 'src/app/servicios/user.service';
/* ALERTAS */
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
form: FormGroup;
fieldTextType: boolean = false;
user: User = {
    IdUsuario: 0,
    Nombre: '',
    ApellidoPaterno: '',
    ApellidoMaterno: '',
    Usuario: '',
    Correo: '',
    Password: '',
    Rol: 0
};

 constructor(private Service: UserService,
  private router: Router,
  private fb: FormBuilder,
  private toastr: ToastrService){
    this.form = this.fb.group({
      Nombre: ['', Validators.required],
      ApellidoPaterno: ['', Validators.required],
      ApellidoMaterno: ['', Validators.required],
      Usuario: ['', Validators.required],
      Correo: ['', [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), Validators.required]],
      Password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('Usuario') != null) {
      this.router.navigate(['repertorio/grupo']);
    } 
  }

  add() {
    this.Service.create(this.user).subscribe(
      (res) => {
        //Llenamos el arreglo con la respuesta
        console.log(res);
        this.router.navigate(['login']);
        this.toastr.success(
          `El usuario '${this.user.Usuario}' fue agregado con éxito`,
          'Usuario Agregado'
        );
      },
      (err) => console.error(err)
    );
  }

  validateUser() {
    this.Service.validar(this.user.Correo!).subscribe(
      (res: any) => {
        if (res.length == 0) {
          this.add();
        } else {
          this.toastr.warning(
            'El correo ya fue registrado',
            'Ingrese otro correo'
          );
        }
      }
    );
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
