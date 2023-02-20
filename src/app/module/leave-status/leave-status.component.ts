import { Component } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-leave-status',
  templateUrl: './leave-status.component.html',
  styleUrls: ['./leave-status.component.scss']
})
export class LeaveStatusComponent {

  send() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'สำเร็จ !',
      text: "ยกเลิกการลาสำเร็จ",
      showConfirmButton: false,
      timer: 1500
    })
  }

}
