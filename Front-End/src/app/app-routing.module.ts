import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RelationRoomsComponent } from './modules/user/pages/relation-rooms/relation-rooms.component';

const routes: Routes = [
  {path: '', pathMatch: 'full',redirectTo: 'auth/login'},
  {path: 'relation-rooms', component: RelationRoomsComponent},
  {path: 'auth/login', component: LoginComponent},
  {path: 'user', loadChildren: () => import('./modules/user/user.module').then((m) => m.UserModule)}
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
