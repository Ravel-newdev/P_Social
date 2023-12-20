import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { reservas_salas } from 'src/app/models/reserva_salas';
import { reserva_equip } from 'src/app/models/reserva_equips';
import { ReserveService } from 'src/app/services/reserve.service';
import { EMPTY } from 'rxjs';

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
  reservasSalas: reservas_salas[] = [];
  reservasEquipamentos: reserva_equip[] = [];

  constructor(private router: Router, private reservasService: ReserveService) {}

  ngOnInit(): void {
    this.carregarReservas();
  }

  carregarReservas(): void {
    this.reservasService.getReservasSalas().subscribe(
      (reservas: reservas_salas[]) => {
        this.reservasSalas = reservas;
        console.log(reservas)
      },
      (error) => {
        console.error('Erro ao carregar reservas de salas:', error);
      }
    );

    this.reservasService.getReservasEquipamentos().subscribe(
      (reservas: reserva_equip[]) => {
        this.reservasEquipamentos = reservas;
        console.log(reservas)
      },
      (error) => {
        console.error('Erro ao carregar reservas de equipamentos:', error);
      }
    );
  }

  get filteredReservas(): any[] {
    if(this.selectedRoom === 'room1')
    {return this.reservasSalas;
    }else if(this.selectedRoom === 'room2'){
      return this.reservasEquipamentos;
    }
    else{
      return [];
    }

  }

  get totalPages() {
    return Math.ceil(this.filteredReservas.length / this.itemsPerPage);
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
