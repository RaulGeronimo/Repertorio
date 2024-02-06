import { Injectable } from '@angular/core';
//Llamar al modulo de Angular http
import { HttpClient } from '@angular/common/http';
//Importamos la interfaz
import { Observable } from 'rxjs';
/* ENTIDAD */
import { Instrumento_Artista } from '../modelos/InstrumentoArtista';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InstrumentoArtistaService {
  //Crear una propiedad donde este la ruta
  API_URI = environment.apiUrl;
  //Hacer una instancia para poder ocupar la propiedad http

  constructor(private http: HttpClient) {}

  getArtistas() {
    return this.http.get(`${this.API_URI}/instrumento_Artista`);
  }

  getArtista(Codigo: String) {
    return this.http.get(`${this.API_URI}/instrumento_Artista/${Codigo}`);
  }

  create(cancion: Instrumento_Artista) {
    return this.http.post(`${this.API_URI}/instrumento_Artista`, cancion);
  }

  delete(Codigo: string) {
    return this.http.delete(`${this.API_URI}/instrumento_Artista/${Codigo}`);
  }

  update(Codigo: string, update: Instrumento_Artista): Observable<Instrumento_Artista> {
    return this.http.put(`${this.API_URI}/instrumento_Artista/${Codigo}`, update);
  }
}
