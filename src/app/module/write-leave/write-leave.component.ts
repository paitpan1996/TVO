import { Component, OnInit } from '@angular/core';
import liff from '@line/liff/dist/lib';
import * as moment from 'moment';
import { LeaveService } from 'src/app/service/leave.service';
import Swal from 'sweetalert2'
import { sortData } from '../../model/liff.model'

type UnPromise<T> = T extends Promise<infer X>? X : T;

@Component({
  selector: 'app-write-leave',
  templateUrl: './write-leave.component.html',
  styleUrls: ['./write-leave.component.scss']
})
export class WriteLeaveComponent implements OnInit {

  os: ReturnType<typeof liff.getOS>;
  profile!: UnPromise<ReturnType<typeof liff.getProfile>>;

yourFile: any;
type = 'FULL';
typeDate = '1';
leaveTypeName: any = [];
leaveType!: number;
startDate = moment().format('YYYY-MM-DD');
endDate = moment().format('YYYY-MM-DD');
date1 = new Date();

startTime!: string;
endTime!: string;
date!: number;
desc!: string;

leaveTypePreview!: string;
filePreview!: string;
endDatePreview!: string;
datePreview!: string;
startDatePerview!: string;
fd!: FormData;
url: any;
approverList: any;
minutes: any;
myName: any;
  leaveQuota: any;
  dataLeaveQuota: any;
  dateQuota: any;
  sort: any = [];

constructor(
  private leaveService: LeaveService
) { }

ngOnInit() {
  liff.init({liffId:'1657746390-LeORq250'}).then(()=>{
    this.os=liff.getOS();
    if(liff.isLoggedIn()){
      liff.getProfile().then( profile =>{
        this.profile = profile;
        this.getInitLeaveData();
        // console.log(this.profile);
      }).catch(console.error);
    }else{
      liff.login()
    }
// console.log(liff.isLoggedIn());
  }).catch(console.error);
}

getInitLeaveData() {
  const param = {
    line_id: this.profile?.userId
    // line_id: 'U415bef6926c6126ae6b7370e46714288'
  }

  this.leaveService.getInitLeaveData(param).subscribe({
    next: (res: any) => {
      this.leaveTypeName = res.leaveType;
      this.approverList = res.approverList;
      this.myName = res.user;
      this.getLeaveQuota();
      this.sort = sortData(this.leaveTypeName, 1)
      // console.log(this.sort);
    }
  })
}

getLeaveQuota() {
const param = {
  line_id: this.profile?.userId
}

this.leaveService.getLeaveQuota(param).subscribe({
  next: (res: any) => {
    this.leaveQuota = res.quotas;
    // console.log(res);
  }
})
}

getDataLeave() {
  // console.log('test')
  for (let i = 0; i < this.leaveQuota.length; i++) {
    if (this.leaveQuota[i].id == this.leaveType) {
      this.dataLeaveQuota = this.leaveQuota[i];
      // console.log(this.dataLeaveQuota);
    }
  }
  let date
  date = this.dataLeaveQuota?.matchQuota - this.dataLeaveQuota?.matchUse
  this.dateQuota = date % 1 == 0 ? date + '/' + this.dataLeaveQuota.matchQuota + ' วัน' : Math.floor(date) + '/' + this.dataLeaveQuota.matchQuota + ' วันครึ่ง'
  //todo
}

resetDate() {
  this.startDate = moment().format('YYYY-MM-DD');
  this.endDate = moment().format('YYYY-MM-DD');
}

setFromat() {
  // let leaveTypePreview = ''
  // for(let i = 0; i < this.leaveTypeName; i++) {
  //   if(this.leaveType == this.leaveTypeName[i].id) {
  //     this.leaveTypePreview = this.leaveTypeName[i].name;
  //   }
  // }

  for(let i = 0; i < this.leaveTypeName.length; i++) {
    if(this.leaveTypeName[i].id == +this.leaveType) {
      this.leaveTypePreview = this.leaveTypeName[i].name;
      // console.log(this.leaveTypePreview);
    }
  }

  this.startDatePerview = this.startDate
  this.endDatePreview = this.endDate
  // this.leaveTypePreview = leaveTypePreview;
  this.startDatePerview = moment(this.startDatePerview).format('DD/MM/YYYY');
  this.endDatePreview = moment(this.endDatePreview).format('DD/MM/YYYY');
  this.date = moment(this.endDate).diff(this.startDate, 'days');
  // console.log(this.date);
  this.minutes = moment(this.startDatePerview).diff(this.endDatePreview, 'minutes');
}

getFile(fileInput: any) {
  const file = fileInput.target.files[0];
  console.log(file);
  this.filePreview = file.name;

  const reader = new FileReader();
      reader.onload = (innerFileInput: any) => {
        this.url = innerFileInput.target.result;
  }
  reader.readAsDataURL(fileInput.target.files[0]);

  this.fd = new FormData();
  this.fd.append('userAttachmentFile', file);

}
sendLeave() {
  
  if(!this.leaveType || !this.startDate || !this.endDate) {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'เกิดข้อผิดพลาด !',
      text: 'กรุณาตรวจสอบ การลา และวันที่การลา ให้ถูกต้อง',
      showConfirmButton: true,
      confirmButtonText: 'ตกลง',
      confirmButtonColor: '#00833F'
    })
    return;
  }


  if(this.fd) {
    this.leaveService.doAttachFile(this.fd).subscribe({
      next: (res: any) => {
        this.yourFile = res.filename;
        const param = {
          line_id: this.profile?.userId,
          // line_id: 'U415bef6926c6126ae6b7370e46714288',
          reason: this.desc ? this.desc : 'ไม่ได้ระบุเหตุผล',
          type_id: +this.leaveType,
          leave_format: this.type,
          start: this.startDate,
          end: this.endDate,
          file: this.yourFile
        }
      
        setTimeout(() => {
          this.leaveService.addLeave(param).subscribe({
            next: () => {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'สำเร็จ !',
                text: "บันทึกการลาของคุณเรียบร้อย",
                showConfirmButton: false,
                timer: 1500
              })
              setTimeout(() => {
                window.location.href = 'leave-status';
              }, 1500);
            }, error: (err: any) => {
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'เกิดข้อผิดพลาด !',
                text: err.error.error,
                showConfirmButton: true,
                confirmButtonText: 'ตกลง',
                confirmButtonColor: '#00833F'
              })
            },
          })
        }, 1000);
      }
    })
  } else {
    const param = {
      line_id: this.profile?.userId,
      // line_id: 'U415bef6926c6126ae6b7370e46714288',
      reason: this.desc ? this.desc : 'ไม่ได้ระบุเหตุผล',
      type_id: +this.leaveType,
      leave_format: this.type,
      start: this.startDate,
      end: this.endDate,
      // file: 'ไม่ได้แนบไฟล์'
    }
  
    this.leaveService.addLeave(param).subscribe({
      next: (res: any) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'สำเร็จ !',
          text: "บันทึกการลาของคุณเรียบร้อย",
          showConfirmButton: false,
          timer: 1500
        })
        setTimeout(() => {
          window.location.href = 'leave-status';
        }, 1500);
      }, error: (err: any) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'เกิดข้อผิดพลาด !',
          text: err.error.error,
          showConfirmButton: true,
          confirmButtonText: 'ตกลง',
          confirmButtonColor: '#00833F'
        })
      },
    })
  }

}

}
