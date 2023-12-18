  import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { reservas_salas } from '../models/reserva_salas';
import { reserva_equip } from '../models/reserva_equips';
import { AuthService } from './auth.service';

  @Injectable({
    providedIn: 'root'
  })
  export class ReserveService {
    private apiUrl = environment.baseApiURL
  constructor(private http: HttpClient, private authService: AuthService) { }

  private addAuthorizationHeader(): HttpHeaders {
    const authToken = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
  }

  getReservasSalas(): Observable<any> {
    const headers = this.addAuthorizationHeader();
    return this.http.get<any>(`${this.apiUrl}/reserva_salas/view`, { headers });
  }

  getReservasEquipamentos(): Observable<any> {
    const headers = this.addAuthorizationHeader();
    return this.http.get<any>(`${this.apiUrl}/reserva_equip/view`, { headers });
  }
  }
