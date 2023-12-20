
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
  canEdit: boolean = false;
  reservaOriginal: reservas_salas | null = null;

  constructor(private reserveService: ReserveService, private activeroute: ActivatedRoute) {}

  ngOnInit(): void {
    this.carregarReservas();
    this.activeroute.params.subscribe(params => {
   this.reservaId = params['cod_reserva']
    });
  }

  carregarReservas(): void {
     this.reserveService.getReservasSalas().subscribe(
      (data: reservas_salas[]) => {
        this.salas = data;
        console.log(data);
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

  alterarReserva(){

  }

  habilitarEdicao(sala: reservas_salas): void {
    this.canEdit = true;
    this.reservaOriginal = { ...sala }; // Cria uma cópia da reserva original para uso no cancelamento
  }

  salvarEdicaoSala(sala: reservas_salas): void {

    this.reserveService.atualizarReservaSala(sala).subscribe(
      (response) => {
        // Atualização bem-sucedida, adicione lógica para feedback ao usuário se necessário
        console.log('Reserva de sala atualizada:', response);
        this.canEdit = false; // Desabilita o modo de edição
      },
      (error) => {
        // Trate os erros durante a atualização, como exibir mensagens de erro
        console.error('Erro ao atualizar a reserva de sala:', error);
      }
    );
  }

  cancelarEdicao(sala: reservas_salas): void {
    // Restaura os valores originais da reserva
    if (this.reservaOriginal) {
      Object.assign(sala, this.reservaOriginal);
      this.reservaOriginal = null;
    }
    this.canEdit = false;
  }

}
