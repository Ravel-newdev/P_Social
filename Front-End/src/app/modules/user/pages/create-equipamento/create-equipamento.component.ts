import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PopupService } from 'src/app/services/popup.service';

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
    public popupService: PopupService
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
      this.success = true;
      this.errorCad = false;
      this.popupService.addMessage('Equipamento adicionado com sucesso!');
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
