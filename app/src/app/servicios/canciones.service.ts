import { Injectable } from '@angular/core';
//Llamar al modulo de Angular http
import { HttpClient } from '@angular/common/http';
//Importamos la interfaz
import { Observable } from 'rxjs';
/* ENTIDAD */
import { Cancion } from '../modelos/Canciones';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CancionesService {
  //Crear una propiedad donde este la ruta
  API_URI = environment.apiUrl;
  //Hacer una instancia para poder ocupar la propiedad http

  constructor(private http: HttpClient) {}

  getCanciones() {
    return this.http.get(`${this.API_URI}/canciones`);
  }

  getCancion(idCancion: String) {
    return this.http.get(`${this.API_URI}/canciones/${idCancion}`);
  }

  create(cancion: Cancion) {
    return this.http.post(`${this.API_URI}/canciones`, cancion);
  }

  delete(idCancion: string, Usuario: string) {
    return this.http.delete(`${this.API_URI}/canciones/${idCancion}/${Usuario}`);
  }

  update(idCancion: string, update: Cancion): Observable<Cancion> {
    return this.http.put(`${this.API_URI}/canciones/${idCancion}`, update);
  }
}
