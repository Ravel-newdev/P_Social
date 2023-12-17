import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { CreateRoomComponent } from './pages/create-room/create-room.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReserveComponent } from './pages/reserve/reserve.component';
import { ViewReserveComponent } from './pages/view-reserve/view-reserve.component';


@NgModule({
  declarations: [
    CreateRoomComponent,
    ReserveComponent,
    ViewReserveComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UserModule { }
