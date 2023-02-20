import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-information',
  templateUrl: './employee-information.component.html',
  styleUrls: ['./employee-information.component.scss']
})
export class EmployeeInformationComponent {

  constructor( private router: Router) {
  }


  item = [
    {
      id: 'ND001',
      name: 'John AAA'
    },
    {
      id: 'ND002',
      name: 'John BBB'
    },
    {
      id: 'ND003',
      name: 'John CCC'
    },
  ]

  selectEmployee(name: string) {
    localStorage.setItem('employee', name)
    this.router.navigate(['/employee-history']);
  }

}
