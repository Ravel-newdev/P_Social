import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopupService } from 'src/app/services/popup.service';

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
    public popupService: PopupService
  ) {
    this.reservaRoomForm = this.formBuilder.group({
      nomeSala: ['',[Validators.required]],
      diaReserva: ['',[Validators.required]],
      horarioReserva: ['',[Validators.required]],
      diaEntrega: ['',[Validators.required]],
      horarioEntrega:['',[Validators.required]],
      motivoReserva:['',[Validators.required]]
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
      const horarioReserva = this.reservaRoomForm.get('horarioReserva')?.value;
      const horarioEntrega = this.reservaRoomForm.get('horarioEntrega')?.value;
      const diaReserva = this.reservaRoomForm.get('diaReserva')?.value;
      const diaEntrega = this.reservaRoomForm.get('diaEntrega')?.value;

      if (horarioReserva > horarioEntrega) {
        this.success = false;
        this.errorCad = true;
        this.popupService.addMessage('O horário de entrega não pode ser menor que o de reserva!');
      } else {
        this.success = true;
        this.errorCad = false;
        this.popupService.addMessage('Sala reservada com sucesso!');
      }

      if(diaReserva > diaEntrega){
        this.success = false;
        this.errorCad = true;
        this.popupService.addMessage('O dia de entrega não pode ser menor que o de reserva!');
      } else{
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

  createReserveEquipamento(){

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
}
