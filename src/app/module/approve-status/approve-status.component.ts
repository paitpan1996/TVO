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

  constructor(private leaveService: LeaveService) {}

  os: ReturnType<typeof liff.getOS>;  
  profile!: UnPromise<ReturnType<typeof liff.getProfile>>;
  
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
    }
    this.leaveService.requestLeaveStatus(param).subscribe({
      next: (res: any) => {
        this.dataLeave = res.approve;
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

  cilckApprove(item: any) {

    const param = {
      line_id: this.profile?.userId,
      // line_id: 'U415bef6926c6126ae6b7370e46714288',
      leave_id: item.id,
      result: 'ACCEPT'
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
    this.param = item;
  }

  cilckNotApprove() {
    const param = {
      line_id: this.profile?.userId,
      // line_id: 'U415bef6926c6126ae6b7370e46714288',
      leave_id: this.param.id,
      result: 'REJECT',
      note: this.note ? this.note : 'ไม่ได้กรอกเหตุผล'
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
  }

}
