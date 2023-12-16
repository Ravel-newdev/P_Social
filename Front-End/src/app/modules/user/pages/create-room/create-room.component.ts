import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css'],
})
export class CreateRoomComponent implements OnInit {
  roomForm: any;
  success: boolean = false;
  errorCad: boolean = false;

  constructor(private router: Router, private formRoom: FormBuilder, public popupService: PopupService) {
    this.roomForm = this.formRoom.group({
      name_room: ['', Validators.required],
      status_room: ['', Validators.required],
    });
  }
  ngOnInit(): void {}

  createRoom() {
    if(this.roomForm.valid){
      this.success = true
      this.errorCad = false
      this.popupService.addMessage('Sala Criada com sucesso!')
    } else{
      if(this.name_room.value == "" || this.status_room.value === "Selecione"){
        this.errorCad = true
        this.success = false
        this.popupService.addMessage('Preencha todos os campos para concluir o cadastro!')
      }
    }
  }

  get name_room() {
    return this.roomForm.get('name_room')!;
  }
  get status_room() {
    return this.roomForm.get('status_room')!;
  }
}
