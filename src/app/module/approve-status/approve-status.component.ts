import { Component, OnInit } from '@angular/core';
import liff from '@line/liff/dist/lib';
import * as moment from 'moment';
import { LeaveService } from 'src/app/service/leave.service';
import Swal from 'sweetalert2'

type UnPromise<T> = T extends Promise<infer X>? X : T;

@Component({
  selector: 'app-approve-status',
  templateUrl: './approve-status.component.html',
  styleUrls: ['./approve-status.component.scss']
})
export class ApproveStatusComponent implements OnInit {

  leaveTypeName: any;
  dataLeave: any;
  param: any;
  dataDays: any = [];
  myName: any;
  statusPreview: any;
  datePreview: any;
  data: any;
  namePreview: any;

  constructor(private leaveService: LeaveService) {}

  os: ReturnType<typeof liff.getOS>;  
  profile!: UnPromise<ReturnType<typeof liff.getProfile>>;

  note!: string;

  ngOnInit(): void {
    liff.init({liffId:'1657746390-LeORq250'}).then(()=>{
      this.os=liff.getOS();
      if(liff.isLoggedIn()){
        liff.getProfile().then( profile =>{
          this.profile = profile;
          this.getInitLeaveData();
          this.requestLeaveStatus();
          // console.log(this.profile);
        }).catch(console.error);
      }else{
        liff.login()
      }
    }).catch(console.error);
  }

  checkStatus() {
    localStorage.setItem('myname',  this.myName.name_th);
    window.location.href = 'employee-information';
  }

  getInitLeaveData() {
    const param = {
      line_id: this.profile?.userId,
      // line_id: 'U415bef6926c6126ae6b7370e46714288'
    }
  
    this.leaveService.getInitLeaveData(param).subscribe({
      next: (res: any) => {
        // console.log(res.leaveType);
        this.leaveTypeName = res.leaveType;
      }
    })
  }

  requestLeaveStatus() {
    const param = {
      line_id: this.profile?.userId,
      // line_id: 'U415bef6926c6126ae6b7370e46714288'
      // line_id: 'U29b0687712ba81f325cdd94daf68fac4'
    }
    this.leaveService.requestLeaveStatus(param).subscribe({
      next: (res: any) => {
        this.dataLeave = res.approve;
        this.myName = res.user;
        for(let i = 0; i < res.approve.length; i++) {
          res.approve[i].leave.start_time = moment(res.approve[i].leave.start_time).format('DD/MM/YYYY');
          res.approve[i].leave.end_time = moment(res.approve[i].leave.end_time).format('DD/MM/YYYY');
          // const data = moment(res.approve[i].leave.start_time).diff(res.approve[i].leave.end_time, 'days');
          // this.dataDays.push('date',data);
          // console.log(data);
        }
        // console.log(res.approve);
      }
    });
  }

  checkLeave(item: any) {
    this.namePreview = item.employee.name_th
    const param = {
      approver_line_id: this.profile?.userId,
      employee_id: item.employee_id
    }

    this.leaveService.getEmployerLeaveQuota(param).subscribe({
      next: (res: any) => {
        this.data = res.quotas;
      }
    })
  }

  cilckApprove(item: any) {

    const param = {
      line_id: this.profile?.userId,
      // line_id: 'U415bef6926c6126ae6b7370e46714288',
      // line_id: 'U29b0687712ba81f325cdd94daf68fac4',
      leave_id: item.id,
      result: 'APPROVED'
    }

    this.leaveService.approveLeave(param).subscribe({
      next: (res: any) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'สำเร็จ !',
          text: "อนุมัติการลา",
          showConfirmButton: false,
          timer: 1500
        })
        setTimeout(() => {
          this.getInitLeaveData();
          this.requestLeaveStatus();
        }, 1500);
      }, error: (err) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'เกิดข้อผิดพลาด !',
          text: "ไม่สามารถอนุมัติการลาได้ กรุณาติดต่อแอดมิน",
          showConfirmButton: true,
          confirmButtonText: 'ตกลง',
          confirmButtonColor: '#00833F'
        })
      }
    })
    
  }

  sentData(item: any) {
    this.note = '';
    this.param = item;
  }

  cilckNotApprove() {

    if(this.note) {
      const param = {
        line_id: this.profile?.userId,
        // line_id: 'U415bef6926c6126ae6b7370e46714288',
        // line_id: 'U29b0687712ba81f325cdd94daf68fac4',
        leave_id: this.param.id,
        result: 'REJECTED',
        note: this.note
      }
  
      this.leaveService.approveLeave(param).subscribe({
        next: (res: any) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'สำเร็จ !',
            text: "ไม่อนุมัติการลา",
            showConfirmButton: false,
            timer: 1500
          })
          setTimeout(() => {
            this.getInitLeaveData();
            this.requestLeaveStatus();
          }, 1500);
        }, error: (err) => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'เกิดข้อผิดพลาด !',
            text: "ไม่สามารถ ไม่อนุมัติการลาได้ กรุณาติดต่อแอดมิน",
            showConfirmButton: true,
            confirmButtonText: 'ตกลง',
            confirmButtonColor: '#00833F'
          })
        }
      })
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'เกิดข้อผิดพลาด !',
        text: "ไม่สามารถ ไม่อนุมัติการลาได้ กรุณาใส่เหตุผลการไม่อนุมัติ",
        showConfirmButton: true,
        confirmButtonText: 'ตกลง',
        confirmButtonColor: '#00833F'
      })
    }
  }

  getDataUser(item: any) {
    this.statusPreview = item
    this.datePreview = moment(item.end_time).diff(item.start_time, 'days');
  }

  getDate(item: any) {
    let date
    date = item.matchQuota - item.matchUse
    return date % 1 == 0 ? date + ' วัน' : Math.floor(date) + ' วันครึ่ง'
  }

  openPicker() {
    
  }

}
