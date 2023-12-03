import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
    cards = [
      {
        nome: 'Reservar Salas',
        icone: 'fa-book'
      },
      {
        nome: 'Reservar Equipamentos',
        icone: 'fa-pen'
      },
      {
        nome: 'Relação Reservas',
        icone: 'fa-user'
      },
      {
        nome: 'Relação Equipamentos',
        icone: 'fa-pen'
      },
      {
        nome: 'Cadastrar Sala',
        icone: 'fa-table'
      },
      {
        nome: 'Cadastrar Equipamento',
        icone: 'fa-pen'
      },
    ]
}
