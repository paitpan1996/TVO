import { Component, OnInit } from '@angular/core';
import liff from '@line/liff/dist/lib';
import * as moment from 'moment';
import { getObject } from 'src/app/model/liff.model';
import { LeaveService } from 'src/app/service/leave.service';
import Swal from 'sweetalert2'

type UnPromise<T> = T extends Promise<infer X>? X : T;

@Component({
  selector: 'app-leave-history',
  templateUrl: './leave-history.component.html',
  styleUrls: ['./leave-history.component.scss']
})
export class LeaveHistoryComponent implements OnInit {
  datePreview: any;
  myName: any;
  date: any;

  constructor (private leaveService: LeaveService) {}

  os: ReturnType<typeof liff.getOS>; 
  profile!: UnPromise<ReturnType<typeof liff.getProfile>>;
  dataLeave: any = [];
  dataDays: any = [];
  leaveTypeName: any;
  statusPreview: any;
  note!: string;

  sort: any = [];

  ngOnInit(): void {
    liff.init({liffId:'1657746390-LeORq250'}).then(()=>{
      this.os=liff.getOS();
      if(liff.isLoggedIn()){
        liff.getProfile().then( async profile =>{
          this.profile = profile;
          await this.getInitLeaveData();
          await this.requestLeaveStatus();
          // console.log(this.profile);
        }).catch(console.error);
      }else{
        liff.login()
      }
    }).catch(console.error);
  }

  getInitLeaveData() {
    return new Promise<any>((resolve, reject) => {
      const param = {
        line_id: this.profile?.userId
        // line_id: 'U415bef6926c6126ae6b7370e46714288'
        // line_id: 'Uab6620e68248620f8c554228f90595b6'
        // line_id: 'U29b0687712ba81f325cdd94daf68fac4'
        // line_id: 'Uc748e20222c83fdad81366bde68ba8f2' // ลูกค้า
      }
    
      this.leaveService.getInitLeaveData(param).subscribe({
        next: (res: any) => {
          // console.log(res.leaveType);
          console.log(res);
          this.leaveTypeName = res.leaveType;
          resolve(1)
        }
      })
    })
  }
  

  requestLeaveStatus() {
    return new Promise<any>((resolve, reject) => {
      const param = {
        line_id: this.profile?.userId,
        // line_id: "U415bef6926c6126ae6b7370e46714288",
        // line_id: "Uab6620e68248620f8c554228f90595b6",
        // line_id: "U29b0687712ba81f325cdd94daf68fac4",
        // line_id: 'Uc748e20222c83fdad81366bde68ba8f2' //ลูกค้า
        // status: "PENDING"
      }
    
      this.leaveService.requestLeaveStatus(param).subscribe({
        next: (res: any) => {
          // console.log(this.leaveTypeName);
          for(let i = 0; i < res.leave.length; i++) {
            res.leave[i].start_time = moment(res.leave[i].start_time).format("DD/MM/YYYY");
            res.leave[i].end_time = moment(res.leave[i].end_time).format("DD/MM/YYYY");
            res.leave[i].leave_type_name = getObject(this.leaveTypeName, res.leave[i].type_id, 'id');
            res.leave[i].leave_type_name = res.leave[i].leave_type_name ? res.leave[i].leave_type_name.name : null; 
            if(res.leave[i].leave_format === 'FULL') {
              res.leave[i].leave_format = 'เต็มวัน';
            }else if(res.leave[i].leave_format === 'HALF_MORNING') {
              res.leave[i].leave_format = 'ครึ่งวันเช้า';
            }else if(res.leave[i].leave_format === 'HALF_NOON') {
              res.leave[i].leave_format = 'ครึ่งวันบ่าย';
            }
            const data = moment(res.leave[i].start_time).diff(res.leave[i].end_time,'days');
              this.dataDays.push(data);
          }
  
          this.dataLeave = res.leave.filter((leaveItem: any) => leaveItem.status !== 'PENDING');
          this.myName = res.user;
          console.log(res);
          resolve(1)
        }
      })
    })
  }

  getDataUser(item: any) {
    this.statusPreview = item;
    // console.log(item)
    // this.date = moment(item.start_time).diff(item.end_time, 'days');
    // console.log(this.statusPreview);
    // this.datePreview = date;
  }

  send() {
    const param = {
      line_id: this.profile?.userId,
      // line_id: 'U415bef6926c6126ae6b7370e46714288',
      // line_id: 'Uc748e20222c83fdad81366bde68ba8f2', // ลูกค้า
      leave_id: this.statusPreview?.id,
      // note: this.note ? this.note : ''
    }
    this.leaveService.cancelLeave(param).subscribe({
      next: (res) => {
        // console.log(res);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'สำเร็จ !',
          text: "ยกเลิกการลาสำเร็จ",
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
          title: 'พบข้อผิดพลาด!',
          text: 'ไม่สามารถยกเลิกการลาได้ กรุณาติดต่อ แอดมิน',
          showConfirmButton: true,
          confirmButtonText: 'ตกลง',
          confirmButtonColor: '#00833F'
        })
      }
    })
    
  }

}

