import { Injectable } from '@angular/core';
//Llamar al modulo de Angular http
import { HttpClient } from '@angular/common/http';
//Importamos la interfaz
import { User } from '../modelos/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  //Crear una propiedad donde este la ruta
  API_URI = environment.apiUrl;
  //Hacer una instancia para poder ocupar la propiedad http

  constructor(private http: HttpClient) {}

  lista() {
    return this.http.get(`${this.API_URI}/user`);
  }
  create(user: User) {
    return this.http.post(`${this.API_URI}/user`, user);
  }

  login(Usuario: String, Password: String) {
    return this.http.get(`${this.API_URI}/user/login/${Usuario}/${Password}`);
  }

  validarCorreo(Correo: String) {
    return this.http.get(`${this.API_URI}/user/email/${Correo}`);
  }
  validarUsuario(Usuario: String) {
    return this.http.get(`${this.API_URI}/user/username/${Usuario}`);
  }
}
