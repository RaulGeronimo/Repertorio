import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuditoriaService {
  API_URI = environment.apiUrl;
  constructor(private http:HttpClient) { }

  getLista(){
    return this.http.get(`${this.API_URI}/auditoria`);
  }
}
