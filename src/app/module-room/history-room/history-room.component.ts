import { Component } from '@angular/core';

@Component({
  selector: 'app-history-room',
  templateUrl: './history-room.component.html',
  styleUrls: ['./history-room.component.scss']
})
export class HistoryRoomComponent {
dataLeave: any;
data: any;

  goBookMeet() {
    window.location.href = 'book-meet'
  }

}
