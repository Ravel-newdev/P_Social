// view-rooms.component.ts

import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-view-rooms',
  templateUrl: './view-rooms.component.html',
  styleUrls: ['./view-rooms.component.css']
})
export class ViewRoomsComponent implements OnInit {
  salas: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.carregarSalas();
  }

  carregarSalas(): void {
    this.roomService.getSalas().subscribe(
      (data: any) => {
        this.salas = data.map((sala: any) => ({
          nome: sala.nome,
          status: this.getStatusLabel(sala.status),
        }));
        console.log(this.salas);
      },
      (error) => {
        console.error('Erro ao carregar salas:', error);
      }
    );
  }

  getStatusLabel(status: string): string {
    return status === 'A' ? 'Ativo' : 'Inativo';
  }

  getTotalPages(): number {
    return Math.ceil(this.salas.length / this.itemsPerPage);
  }

  getPages(): number[] {
    const totalPages = this.getTotalPages();
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  setPage(page: number): void {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
    }
  }

  previousPage(): void {
    this.setPage(this.currentPage - 1);
  }

  nextPage(): void {
    this.setPage(this.currentPage + 1);
  }
}
