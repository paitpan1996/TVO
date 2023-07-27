import { Component, OnInit } from '@angular/core';
import liff from '@line/liff/dist/lib';
import * as moment from 'moment';
import { getObject } from 'src/app/model/liff.model';
import { MedicalService } from 'src/app/service/medical.service';
import Swal from 'sweetalert2';

type UnPromise<T> = T extends Promise<infer X>? X : T;

@Component({
  selector: 'app-medical-history',
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.scss']
})
export class MedicalHistoryComponent implements OnInit {
  constructor (private medicalService: MedicalService) {}

  os: ReturnType<typeof liff.getOS>;
  profile!: UnPromise<ReturnType<typeof liff.getProfile>>;
  dataMedical: any = [];

  ngOnInit(): void {
    liff.init({liffId:'1657746390-LeORq250'}).then(()=>{
      this.os=liff.getOS();
      if(liff.isLoggedIn()){
        liff.getProfile().then( async profile =>{
          this.profile = profile;
          await this.getInitMedicalData();
          // console.log(this.profile);
        }).catch(console.error);
      }else{
        liff.login()
      }
    }).catch(console.error);
  }

  getInitMedicalData() {
    return new Promise<any>((resolve, reject) => {
      const param = {
        line_id: this.profile?.userId // Production
        // line_id: 'U4a029dddc9d4203e46496b17125c8529' // ของลูกค้าไว้ทดสอบ
      }

      this.medicalService.getMedicalHistory(param).subscribe({
        next: (res: any) => {
          console.log(res);
          for(let i = 0; i < res.length; i++) {
            res[i].healthdate_ = moment(res[i].healthdate_).format("DD/MM/YYYY");
          }
          this.dataMedical = res;
          resolve(1)
        }
      });
    });
  }
}
