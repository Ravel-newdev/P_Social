import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { salas } from '../models/salas';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';  // Importe seu serviço de autenticação

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private apiUrl = environment.baseApiURL;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private addAuthorizationHeader(): HttpHeaders {
    const authToken = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
  }

  getSalas(): Observable<any> {
    const headers = this.addAuthorizationHeader();
    return this.http.get<any>(`${this.apiUrl}/salas/view`, { headers });
  }

  cadastrarSala(sala: salas): Observable<any> {
    const headers = this.addAuthorizationHeader();
    return this.http.post<any>(`${this.apiUrl}/salas/create`, sala, { headers });
  }

  atualizarSala(sala: salas): Observable<any> {
    const headers = this.addAuthorizationHeader();
    return this.http.put<any>(`${this.apiUrl}/salas/update/`, sala, { headers });
  }

  excluirSala(sala: salas): Observable<any> {
    const headers = this.addAuthorizationHeader();
    return this.http.put<any>(`${this.apiUrl}/salas/delete/`, sala, { headers });
  }
}
