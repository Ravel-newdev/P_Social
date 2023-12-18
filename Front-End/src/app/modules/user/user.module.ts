import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { CreateRoomComponent } from './pages/create-room/create-room.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReserveComponent } from './pages/reserve/reserve.component';
import { CreateEquipamentoComponent } from './pages/create-equipamento/create-equipamento.component';
import { ViewReserveComponent } from './pages/view-reserve/view-reserve.component';
import { ViewRoomsComponent } from './pages/view-rooms/view-rooms.component';
import { ViewEquipsComponent } from './pages/view-equips/view-equips.component';


@NgModule({
  declarations: [
    CreateRoomComponent,
    ReserveComponent,
    CreateEquipamentoComponent,
    ViewReserveComponent,
    ViewRoomsComponent,
    ViewEquipsComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UserModule { }
