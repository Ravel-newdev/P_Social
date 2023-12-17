import { Component } from '@angular/core';
import { reservas_salas } from 'src/app/models/reserva_salas';
import { salas } from 'src/app/models/salas';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-view-rooms',
  templateUrl: './view-rooms.component.html',
  styleUrls: ['./view-rooms.component.css']
})
export class ViewRoomsComponent {
  currentPage: number = 1;
  itemsPerPage: number = 3;
  salas: any[] = []
  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.carregarSalas();
  }

  carregarSalas(): void {
    this.roomService.getSalas().subscribe(
      (data: any) => {
        this.salas = data;  
        console.log(data)
      },
      (error) => {
        console.error('Erro ao carregar salas:', error);
      }
    );
  }

}
