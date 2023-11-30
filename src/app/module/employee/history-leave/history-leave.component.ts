import { Component } from '@angular/core';
import liff from '@line/liff/dist/lib';
import * as moment from 'moment';
import { LeaveService } from 'src/app/service/leave.service';
import Swal from 'sweetalert2'

type UnPromise<T> = T extends Promise<infer X>? X : T;

@Component({
  selector: 'app-history-leave',
  templateUrl: './history-leave.component.html',
  styleUrls: ['./history-leave.component.scss']
})
export class HistoryLeaveComponent {

  constructor(
    private leaveService: LeaveService) {}

  os: ReturnType<typeof liff.getOS>;  
  profile!: UnPromise<ReturnType<typeof liff.getProfile>>;
  employee_id = localStorage.getItem('employee_id');

  employeeName = localStorage.getItem('employee_name');
  leaveId = localStorage.getItem('leavetype');
  myName = localStorage.getItem('myname');
  status = 'green';

  data: any = [];

  ngOnInit(): void {
    liff.init({liffId:'2000308881-Ljw6m3Vo'}).then(()=>{
      this.os=liff.getOS();
      if(liff.isLoggedIn()){
        liff.getProfile().then( profile =>{
          this.profile = profile;
          this.getEmployerLeaveHistory();
          // console.log(this.profile);
        }).catch(console.error);
      }else{
        liff.login()
      }
    }).catch(console.error);
  }

  getEmployerLeaveHistory() {
    const param = {
      approver_line_id: this.profile.userId,
      employee_id: this.employee_id
    }

    this.leaveService.getEmployerLeaveHistory(param).subscribe({
      next: (res: any) => {
        for(let i = 0; i < res.history.length; i++) {
          if(res.history[i].type_id == this.leaveId) {
            res.history[i].start_time = moment(res.history[i].start_time).format('DD/MM/YYYY');
            res.history[i].end_time = moment(res.history[i].end_time).format('DD/MM/YYYY');
            if(res.history[i].status == 'APPROVED') {
              this.data.push(res.history[i]);
            }
          }
        }
        setTimeout(() => {
          this.checkDate();
        }, 1500);
      }
    })
  }

  checkDate() {
    if (!this.data.length) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'ยังไม่มีรายการขอลานี้ !',
        text: "กรุณาเลือกรายการอื่น",
        showConfirmButton: true,
        confirmButtonText: 'ตกลง',
        confirmButtonColor: '#00833F'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = 'employee-history';
        }
      })
    }
  }

}
