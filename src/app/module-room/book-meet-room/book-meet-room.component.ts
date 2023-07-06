import { Component } from '@angular/core';

@Component({
  selector: 'app-book-meet-room',
  templateUrl: './book-meet-room.component.html',
  styleUrls: ['./book-meet-room.component.scss']
})
export class BookMeetRoomComponent {
allow_to_date: any;
type: any;
room = [
  {
    label: 'test',
    value: 'test'
  },
  {
    label: 'test1',
    value: 'test1'
  },
  {
    label: 'test2',
    value: 'test2'
  },
  {
    label: 'test3',
    value: 'test3'
  },
];
obj: any;

data: any = []
filePreview: any;
url: any;
fd!: FormData;

send() {
  window.location.href = 'book-history'
}

addData() {
  this.data.push(this.obj);
  console.log(this.data);
  this.obj = '';
}

delete(i: number): void {
  this.data.splice(i, 1);
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

}
