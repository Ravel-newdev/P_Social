import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { reserva_equip } from 'src/app/models/reserva_equips';
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
  id_rota: string = '';
  nome_rota: string = '';
  reservationType: string = '';

  success: boolean = false;
  errorCad: boolean = false;

  dataAtual: string = new Date().toISOString().split('T')[0];
  horaAtual: string = '';
  horaMinima: string = '07:20';
  horaMaxima: string = '16:50';

  equipamentos: any[] = [];

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id_rota = params['id'];
      this.nome_rota = params['name'];
    });
  
    this.route.data.subscribe(data => {
      this.reservationType = data['type']; // Obtendo o tipo de reserva
    });
  
    if (this.id_rota && this.nome_rota && this.reservationType) {
      if (this.reservationType === 'room') {
        this.reservaRoomForm.patchValue({
          cod_sala: this.nome_rota
        });
        this.formSala()
      } else if (this.reservationType === 'equip') {
        this.reservaEquipamentoForm.patchValue({
          cod_equip: this.nome_rota
        });
        this.formEquipamentos()
      }
    }
  }
  

  constructor(
    private formBuilder: FormBuilder,
    public popupService: PopupService,
    private reserveService: ReserveService,
    private route: ActivatedRoute
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
      cod_equip: [''],
      qnt_equip: [''],
      date_reserva: [''],
      hora_reserva: [''],
      date_entrega: [''],
      hora_entrega: [''],
      cod_user: [''],
      desc: [''],

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

  formatarData(event: Event,  campo: string): void {
    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    if (valor.length > 8) {
      valor = valor.slice(0, 8); // Limita o tamanho máximo da data
    }
    if (valor.length > 4) {
      valor = valor.replace(/^(\d{2})(\d{2})(\d{0,4})/, '$1/$2/$3'); // Aplica a máscara DD/MM/AAAA
    } else if (valor.length > 2) {
      valor = valor.replace(/^(\d{2})(\d{0,2})/, '$1/$2'); // Aplica a máscara DD/MM
    }
    this.reservaEquipamentoForm.get(campo)?.patchValue(valor); // Atualiza o valor no formulário
  }

  formatarHora(event: Event, campo: string): void {
    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    if (valor.length > 4) {
      valor = valor.slice(0, 4); // Limita o tamanho máximo da hora
    }
    if (valor.length > 2) {
      valor = valor.replace(/^(\d{2})(\d{0,2})/, '$1:$2'); // Aplica a máscara HH:MM
    }
    this.reservaEquipamentoForm.get(campo)?.patchValue(valor); // Atualiza o valor no formulário
  }

  createReserveRoom() {
    // if (this.reservaRoomForm.valid && this.nome_rota != null) {
      
    // }

    if(this.reservaRoomForm.valid && this.nome_rota == null){
      const reservaData: reservas_salas= {
        cod_sala: this.reservaRoomForm.get('cod_sala')!.value,
        cod_user: this.reservaRoomForm.get('cod_user')!.value,
        date_entrega: this.reservaRoomForm.get('date_entrega')!.value,
        date_reserv: this.reservaRoomForm.get('date_reserv')!.value,
        desc: this.reservaRoomForm.get('desc')!.value,
        hora_entrega: this.reservaRoomForm.get('hora_entrega')!.value,
        hora_reserva: this.reservaRoomForm.get('hora_reserva')!.value
      };

      this.reserveService.createReservaSala(reservaData).subscribe(
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
    if(this.reservaEquipamentoForm.valid){
      const reservaEquip: reserva_equip = {
        cod_equip: this.reservaEquipamentoForm.get('cod_equip')!.value,
        cod_user: this.reservaEquipamentoForm.get('cod_user')!.value,
        date_entrega: this.reservaEquipamentoForm.get('date_entrega')!.value,
        date_reserva: this.reservaEquipamentoForm.get('date_reserva')!.value,
        desc: this.reservaEquipamentoForm.get('desc')!.value,
        hora_entrega: this.reservaEquipamentoForm.get('hora_entrega')!.value,
        hora_reserva: this.reservaEquipamentoForm.get('hora_reserva')!.value,
        qnt_equip: this.reservaEquipamentoForm.get('qnt_equip')!.value
      }
       this.reserveService.createReservaEquip(reservaEquip)
       this.success = true;
       this.errorCad = false;
       this.popupService.addMessage('Equipamento reservado com sucesso!');
    } else {
      this.success = false;
      this.errorCad = true;
      this.popupService.addMessage('Preencha todos os campos corretamente!');
    }
  }
}
