import { Injectable } from '@angular/core';
//Llamar al modulo de Angular http
import { HttpClient } from '@angular/common/http';
//Importamos la interfaz
import { Observable } from 'rxjs';
/* ENTIDAD */
import { CancionesAlbum } from '../modelos/CancionesAlbum';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CancionesAlbumService {
  //Crear una propiedad donde este la ruta
  API_URI = environment.apiUrl;
  //Hacer una instancia para poder ocupar la propiedad http

  constructor(private http: HttpClient) {}

  getCanciones() {
    return this.http.get(`${this.API_URI}/canciones_Album`);
  }

  getCancion(Codigo: String) {
    return this.http.get(`${this.API_URI}/canciones_Album/${Codigo}`);
  }

  create(cancion: CancionesAlbum) {
    return this.http.post(`${this.API_URI}/canciones_Album`, cancion);
  }

  delete(Codigo: string) {
    return this.http.delete(`${this.API_URI}/canciones_Album/${Codigo}`);
  }

  update(Codigo: string, update: CancionesAlbum): Observable<CancionesAlbum> {
    return this.http.put(`${this.API_URI}/canciones_Album/${Codigo}`, update);
  }
}
