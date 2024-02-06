import { Injectable } from '@angular/core';
//Llamar al modulo de Angular http
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BuscaCancionGrupoService {
  //Crear una propiedad donde este la ruta
  API_URI = environment.apiUrl;
  //Hacer una instancia para poder ocupar la propiedad http

  constructor(private http: HttpClient) {}

  getCancion(idGrupo: String) {
    return this.http.get(`${this.API_URI}/buscaCancion_Grupo/${idGrupo}`);
  }
}
