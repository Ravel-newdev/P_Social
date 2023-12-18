// create-room.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PopupService } from 'src/app/services/popup.service';
import { RoomService } from 'src/app/services/room.service'; // Importe o serviço RoomService
import { AuthService } from 'src/app/services/auth.service'; // Importe o serviço AuthService
import { salas } from 'src/app/models/salas';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css'],
})
export class CreateRoomComponent implements OnInit {
  roomForm: any;
  success: boolean = false;
  errorCad: boolean = false;

  constructor(
    private router: Router,
    private formRoom: FormBuilder,
    public popupService: PopupService,
    private roomService: RoomService, // Injete o serviço RoomService
    private authService: AuthService // Injete o serviço AuthService
  ) {
    this.roomForm = this.formRoom.group({
      name_room: ['', Validators.required],
      status_room: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  createRoom() {
    if (this.roomForm.valid) {
      const sala: salas = {
        nome: this.name_room.value,
        status: this.status_room.value,
      };

      this.roomService.cadastrarSala(sala).subscribe(
        (response) => {
          this.success = true;
          this.errorCad = false;
          this.popupService.addMessage('Sala criada com sucesso!');
        },
        (error) => {
          console.error('Erro ao cadastrar sala:', error);
          this.errorCad = true;
          this.success = false;
          this.popupService.addMessage('Erro ao cadastrar sala. Tente novamente.');
        }
      );
    } else {
      this.errorCad = true;
      this.success = false;
      this.popupService.addMessage('Preencha todos os campos para concluir o cadastro!');
    }
  }

  get name_room() {
    return this.roomForm.get('name_room')!;
  }

  get status_room() {
    return this.roomForm.get('status_room')!;
  }
}
