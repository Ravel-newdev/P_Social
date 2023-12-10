import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(private router: Router) {}

  messagePopup: string = ''
  popupShow: boolean = false

  addMessage(message: string){
    this.messagePopup = message;
  }

  clear(){
    this.messagePopup = ''
  }

  openPopup(){
    this.popupShow = true
  }

  closePopup(){
    this.popupShow = false
  }
}
