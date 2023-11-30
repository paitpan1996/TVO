import { Component, OnInit } from '@angular/core';
import liff from '@line/liff/dist/lib';
import * as moment from 'moment';
import { OtService } from 'src/app/service/ot.service';
import Swal from 'sweetalert2';
import { sortData } from '../../model/liff.model';

import { OtSelectTypeComponent } from '../components/ot-select-type/ot-select-type.component';
import { DynamicOtFormComponent } from '../components/dynamic-ot-form/dynamic-ot-form.component';

type UnPromise<T> = T extends Promise<infer X> ? X : T;

@Component({
  selector: 'app-create-ot',
  templateUrl: './create-ot.component.html',
  styleUrls: ['./create-ot.component.scss']
})
export class CreateOtComponent implements OnInit {
  os: ReturnType<typeof liff.getOS>;
  profile!: UnPromise<ReturnType<typeof liff.getProfile>>;
  otTypes: any[] = [
    { id: 1, name: 'OT 1.0 เท่า' },
    { id: 2, name: 'OT 1.5 เท่า' },
    { id: 3, name: 'OT 3.0 เท่า' }
  ];
  dynamicOtForm: any[] = [];

  constructor(private otService: OtService) { }

  addnewFormComponent(){
    this.dynamicOtForm.push({
      id: this.dynamicOtForm.length + 1,
      date: '',
      startTime: '',
      endTime: '',
      work: '',
      otType: 1,
    });
  }

  deleteFormAtIndex(index: number): void {
    this.dynamicOtForm.splice(index, 1);
  }

  ngOnInit(): void {
    this.initializeLiff();
  }

  initializeLiff(): void {
    liff.init({ liffId: '2000308881-Ljw6m3Vo' })
      .then(() => {
        this.os = liff.getOS();
        if (liff.isLoggedIn()) {
          this.fetchProfile();
        } else {
          liff.login();
        }
      })
      .catch(error=> {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        });
      });
  }

  fetchProfile(): void {
    liff.getProfile()
      .then(profile => {
        this.profile = profile;
        // this.getInitLeaveData();
        // console.log(this.profile);
      })
      .catch(console.error);
  }
}
