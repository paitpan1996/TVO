import { Component } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-approve-status',
  templateUrl: './approve-status.component.html',
  styleUrls: ['./approve-status.component.scss']
})
export class ApproveStatusComponent {

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

  cilckApprove() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'สำเร็จ !',
      text: "อนุมัติการลา",
      showConfirmButton: false,
      timer: 1500
    })
  }

  cilckNotApprove() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'สำเร็จ !',
      text: "ไม่อนุมัติการลา",
      showConfirmButton: false,
      timer: 1500
    })
  }

}
