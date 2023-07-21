import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class MedicalService {
  url = environment.path;
  medical = 'api/external/'
  constructor(
    private http: HttpClient
  ) {}

  getMedicalHistory(param: any) {
    return this.http.post(this.url + this.medical + 'getMedicalHistory', param);
  }
}
