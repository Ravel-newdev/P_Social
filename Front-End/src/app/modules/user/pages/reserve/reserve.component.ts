import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  showHoraReserva: boolean = false;
  showHoraEntrega: boolean = false;

  dataAtual: string = new Date().toISOString().split('T')[0];
  horaAtual: string = '';
  horaMinima: string = '07:20';
  horaMaxima: string = '16:50';


  ngOnInit(): void {
  }

  constructor(
    private formBuilder: FormBuilder,
    public popupService: PopupService,
    private reserveService: ReserveService
  ) {
    this.reservaRoomForm = this.formBuilder.group({
      nomeSala: ['', Validators.required],
      diaReserva: ['', Validators.required],
      horarioReserva: ['', Validators.required],
      diaEntrega: ['', Validators.required],
      horarioEntrega: ['', Validators.required],
      motivoReserva: ['', Validators.required]
    });

    this.reservaEquipamentoForm = this.formBuilder.group({
      nomeEquipamento: ['', Validators.required],
      quantidadeEquipamento: ['', Validators.required],
      dataReservaEquipamento: ['', Validators.required],
      horarioReservaEquipamento: ['', Validators.required],
      dataEntregaEquipamento: ['', Validators.required],
      horarioEntregaEquipamento: ['', Validators.required],
    });

    const dataAtual = new Date();
    let horas: number | string = dataAtual.getHours();
    let minutos: number | string = dataAtual.getMinutes();

    horas = horas < 10 ? '0' + horas : horas;
    minutos = minutos < 10 ? '0' + minutos : minutos;

    this.horaAtual = `${horas}:${minutos}`;
  }


  toggleHoraReserva(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.showHoraReserva = !!value;
  }

  toggleHoraEntrega(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.showHoraEntrega = !!value;
  }

  formSala() {
    this.showSala = true;
    this.showEquipamentos = false;
  }

  formEquipamentos() {
    this.showSala = false;
    this.showEquipamentos = true;
  }

  equipamentos: any[] = [
    {
      nomeEquipamento: '',
      quantidade: 0,
      dataReserva: '',
      horarioReserva: '',
      dataEntrega: '',
      horarioEntrega: '',
    },
  ];

  adicionarEquipamento() {
    this.equipamentos.push({
      nomeEquipamento: '',
      quantidade: 0,
      dataReserva: '',
      horarioReserva: '',
      dataEntrega: '',
      horarioEntrega: '',
    });
  }

  removerEquipamento(index: number) {
    this.equipamentos.splice(index, 1);
  }

  createReserveRoom() {
    if (this.reservaRoomForm.valid) {
      const reservaData = this.reservaRoomForm.value as reservas_salas;

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
    if (this.reservaEquipamentoForm.valid) {
      const horarioReserva = this.reservaRoomForm.get('horarioReservaEquipamento')?.value;
      const horarioEntrega = this.reservaRoomForm.get('horarioEntregaEquipamento')?.value;
      const diaReserva = this.reservaRoomForm.get('dataReservaEquipamento')?.value;
      const diaEntrega = this.reservaRoomForm.get('dataEntregaEquipamento')?.value;

      if (diaReserva == diaEntrega) {
        if (horarioReserva > horarioEntrega) {
          this.success = false;
          this.errorCad = true;
          this.popupService.addMessage('O horário de entrega não pode ser menor que o de reserva!');
        } else {
          this.success = true;
          this.errorCad = false;
          this.popupService.addMessage('Sala reservada com sucesso!');
        }
      } else if (diaReserva > diaEntrega) {
        this.success = false;
        this.errorCad = true;
        this.popupService.addMessage('O dia de entrega não pode ser menor que o de reserva!');
      } else {
        this.success = true;
        this.errorCad = false;
        this.popupService.addMessage('Sala reservada com sucesso!');
      }

    } else {
      this.success = false;
      this.errorCad = true;
      this.popupService.addMessage('Preencha todos os campos corretamente!');
    }
  }




  get nome_sala(){
    return this.reservaRoomForm.get('nomeSala')!;
  }

  get dia_reserva(){
    return this.reservaRoomForm.get('diaReserva')!;
  }

  get horario_reserva(){
    return this.reservaRoomForm.get('horarioReserva')!;
  }

  get dia_entrega(){
    return this.reservaRoomForm.get('diaEntrega')!;
  }

  get horario_entrega(){
    return this.reservaRoomForm.get('horarioReserva')!;
  }

  get motivo_reserva(){
    return this.reservaRoomForm.get('motivoReserva')!;
  }
  get nome_equipamento() {
    return this.reservaEquipamentoForm.get('nomeEquipamento')!;
  }

  get qntd_equipamento() {
    return this.reservaEquipamentoForm.get('quantidadeEquipamento')!;
  }

  get dia_reserva_equipamento() {
    return this.reservaEquipamentoForm.get('dataReservaEquipamento')!;
  }

  get horario_reserva_equipamento() {
    return this.reservaEquipamentoForm.get('horarioReservaEquipamento')!;
  }

  get dia_entrega_equipamento() {
    return this.reservaEquipamentoForm.get('dataEntregaEquipamento')!;
  }

  get horario_entrega_equipamento() {
    return this.reservaEquipamentoForm.get('horarioEntregaEquipamento')!;
  }

}
