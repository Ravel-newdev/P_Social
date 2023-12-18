// equipamento.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { equip } from '../models/equip';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EquipamentoService {
  private apiUrl = environment.baseApiURL;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const authToken = this.authService.getToken();
    return new HttpHeaders({ Authorization: `Bearer ${authToken}` });
  }

  private handleError(error: any) {
    console.error('Erro na requisição:', error);
    return throwError('Erro ao processar a requisição. Tente novamente.');
  }

  pegarEquip(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/equip/view`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  cadastrarEquip(equipamento: equip): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/equip/create`, equipamento, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  atualizarEquip(equipamento: equip): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/equip/attEquip/`, equipamento, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  excluirEquip(equipamento: equip): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/equip/deleteEquip/`, equipamento, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }
}
