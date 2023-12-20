import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { reserva_equip } from 'src/app/models/reserva_equips';
import { reservas_salas } from 'src/app/models/reserva_salas';
import { reservas_salas2 } from 'src/app/models/reserva_salas2';
import { ReserveService } from 'src/app/services/reserve.service';

@Component({
  selector: 'app-view-reserve',
  templateUrl: './view-reserve.component.html',
  styleUrls: ['./view-reserve.component.css'],
})
export class ViewReserveComponent {
  salas: reservas_salas[] = [];
  equip: reserva_equip[] = [];
  selectedReserva: reserva_equip | null = null;
  reservaId: string = '';

  constructor(private reserveService: ReserveService, private activeroute: ActivatedRoute) {}

  ngOnInit(): void {
    this.carregarReservas();
    this.activeroute.params.subscribe(params => {
   this.reservaId = params['cod_reserva']
    });
  }

  carregarReservas(): void {
     this.reserveService.getReservaSala(this.reservaId).subscribe(
      (data: reservas_salas[]) => {
        this.salas = data;
      },
      (error) => {
        console.error('Erro ao carregar reservas:', error);
        // Trate o erro, exiba uma mensagem ao usuário, etc.
      }
    );


    /* this.reserveService.getReservasEquipamentos().subscribe(
      (data: reserva_equip[]) => {
        console.log(data);
        this.equip = data;
      },
      (error) => {
        console.error('Erro ao carregar reservas:', error);
      }
    ); */
  }
}
