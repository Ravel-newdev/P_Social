import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { CreateRoomComponent } from './pages/create-room/create-room.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateRoomComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class UserModule { }
