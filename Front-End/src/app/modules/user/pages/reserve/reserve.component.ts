import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { reservas_salas } from 'src/app/models/reserva_salas';
import { PopupService } from 'src/app/services/popup.service';
import { ReserveService } from 'src/app/services/reserve.service';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css'],
})
export class ReserveComponent implements OnInit {
  showSala: boolean = false;
  showEquipamentos: boolean = false;
  reservaRoomForm!: FormGroup;
  reservaEquipamentoForm!: FormGroup;

  success: boolean = false;
  errorCad: boolean = false;

  dataAtual: string = new Date().toISOString().split('T')[0];
  horaAtual: string = '';
  horaMinima: string = '07:20';
  horaMaxima: string = '16:50';

  // Array para armazenar as reservas de equipamentos
  equipamentos: any[] = [];

  ngOnInit(): void {}

  constructor(
    private formBuilder: FormBuilder,
    public popupService: PopupService,
    private reserveService: ReserveService
  ) {
    this.reservaRoomForm = this.formBuilder.group({
      cod_sala: [''],
      date_reserv: [''],
      hora_reserva: [''],
      date_entrega: [''],
      hora_entrega: [''],
      desc: [''],
      cod_user: [''],
    });

    this.reservaEquipamentoForm = this.formBuilder.group({
      nomeEquipamento: [''],
      quantidadeEquipamento: [''],
      dataReservaEquipamento: [''],
      horarioReservaEquipamento: [''],
      dataEntregaEquipamento: [''],
      horarioEntregaEquipamento: [''],
    });
  }



  formSala() {
    this.showSala = true;
    this.showEquipamentos = false;
  }

  formEquipamentos() {
    this.showSala = false;
    this.showEquipamentos = true;
  }

  adicionarEquipamento() {
    // Coleta as informações do formulário de equipamentos
    const equipamentoData = this.reservaEquipamentoForm.value;

    // Adiciona as informações ao array
    this.equipamentos.push(equipamentoData);

    // Limpa o formulário
    this.reservaEquipamentoForm.reset();
  }

  removerEquipamento(index: number) {
    this.equipamentos.splice(index, 1);
  }

  createReserveRoom() {
    if (this.reservaRoomForm.valid) {
      const reservaData: reservas_salas[] = [
        // Aqui você pode adicionar lógica para coletar os dados do formulário de sala
        // e adicioná-los ao array
      ];

      this.reserveService.createReservaSala(reservaData[0]).subscribe(
        (response) => {
          this.success = true;
          this.errorCad = false;
          this.popupService.addMessage('Sala reservada com sucesso!');
          this.reservaRoomForm.reset();
        },
        (error) => {
          this.success = false;
          this.errorCad = true;
          this.popupService.addMessage('Ocorreu um erro ao reservar a sala.');
          console.error(error);
        }
      );
    } else {
      this.success = false;
      this.errorCad = true;
      this.popupService.addMessage('Preencha todos os campos corretamente!');
    }
  }

  createReserveEquipamento() {
    if (this.equipamentos.length > 0) {
      // Lógica para processar as reservas de equipamentos
      console.log('Reservas de Equipamentos:', this.equipamentos);

      // Limpa o array de equipamentos
      this.equipamentos = [];

      // Limpa o formulário
      this.reservaEquipamentoForm.reset();
    } else {
      this.success = false;
      this.errorCad = true;
      this.popupService.addMessage('Adicione pelo menos um equipamento!');
    }
  }
}
