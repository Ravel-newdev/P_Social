// equipamento.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';  // Importe o serviço de autenticação
import { equip } from '../models/equip';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EquipamentoService {
  private apiUrl = environment.baseApiURL;

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Função privada para adicionar o token à requisição
  private addTokenToRequest(req: any): any {
    const authToken = this.authService.getToken();

    if (authToken) {
      return req.clone({
        setHeaders: { Authorization: `Bearer ${authToken}` },
      });
    }

    return req;
  }

  pegarEquip(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/equip/view`, {
      headers: { Authorization: `Bearer ${this.authService.getToken()}` },
    });
  }

  cadastrarEquip(equipamento: equip): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/equip/add_equip`,
      equipamento,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } }
    );
  }

  atualizarEquip(equipamento: equip): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/equip/attEquip/`,
      equipamento,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } }
    );
  }

  excluirEquip(equipamento: equip): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/equip/deleteEquip/`,
      equipamento,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } }
    );
  }
}
