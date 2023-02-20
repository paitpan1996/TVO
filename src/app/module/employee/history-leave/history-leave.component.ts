import { Component } from '@angular/core';

@Component({
  selector: 'app-history-leave',
  templateUrl: './history-leave.component.html',
  styleUrls: ['./history-leave.component.scss']
})
export class HistoryLeaveComponent {

  employeeName = localStorage.getItem('employee');
  name = localStorage.getItem('leavetype');
  status = 'green';
  test = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 3,
    },
  ]

}
