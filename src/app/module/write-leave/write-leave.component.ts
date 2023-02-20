import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-write-leave',
  templateUrl: './write-leave.component.html',
  styleUrls: ['./write-leave.component.scss']
})
export class WriteLeaveComponent implements OnInit {

yourFile!: File;
type!: string;

constructor() { }

ngOnInit() {
  this.type = '1'
}

getFile(fileInput: any) {
   this.yourFile = fileInput.target.files[0];
}

sendLeave() {
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'สำเร็จ !',
    text: "บันทึกการลาของคุณเรียบร้อย",
    showConfirmButton: false,
    timer: 1500
  })
}

}
