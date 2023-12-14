import { Component } from '@angular/core';

@Component({
  selector: 'app-relation-rooms',
  templateUrl: './relation-rooms.component.html',
  styleUrls: ['./relation-rooms.component.css']
})
export class RelationRoomsComponent {
angle: boolean = false;
selectedRoom: string | undefined;

constructor(){}

ShowAngle(){
  this.angle = !this.angle;
}
}
