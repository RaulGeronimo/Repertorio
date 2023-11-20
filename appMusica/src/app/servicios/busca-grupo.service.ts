import { Injectable } from '@angular/core';
//Llamar al modulo de Angular http
import { HttpClient } from '@angular/common/http';
//Variable
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BuscaGrupoService {
  //Crear una propiedad donde este la ruta
  API_URI = environment.apiUrl;
  //Hacer una instancia para poder ocupar la propiedad http

  constructor(private http: HttpClient) {}

  getGrupo(idGrupo: String) {
    return this.http.get(`${this.API_URI}/buscaGrupo/${idGrupo}`);
  }
}
