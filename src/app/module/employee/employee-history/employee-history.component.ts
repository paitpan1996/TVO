import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-history',
  templateUrl: './employee-history.component.html',
  styleUrls: ['./employee-history.component.scss']
})
export class EmployeeHistoryComponent implements OnInit {

  constructor(private router: Router) {
  }

  name = localStorage.getItem('employee');
  test = [
    {
      id: 1,
      name: 'ลากิจ',
    },
    {
      id: 2,
      name: 'ลาป่วย',
    },
    {
      id: 3,
      name: 'ลาพักร้อน',
    },
    {
      id: 3,
      name: 'ลาอื่นๆ',
    },
  ]



  ngOnInit() {
    
  }

  viewDetail(name: string) {
    localStorage.setItem('leavetype', name);
    this.router.navigate(['/history-leave']);
  }

}
