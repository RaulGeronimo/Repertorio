import { Injectable } from '@angular/core';
//Llamar al modulo de Angular http
import { HttpClient } from '@angular/common/http';
//Importamos la interfaz
import { Observable } from 'rxjs';
import { Disquera } from '../modelos/Disquera';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DisqueraService {
  //Crear una propiedad donde este la ruta
  API_URI = environment.apiUrl;
  //Hacer una instancia para poder ocupar la propiedad http

  constructor(private http: HttpClient) {}

  getDisqueras() {
    return this.http.get(`${this.API_URI}/disquera`);
  }

  getDisquera(idDisquera: String) {
    return this.http.get(`${this.API_URI}/disquera/${idDisquera}`);
  }

  create(disquera: Disquera) {
    return this.http.post(`${this.API_URI}/disquera`, disquera);
  }

  delete(idDisquera: string, Usuario: string) {
    return this.http.delete(`${this.API_URI}/disquera/${idDisquera}/${Usuario}`);
  }

  update(idDisquera: string, update: Disquera): Observable<Disquera> {
    return this.http.put(`${this.API_URI}/disquera/${idDisquera}`, update);
  }
}
