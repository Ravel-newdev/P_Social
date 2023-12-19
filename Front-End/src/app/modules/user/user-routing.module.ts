// user-routing.module.ts

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
import { AdminGuard } from 'src/app/guards/admin.guard';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [

  {
    path: '',
    component: DashboardComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', component: HomeComponent },
      { path: 'relation-rooms', component: RelationRoomsComponent },
      {
        path: 'relation-rooms/view-reserve/:id',
        component: ViewReserveComponent,
      },
      { path: 'view-rooms/reserve/:id/:name', component: ReserveComponent,  data: { type: 'room' } // Adicionando um segmento adicional de dados
     },
      { path: 'view-equips/reserve/:id/:name', component: ReserveComponent, data: { type: 'equip' }  },
      { path: 'create-rooms', component: CreateRoomComponent },
      { path: 'create-equipamento', component: CreateEquipamentoComponent },
      { path: 'reserve', component: ReserveComponent },
      { path: 'view-rooms', component: ViewRoomsComponent },
      { path: 'view-equips', component: ViewEquipsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
