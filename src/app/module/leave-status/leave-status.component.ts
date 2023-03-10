import { Component, OnInit } from '@angular/core';
import liff from '@line/liff/dist/lib';
import * as moment from 'moment';
import { LeaveService } from 'src/app/service/leave.service';
import Swal from 'sweetalert2'

type UnPromise<T> = T extends Promise<infer X>? X : T;

@Component({
  selector: 'app-leave-status',
  templateUrl: './leave-status.component.html',
  styleUrls: ['./leave-status.component.scss']
})
export class LeaveStatusComponent implements OnInit {
  datePreview: any;
  myName: any;

  constructor (private leaveService: LeaveService) {}

  os: ReturnType<typeof liff.getOS>; 
  profile!: UnPromise<ReturnType<typeof liff.getProfile>>;
  dataLeave: any = [];
  dataDays: any = [];
  leaveTypeName: any;
  statusPreview: any;
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
      line_id: this.profile?.userId
      // line_id: 'U415bef6926c6126ae6b7370e46714288'
      // line_id: 'Uab6620e68248620f8c554228f90595b6'
      // line_id: 'U29b0687712ba81f325cdd94daf68fac4'
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
      // line_id: "U415bef6926c6126ae6b7370e46714288",
      // line_id: "Uab6620e68248620f8c554228f90595b6",
      // line_id: "U29b0687712ba81f325cdd94daf68fac4",
      // status: "PENDING"
    }
  
    this.leaveService.requestLeaveStatus(param).subscribe({
      next: (res: any) => {
        // console.log(res.leave);
        for(let i = 0; i < res.leave.length; i++) {
          res.leave[i].start_time = moment(res.leave[i].start_time).format("YYYY-MM-DD");
          res.leave[i].end_time = moment(res.leave[i].end_time).format("YYYY-MM-DD");
          const data = moment(res.leave[i].start_time).diff(res.leave[i].end_time,'days');
            this.dataLeave.push(res.leave[i]);
            this.dataDays.push(data);
        }
        this.myName = res.user;
        // this.dataLeave = res.leave;
        // console.log(this.dataLeave);
      }
    })
  }

  getDataUser(item: any) {
    this.statusPreview = item;
    // this.datePreview = date;
  }

  send() {
    const param = {
      line_id: this.profile?.userId,
      // line_id: 'U415bef6926c6126ae6b7370e46714288',
      leave_id: this.statusPreview?.id,
      // note: this.note ? this.note : ''
    }
    this.leaveService.cancelLeave(param).subscribe({
      next: (res) => {
        // console.log(res);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '?????????????????? !',
          text: "???????????????????????????????????????????????????",
          showConfirmButton: false,
          timer: 1500
        })
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }, error: () => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '????????????????????????????????????!',
          text: '????????????????????????????????????????????????????????????????????? ????????????????????????????????? ??????????????????',
          showConfirmButton: true,
          confirmButtonText: '????????????',
          confirmButtonColor: '#00833F'
        })
      }
    })
    
  }

}
