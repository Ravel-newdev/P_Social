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
  reservaForm!: FormGroup;

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
    this.reservaForm = this.formBuilder.group({
      nomeSala: [''],
      diaReserva: [''],
      horarioReserva: [''],
      diaEntrega: [''],
      horarioEntrega:[''],
      motivoReserva:['']
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
}
