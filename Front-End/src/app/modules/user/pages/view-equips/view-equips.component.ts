// view-equips.component.ts

import { Component, OnInit } from '@angular/core';
import { EquipamentoService } from 'src/app/services/equipamento.service';

@Component({
  selector: 'app-view-equips',
  templateUrl: './view-equips.component.html',
  styleUrls: ['./view-equips.component.css']
})
export class ViewEquipsComponent implements OnInit {
  equips: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 3;

  constructor(private equipamentoService: EquipamentoService) {}

  ngOnInit(): void {
    this.carregarEquipamentos();
  }

  carregarEquipamentos(): void {
    this.equipamentoService.pegarEquip().subscribe(
      (data: any) => {
        this.equips = data.map((equip: any) => ({
          nome: equip.nome,
          status:  this.getStatusLabel(equip.status)
        }))
        console.log(data);
      },
      (error) => {
        console.error('Erro ao carregar equipamentos:', error);
      }
    );
  }
  getStatusLabel(status: string): string {
    return status === 'A' ? 'Ativo' : 'Inativo';
  }

  getTotalPages(): number {
    return Math.ceil(this.equips.length / this.itemsPerPage);
  }

  getPages(): number[] {
    const totalPages = this.getTotalPages();
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  setPage(page: number): void {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
    }
  }

  previousPage(): void {
    this.setPage(this.currentPage - 1);
  }

  nextPage(): void {
    this.setPage(this.currentPage + 1);
  }
}
