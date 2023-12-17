import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { CreateRoomComponent } from './pages/create-room/create-room.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReserveComponent } from './pages/reserve/reserve.component';
import { CreateEquipamentoComponent } from './pages/create-equipamento/create-equipamento.component';


@NgModule({
  declarations: [
    CreateRoomComponent,
    ReserveComponent,
    CreateEquipamentoComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UserModule { }
