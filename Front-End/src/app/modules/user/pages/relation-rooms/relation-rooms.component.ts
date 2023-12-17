import { Component } from '@angular/core';
import { reserva_equip } from 'src/app/models/reserva_equips';
import { reservas_salas } from 'src/app/models/reserva_salas';
import { Router } from '@angular/router';

@Component({
  selector: 'app-relation-rooms',
  templateUrl: './relation-rooms.component.html',
  styleUrls: ['./relation-rooms.component.css'],
})
export class RelationRoomsComponent {
  angle: boolean = false;
  selectedRoom: string = 'all';
  currentPage: number = 1;
  itemsPerPage: number = 3;

  constructor(private router: Router) {}

  equip: reserva_equip[] = [
    {
      cod_equip: 'equip1',
      cod_user: 'João',
      desc: 'Porque eu quero',
      data_reserva: '14/12/2023',
      hora_reserva: '10:00',
      data_entrega: '14/12/2023',
      hora_entrega: '12:00', 
      qnt_equip: 12
    },
    {
      cod_equip: 'equip2',
      cod_user: 'Maria',
      desc: 'Porque eu quero',
      data_reserva: '15/12/2023',
      hora_reserva: '14:00',
      data_entrega: '15/12/2023',
      hora_entrega: '16:00',
      qnt_equip: 12
    },
    {
      cod_equip: 'equip2',
      cod_user: 'Maria',
      desc: 'Porque eu quero',
      data_reserva: '15/12/2023',
      hora_reserva: '14:00',
      data_entrega: '15/12/2023',
      hora_entrega: '16:00',
      qnt_equip: 12
    },
    {
      cod_equip: 'equip2',
      cod_user: 'Maria',
      desc: 'Porque eu quero',
      data_reserva: '15/12/2023',
      hora_reserva: '14:00',
      data_entrega: '15/12/2023',
      hora_entrega: '16:00',
      qnt_equip: 12
    },
    {
      cod_equip: 'equip2',
      cod_user: 'Maria',
      desc: 'Porque eu quero',
      data_reserva: '15/12/2023',
      hora_reserva: '14:00',
      data_entrega: '15/12/2023',
      hora_entrega: '16:00',
      qnt_equip: 12
    },
    {
      cod_equip: 'equip2',
      cod_user: 'Maria',
      desc: 'Porque eu quero',
      data_reserva: '15/12/2023',
      hora_reserva: '14:00',
      data_entrega: '15/12/2023',
      hora_entrega: '16:00',
      qnt_equip: 12
    },
  ];

  salas: reservas_salas[] = [
    {
      cod_sala: 'auditório',
      cod_user: 'Elizabeth',
      desc: 'porque eu que mando',
      data_reserva: '14/12/2023',
      hora_reserva: '08:00',
      data_entrega: '14/12/2023',
      hora_entrega: '15:00'
    },
    {
      cod_sala: 'auditório',
      cod_user: 'Elizabeth',
      desc: 'porque eu que mando',
      data_reserva: '14/12/2023',
      hora_reserva: '08:00',
      data_entrega: '14/12/2023',
      hora_entrega: '15:00'
    },
    {
      cod_sala: 'auditório',
      cod_user: 'Elizabeth',
      desc: 'porque eu que mando',
      data_reserva: '14/12/2023',
      hora_reserva: '08:00',
      data_entrega: '14/12/2023',
      hora_entrega: '15:00'
    },
    {
      cod_sala: 'auditório',
      cod_user: 'Elizabeth',
      desc: 'porque eu que mando',
      data_reserva: '14/12/2023',
      hora_reserva: '08:00',
      data_entrega: '14/12/2023',
      hora_entrega: '15:00'
    },
    {
      cod_sala: 'auditório',
      cod_user: 'Alexandre',
      desc: 'porque eu quero',
      data_reserva: '12/12/2023',
      hora_reserva: '15:00',
      data_entrega: '13/12/2023',
      hora_entrega: '15:00'
    }
  ];

  get filteredSalas(): reservas_salas[] {
    if (this.selectedRoom === 'room1') {
      return this.salas;
    } else {
      return [];
    }
  }

  get filteredEquipamentos(): reserva_equip[] {
    if (this.selectedRoom === 'room2') {
      return this.equip;
    } else {
      return [];
    }
  }

  get totalPages() {
    return Math.ceil(this.selectedRoom === 'room1' ? this.salas.length / this.itemsPerPage : this.equip.length / this.itemsPerPage);
  }

  get pages() {
    return new Array(this.totalPages).fill(0).map((_, index) => index + 1);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  setPage(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  ShowAngle() {
    this.angle = !this.angle;
  }
}
