import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { salas } from '../models/salas';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private apiUrl = environment.baseApiURL;
  constructor(private http: HttpClient) {}

  getSalas(){
      return this.http.get<any>(`${this.apiUrl}/salas/view`)
  }

  cadastrarSala(sala: salas): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/salas/create`, sala)
  }

  atualizarSala(sala: salas): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/salas/update/`, sala);
  }

  excluirSala(sala: salas): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/salas/delete/`, sala);
  }
}
