// view-rooms.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { salas_2 } from 'src/app/models/salas_2';
import { PopupService } from 'src/app/services/popup.service';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-view-rooms',
  templateUrl: './view-rooms.component.html',
  styleUrls: ['./view-rooms.component.css']
})
export class ViewRoomsComponent implements OnInit {
  salas: salas_2[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 3;
  success: boolean = false;
  errorCad: boolean = false;

  constructor(private roomService: RoomService, private router: Router, public popupService: PopupService) {}

  ngOnInit(): void {
    this.carregarSalas();
  }

  carregarSalas(): void {
    this.roomService.getSalas().subscribe(
      (data: any) => {
        this.salas = data.map((sala: any) => ({
          _id: sala._id,
          nome: sala.nome,
          status: this.getStatusLabel(sala.status),
          codigo: sala.codigo
        }));
        console.log(this.salas);
      },
      (error) => {
        console.error('Erro ao carregar salas:', error);
      }
    );
  }

  excluirSala(sala: salas_2): void {
    if (sala._id) {
      this.roomService.excluirSala(sala._id).subscribe(
        () => {

          this.carregarSalas();
          this.success = true;
          this.errorCad = false;
          this.popupService.addMessage('Sala deletada com sucesso!');
        },
        (error) => {
          this.success = false;
          this.errorCad = true;
          this.popupService.addMessage('Erro ao deletar sala!');
          console.error('Erro ao deletar sala:', error);
        }
      );
    } else {
      console.error('ID da sala não encontrado para exclusão.');
    }
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
