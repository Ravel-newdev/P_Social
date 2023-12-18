// create-equipamento.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PopupService } from 'src/app/services/popup.service';
import { EquipamentoService } from 'src/app/services/equipamento.service'; // Importe o serviço EquipamentoService
import { AuthService } from 'src/app/services/auth.service'; // Importe o serviço AuthService
import { equip } from 'src/app/models/equip';

@Component({
  selector: 'app-create-equipamento',
  templateUrl: './create-equipamento.component.html',
  styleUrls: ['./create-equipamento.component.css'],
})
export class CreateEquipamentoComponent implements OnInit {
  equipamentoForm: any;
  success: boolean = false;
  errorCad: boolean = false;

  constructor(
    private router: Router,
    private formRoom: FormBuilder,
    public popupService: PopupService,
    private equipamentoService: EquipamentoService, // Injete o serviço EquipamentoService
    private authService: AuthService // Injete o serviço AuthService
  ) {
    this.equipamentoForm = this.formRoom.group({
      name_equipamento: ['', Validators.required],
      qtd_equipamento: [
        '',
        [Validators.required, Validators.min(1), Validators.pattern(/^-?\d+$/)],
      ],
      status_equipamento: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  createEquipamento() {
    if (this.equipamentoForm.valid) {
      // Obtenha os valores do formulário
      const equipamento: equip = {
        nome: this.name_equipamento.value,
        qnt_estoque: this.qtd_equipamento.value,
      };

      // Chame o serviço para cadastrar o equipamento
      this.equipamentoService.cadastrarEquip(equipamento).subscribe(
        (response) => {
          this.success = true;
          this.errorCad = false;
          this.popupService.addMessage('Equipamento adicionado com sucesso!');
          // Você pode redirecionar para outra página ou tomar outras ações necessárias após o sucesso
        },
        (error) => {
          console.error('Erro ao cadastrar equipamento:', error);
          this.errorCad = true;
          this.success = false;
          this.popupService.addMessage('Erro ao cadastrar equipamento. Tente novamente.');
        }
      );
    } else {
      if (
        this.name_equipamento.value == '' ||
        this.qtd_equipamento.value.length === 0 || this.status_equipamento.value == ''
      ) {
        this.errorCad = true;
        this.success = false;
        this.popupService.addMessage('Preencha todos os campos!');
      }
    }
  }

  get name_equipamento() {
    return this.equipamentoForm.get('name_equipamento')!;
  }

  get qtd_equipamento() {
    return this.equipamentoForm.get('qtd_equipamento')!;
  }
  get status_equipamento() {
    return this.equipamentoForm.get('status_equipamento')!;
  }
}
