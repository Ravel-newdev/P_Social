import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RelationRoomsComponent } from './pages/relation-rooms/relation-rooms.component';
import { CreateRoomComponent } from './pages/create-room/create-room.component';
import { ReserveComponent } from './pages/reserve/reserve.component';

const routes: Routes = [
  {path: '', component: DashboardComponent, children: [
    {path: 'relation-rooms', component: RelationRoomsComponent},
    {path: 'reserve', component: ReserveComponent },
    {path: 'create-rooms', component: CreateRoomComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }