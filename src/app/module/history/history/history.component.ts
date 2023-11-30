import { Component } from '@angular/core';
import { Router } from '@angular/router';
import liff from '@line/liff/dist/lib';
import { LeaveService } from 'src/app/service/leave.service';

type UnPromise<T> = T extends Promise<infer X>? X : T;

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {

  constructor(
    private router: Router,
    private leaveService: LeaveService) {}

  os: ReturnType<typeof liff.getOS>;  
  profile!: UnPromise<ReturnType<typeof liff.getProfile>>;

  name = localStorage.getItem('employee_name');
  employee_id = localStorage.getItem('employee_id');

  data: any

  ngOnInit(): void {
    liff.init({liffId:'2000308881-Ljw6m3Vo'}).then(()=>{
      this.os=liff.getOS();
      if(liff.isLoggedIn()){
        liff.getProfile().then( profile =>{
          this.profile = profile;
          this.getLeaveQuota();
          // console.log(this.profile);
        }).catch(console.error);
      }else{
        liff.login()
      }
    }).catch(console.error);
  }

  getLeaveQuota() {
    const param = {
      line_id: this.profile?.userId
    }
    
    this.leaveService.getLeaveQuota(param).subscribe({
      next: (res: any) => {
        this.data = res.quotas;
        // console.log(res);
      }
    })
    }

  // getEmployerLeaveQuota() {
  //   const param = {
  //     approver_line_id: this.profile.userId,
  //     employee_id: this.employee_id
  //   }

  //   this.leaveService.getEmployerLeaveQuota(param).subscribe({
  //     next: (res: any) => {
  //       this.data = res.quotas;
  //     }
  //   })
  // }

  viewDetail(item: any) {
    localStorage.setItem('leavetype', item.id);
    this.router.navigate(['sub-history']);
  }

  getDate(item: any) {
    let date
    date = item.matchQuota - item.matchUse
    return date % 1 == 0 ? date + ' วัน' : Math.floor(date) + ' วันครึ่ง'
  }

}
