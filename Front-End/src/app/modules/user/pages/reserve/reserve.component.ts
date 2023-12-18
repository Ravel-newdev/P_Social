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
  id_equip: string = ''

  success: boolean = false;
  errorCad: boolean = false;

  dataAtual: string = new Date().toISOString().split('T')[0];
  horaAtual: string = '';
  horaMinima: string = '07:20';
  horaMaxima: string = '16:50';

  equipamentos: any[] = [];

  ngOnInit(): void {
    this.route.params.subscribe( params =>{
    this.id_equip = params['id'];
    } )
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
      desc: ['']
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
    const equipamentoData = this.reservaEquipamentoForm.value;

    this.equipamentos.push(equipamentoData);

    this.reservaEquipamentoForm.reset();
  }

  removerEquipamento(index: number) {
    this.equipamentos.splice(index, 1);
  }

  createReserveRoom() {
    if (this.reservaRoomForm.valid) {
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
    }
  }
}
