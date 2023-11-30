import { Component } from '@angular/core';
import { Router } from '@angular/router';
import liff from '@line/liff/dist/lib';
import { LeaveService } from 'src/app/service/leave.service';

type UnPromise<T> = T extends Promise<infer X>? X : T;

@Component({
  selector: 'app-employee-information',
  templateUrl: './employee-information.component.html',
  styleUrls: ['./employee-information.component.scss']
})
export class EmployeeInformationComponent {

  constructor(
    private router: Router,
    private leaveService: LeaveService) {}

  os: ReturnType<typeof liff.getOS>;  
  profile!: UnPromise<ReturnType<typeof liff.getProfile>>;

  searchText = '';


  data: any

  ngOnInit(): void {
    liff.init({liffId:'2000308881-Ljw6m3Vo'}).then(()=>{
      this.os=liff.getOS();
      if(liff.isLoggedIn()){
        liff.getProfile().then( profile =>{
          this.profile = profile;
          this.getEmployerList();
          // console.log(this.profile);
        }).catch(console.error);
      }else{
        liff.login()
      }
    }).catch(console.error);
  }

  getEmployerList() {
    const param = {
      line_id: this.profile.userId
    }

    this.leaveService.getEmployerList(param).subscribe({
      next: (res: any) => {
        this.data = res.employers;
      }
    })
  }

  selectEmployee(item: any) {
    localStorage.setItem('employee_id', item.employee_id)
    localStorage.setItem('employee_name', item.employeeAssoc.name_th)
    this.router.navigate(['employee-history']);
  }

}
