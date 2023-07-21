import { Component, OnInit } from '@angular/core';
import liff from '@line/liff/dist/lib';
import * as moment from 'moment';
import { getObject } from 'src/app/model/liff.model';
import { LeaveService } from 'src/app/service/leave.service';
import Swal from 'sweetalert2'

type UnPromise<T> = T extends Promise<infer X> ? X : T;

@Component({
  selector: 'app-approve-status',
  templateUrl: './approve-status.component.html',
  styleUrls: ['./approve-status.component.scss']
})
export class ApproveStatusComponent implements OnInit {

  leaveTypeName: any;
  dataLeave: any;
  dataUser: any;
  param: any;
  dataDays: any = [];
  myName: any;
  statusPreview: any;
  datePreview: any;
  data: any;
  namePreview: any;

  constructor(private leaveService: LeaveService) { }

  os: ReturnType<typeof liff.getOS>;
  profile!: UnPromise<ReturnType<typeof liff.getProfile>>;

  note!: string;

  ngOnInit(): void {
    liff.init({ liffId: '1657746390-LeORq250' }).then(() => {
      this.os = liff.getOS();
      if (liff.isLoggedIn()) {
        liff.getProfile().then(async profile => {
          this.profile = profile;
          await this.getInitLeaveData();
          await this.requestLeaveStatus();
          // console.log(this.profile);
        }).catch(console.error);
      } else {
        liff.login()
      }
    }).catch(console.error);
  }

  checkStatus() {
    localStorage.setItem('myname', this.myName.name_th);
    window.location.href = 'employee-information';
  }

  getInitLeaveData() {
    return new Promise<any>((resolve, reject) => {
      const param = {
        line_id: this.profile?.userId
        // line_id: 'U415bef6926c6126ae6b7370e46714288'
        // line_id: 'Uab6620e68248620f8c554228f90595b6'
        // line_id: 'U29b0687712ba81f325cdd94daf68fac4' // พี่คิง
        // line_id: 'U6760dfe320d5c3cd6418a8780c8f5f37' // แชมป์
      }

      this.leaveService.getInitLeaveData(param).subscribe({
        next: (res: any) => {
          // console.log(res.leaveType);
          this.leaveTypeName = res.leaveType;
          resolve(1)
        }
      })
    })
  }

  requestLeaveStatus() {
    const param = {
      line_id: this.profile?.userId,
      // line_id: 'U415bef6926c6126ae6b7370e46714288'
      // line_id: 'U29b0687712ba81f325cdd94daf68fac4' // พี่คิง
      // line_id: 'U6760dfe320d5c3cd6418a8780c8f5f37' // แชมป์
    }

    this.leaveService.requestLeaveStatusFix(param).subscribe({
      next: (res: any) => {
        for (let i = 0; i < res.approve.length; i++) {
          const leave = res.approve[i].leave;
          leave.start_time = moment(leave.start_time).format('DD/MM/YYYY');
          leave.end_time = moment(leave.end_time).format('DD/MM/YYYY');
          leave.leave_type_name = getObject(this.leaveTypeName, leave.type_id, 'id');
          leave.leave_type_name = leave.leave_type_name ? leave.leave_type_name.name : null;

          const leaveApprovals = leave.leave_approvals;

          if (leaveApprovals[0]) {
            const firstApprover = leaveApprovals[0];
            if (firstApprover.approver_id !== res.user.id && firstApprover.approver_approver_priority === 1) {
              console.log("ผู้อนุมัติขั้นแรกไม่ใช่คุณ");
            } else if (firstApprover.approver_id === res.user.id && firstApprover.approver_approver_priority === 1) {
              console.log("ผู้อนุมัติขั้นแรกคือคุณ");
            }
          }

          if (leaveApprovals[1]) {
            const secondApprover = leaveApprovals[1];
            if (secondApprover.approver_id !== res.user.id && secondApprover.approver_approver_priority === 2) {
              console.log("ผู้อนุมัติขั้นสองไม่ใช่คุณ");
            } else if (secondApprover.approver_id === res.user.id && secondApprover.approver_approver_priority === 2) {
              console.log("ผู้อนุมัติขั้นสองคือคุณ");
            }
          }

          if (leaveApprovals[2]) {
            const thirdApprover = leaveApprovals[2];
            if (thirdApprover.approver_id !== res.user.id && thirdApprover.approver_approver_priority === 3) {
              console.log("ผู้อนุมัติขั้นสามไม่ใช่คุณ");
            } else if (thirdApprover.approver_id === res.user.id && thirdApprover.approver_approver_priority === 3) {
              console.log("ผู้อนุมัติขั้นสามคือคุณ");
            }
          }

          
        }
        this.dataLeave = res.approve;
          this.myName = res.user;
          console.log(res);
          console.log(res.approve);
      }
    });



    // this.leaveService.requestLeaveStatus(param).subscribe({
    //   next: (res: any) => {
    //     for(let i = 0; i < res.approve.length; i++) {
    //       res.approve[i].leave.start_time = moment(res.approve[i].leave.start_time).format('DD/MM/YYYY');
    //       res.approve[i].leave.end_time = moment(res.approve[i].leave.end_time).format('DD/MM/YYYY');
    //       res.approve[i].leave.leave_type_name = getObject(this.leaveTypeName, res.approve[i].leave.type_id, 'id');
    //       res.approve[i].leave.leave_type_name = res.approve[i].leave.leave_type_name ? res.approve[i].leave.leave_type_name.name : null; 
    //       if(res.approve[i].leave.leave_approvals[0]){
    //         if(res.approve[i].leave.leave_approvals[0].approver_id != res.user.id && res.approve[i].leave.leave_approvals[0].approver_approver_priority == 1){
    //           console.log("ผู้อนุมัติขั้นแรกไม่ใช่คุณ");
    //         }else if(res.approve[i].leave.leave_approvals[0].approver_id == res.user.id && res.approve[i].leave.leave_approvals[0].approver_approver_priority == 1){
    //           console.log("ผู้อนุมัติขั้นแรกคือคุณ");
    //         }
    //       }
    //       if(res.approve[i].leave.leave_approvals[1]){
    //         if(res.approve[i].leave.leave_approvals[1].approver_id != res.user.id && res.approve[i].leave.leave_approvals[1].approver_approver_priority == 2){
    //           console.log("ผู้อนุมัติขั้นสองไม่ใช่คุณ");
    //         }else if(res.approve[i].leave.leave_approvals[1].approver_id == res.user.id && res.approve[i].leave.leave_approvals[1].approver_approver_priority == 2){
    //           console.log("ผู้อนุมัติขั้นสองคือคุณ");
    //         }
    //       }
    //       if(res.approve[i].leave.leave_approvals[2]){
    //         if(res.approve[i].leave.leave_approvals[2].approver_id != res.user.id && res.approve[i].leave.leave_approvals[2].approver_approver_priority == 3){
    //           console.log("ผู้อนุมัติขั้นสามไม่ใช่คุณ");
    //         }else if(res.approve[i].leave.leave_approvals[2].approver_id == res.user.id && res.approve[i].leave.leave_approvals[2].approver_approver_priority == 3){
    //           console.log("ผู้อนุมัติขั้นสามคือคุณ");
    //         }
    //       }

    //       // if(res.approve[i].leave.leave_approvals[1].approver_id != res.user.id && res.approve[i].leave.leave_approvals[0].approver_approver_priority == 2){
    //       //   console.log("ผู้อนุมัติขั้นสองไม่ใช่คุณ");
    //       // }else if(res.approve[i].leave.leave_approvals[1].approver_id == res.user.id && res.approve[i].leave.leave_approvals[0].approver_approver_priority == 2){
    //       //   console.log("ผู้อนุมัติขั้นสองคือคุณ");
    //       // }
    //       // if(res.approve[i].leave.leave_approvals[2].approver_id != res.user.id && res.approve[i].leave.leave_approvals[0].approver_approver_priority == 3){
    //       //   console.log("ผู้อนุมัติขั้นสามไม่ใช่คุณ");
    //       // }else if(res.approve[i].leave.leave_approvals[2].approver_id == res.user.id && res.approve[i].leave.leave_approvals[0].approver_approver_priority == 3){
    //       //   console.log("ผู้อนุมัติขั้นสามคือคุณ");
    //       // }
    //       // const data = moment(res.approve[i].leave.start_time).diff(res.approve[i].leave.end_time, 'days');
    //       // this.dataDays.push('date',data);
    //       // console.log(data);
    //     }
    //     this.dataLeave = res.approve;
    //     this.myName = res.user;
    //     console.log(res);
    //     console.log(res.approve);
    //   }
    // });


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
      // line_id: 'U29b0687712ba81f325cdd94daf68fac4', // พี่คิง
      // line_id: 'U6760dfe320d5c3cd6418a8780c8f5f37', // แชมป์
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
        // console.log(err);
        if (err.error.error) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'เกิดข้อผิดพลาด !',
            text: err.error.error,
            showConfirmButton: true,
            confirmButtonText: 'ตกลง',
            confirmButtonColor: '#00833F'
          })
        } else {
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

      }
    })

  }

  sentData(item: any) {
    this.note = '';
    this.param = item;
  }

  cilckNotApprove() {

    if (this.note) {
      const param = {
        line_id: this.profile?.userId,
        // line_id: 'U415bef6926c6126ae6b7370e46714288',
        // line_id: 'U29b0687712ba81f325cdd94daf68fac4', // พี่คิง
        // line_id: 'U6760dfe320d5c3cd6418a8780c8f5f37', // แชมป์
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

  getUserName(item: any) {
    this.namePreview = item.user.name_th
  }

  getDate(item: any) {
    let date
    date = item.matchQuota - item.matchUse
    return date % 1 == 0 ? date + ' วัน' : Math.floor(date) + ' วันครึ่ง'
  }

  openPicker() {

  }

}
