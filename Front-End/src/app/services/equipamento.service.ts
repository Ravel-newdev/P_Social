import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { equip } from '../models/equip';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EquipamentoService {
  private apiUrl = environment.baseApiURL;

  constructor(private http: HttpClient) {}
  cadastrarEquip(equipamento: equip): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/equip/add_equip`, equipamento)
  }

  atualizarEquip(equipamento: equip): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/equip/attEquip/`, equipamento);
  }

  excluirEquip(equipamento: equip): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/equip/deleteEquip/`, equipamento);
  }
}
