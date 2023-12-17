import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RelationRoomsComponent } from './pages/relation-rooms/relation-rooms.component';
import { CreateRoomComponent } from './pages/create-room/create-room.component';
import { ReserveComponent } from './pages/reserve/reserve.component';
import { CreateEquipamentoComponent } from './pages/create-equipamento/create-equipamento.component';
import { ViewReserveComponent } from './pages/view-reserve/view-reserve.component';
import { ViewRoomsComponent } from './pages/view-rooms/view-rooms.component';
import { ViewEquipsComponent } from './pages/view-equips/view-equips.component';

const routes: Routes = [
  {path: '', component: DashboardComponent, pathMatch: 'full'},
  {path: '', component: DashboardComponent, children: [
    {path: 'relation-rooms', component: RelationRoomsComponent},
    {path: 'relation-rooms/view-reserve', component: ViewReserveComponent},
    {path: 'view-rooms/reserve/:id', component: ReserveComponent },
    {path: 'create-rooms', component: CreateRoomComponent},
    {path: 'create-equipamento', component: CreateEquipamentoComponent},
    {path: 'reserve', component: ReserveComponent},
    {path: 'view-rooms', component: ViewRoomsComponent},
    {path: 'view-equips', component: ViewEquipsComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
