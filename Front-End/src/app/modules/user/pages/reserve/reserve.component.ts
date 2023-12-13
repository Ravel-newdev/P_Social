import { Component } from '@angular/core';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent {
  showSala: boolean = false
  showEquipamentos: boolean = false

  formSala(){
    this.showSala = true
    this.showEquipamentos = false
  }
  
  formEquipamentos(){
    this.showSala = false
    this.showEquipamentos = true
  }

  curso = {
    nome: '',
    modulos: [
      {
        nome: '',
        aulas: [{ nome: '', titulo: '', descricao: '', linkVideo: ''}],
      },  
    ],
  };

  adicionarModulo() {
    this.curso.modulos.push({
      nome: '',
      aulas: [{ nome: '', titulo: '', descricao: '', linkVideo: '' }],
    });
  }

  removerModulo(index: number) {
    this.curso.modulos.splice(index, 1);
  }

  adicionarAula() {
    const ultimoModulo = this.curso.modulos[this.curso.modulos.length - 1];
    if (ultimoModulo) {
      ultimoModulo.aulas.push({ nome: '', titulo: '', descricao: '', linkVideo: '' });
    }
  }


  adicionarAulaEmModulo(moduloIndex: number) {
  const modulo = this.curso.modulos[moduloIndex];
  if (modulo) {
    modulo.aulas.push({ nome: '', titulo: '', descricao: '', linkVideo: '' });
  }
}

  removerAula(moduloIndex: number, aulaIndex: number) {
    const modulo = this.curso.modulos[moduloIndex];
    if (modulo) {
      modulo.aulas.splice(aulaIndex, 1);
    }
  }
}
