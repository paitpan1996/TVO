import { Component, OnInit } from '@angular/core';
import liff from '@line/liff/dist/lib';
import * as moment from 'moment';
import { LeaveService } from 'src/app/service/leave.service';
import Swal from 'sweetalert2'

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
leaveTypeName: any = [];
leaveType!: number;
startDate!: string;
endDate!: string;

startTime!: string;
endTime!: string;
date!: string;
desc!: string;

leaveTypePreview!: string;
filePreview!: string;
endDatePreview!: string;
datePreview!: string;
startDatePerview!: string;

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
      // console.log(res.leaveType);
      this.leaveTypeName = res.leaveType;
    }
  })
}

setFromat() {
  // let leaveTypePreview = ''
  for(let i = 0; i < this.leaveTypeName; i++) {
    if(this.leaveType == this.leaveTypeName[i].id) {
      this.leaveTypePreview = this.leaveTypeName[i].name;
      // console.log(this.leaveTypePreview);
    }
  }

  this.startDatePerview = this.startDate
  this.endDatePreview = this.endDate
  // let sumDate = (+this.startDatePerview) - (+this.endDatePreview);
  // console.log(sumDate);
  // this.leaveTypePreview = leaveTypePreview;
  this.startDatePerview = moment(this.startDatePerview).format('DD/MM/YYYY HH:mm');
  this.endDatePreview = moment(this.endDatePreview).format('DD/MM/YYYY HH:mm');
  this.date = moment(this.date).format('DD/MM/YYYY HH:mm');
}

getFile(fileInput: any) {
  const file = fileInput.target.files[0];
  this.filePreview = file.name;

  const fd = new FormData();
  fd.append('userAttachmentFile', file);

  this.leaveService.doAttachFile(fd).subscribe({
    next: (res: any) => {
      this.yourFile = res.filename;
    }
  })
}

sendLeave() {
  const param = {
    line_id: this.profile?.userId,
    // line_id: 'U415bef6926c6126ae6b7370e46714288',
    reason: this.desc ? this.desc : 'ไม่ได้ระบุเหตุผล',
    type_id: +this.leaveType,
    leave_format: this.type,
    start: this.startDate,
    end: this.endDate,
    file: this.yourFile ? this.yourFile : 'ไม่ได้แนบไฟล์'
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
