// create-equipamento.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PopupService } from 'src/app/services/popup.service';
import { EquipamentoService } from 'src/app/services/equipamento.service';
import { AuthService } from 'src/app/services/auth.service';
import { equip } from 'src/app/models/equip';

@Component({
  selector: 'app-create-equipamento',
  templateUrl: './create-equipamento.component.html',
  styleUrls: ['./create-equipamento.component.css'],
})
export class CreateEquipamentoComponent implements OnInit {
  success: boolean = false;
  errorCad: boolean = false;
  equipamentoForm: FormGroup;

  constructor(
    private router: Router,
    private formRoom: FormBuilder,
    public popupService: PopupService,
    private equipamentoService: EquipamentoService,
    private authService: AuthService
  ) {
    this.equipamentoForm = this.formRoom.group({
      name_equipamento: ['', Validators.required],
      qtd_equipamento: [
        '',
        [Validators.required, Validators.min(1), Validators.pattern(/^-?\d+$/)],
      ],
    });
  }

  ngOnInit(): void {}

  createEquipamento() {
    console.log('Função createEquipamento chamada');
    if (this.equipamentoForm.valid) {
      const equipamento: equip = {
        nome: this.equipamentoForm.get('name_equipamento')!.value,
        qnt_estoque: this.equipamentoForm.get('qtd_equipamento')!.value,
      };

      this.equipamentoService.cadastrarEquip(equipamento).subscribe(
        (response) => {
          this.success = true;
          this.errorCad = false;
          this.popupService.addMessage('Equipamento adicionado com sucesso!');
          this.equipamentoForm.reset();
        },
        (error) => {
          console.error('Erro ao cadastrar equipamento:', error);
          this.errorCad = true;
          this.success = false;
          this.popupService.addMessage('Erro ao cadastrar equipamento. Tente novamente.');
        }
      );
    } else {
      this.errorCad = true;
      this.success = false;
      this.popupService.addMessage('Preencha todos os campos!');
    }
  }
}
