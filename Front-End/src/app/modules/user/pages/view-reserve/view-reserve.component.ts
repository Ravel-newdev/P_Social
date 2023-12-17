import { Component } from '@angular/core';
import { reservas_salas } from 'src/app/models/reserva_salas';

@Component({
  selector: 'app-view-reserve',
  templateUrl: './view-reserve.component.html',
  styleUrls: ['./view-reserve.component.css']
})
export class ViewReserveComponent {
  salas: reservas_salas[] = [
    {
      cod_sala: 'AUDITÓRIO',
      cod_user: 'Elizabeth',
      desc: 'porque eu que mando',
      data_reserva: '14/12/2023',
      hora_reserva: '08:00',
      data_entrega: '14/12/2023',
      hora_entrega: '15:00'
    },]

}
