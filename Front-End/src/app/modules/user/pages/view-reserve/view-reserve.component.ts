import { Component } from '@angular/core';
import { reservas_salas } from 'src/app/models/reserva_salas';
import { ReserveService } from 'src/app/services/reserve.service';

@Component({
  selector: 'app-view-reserve',
  templateUrl: './view-reserve.component.html',
  styleUrls: ['./view-reserve.component.css']
})
export class ViewReserveComponent {
  salas: reservas_salas[] = [];

  constructor(private reserveService: ReserveService) { }

  ngOnInit(): void {
    this.carregarReservas();
  }

  carregarReservas(): void {
    this.reserveService.getReservasSalas().subscribe(
      (data: reservas_salas[]) => {
        this.salas = data;
      },
      (error) => {
        console.error('Erro ao carregar reservas:', error);
        // Trate o erro, exiba uma mensagem ao usuário, etc.
      }
    );
  }
}
