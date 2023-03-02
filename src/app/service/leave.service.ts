import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  url = environment.path;
  leave = 'api/leave/'

  constructor(
    private http: HttpClient
  ) { }

  getInitLeaveData(param: any) {
    return this.http.post(this.url + this.leave + 'getInitLeaveData', param);
  }

  addLeave(param: any) {
    return this.http.post(this.url + this.leave + 'addLeave', param);
  }

  doAttachFile(param: any) {
    return this.http.post(this.url + 'doAttachFile', param);
  }

  requestLeaveStatus(param: any) {
    return this.http.post(this.url + this.leave + 'requestLeaveStatus', param);
  }

  approveLeave(param: any) {
    return this.http.put(this.url + this.leave + 'approveLeave', param);
  }

  cancelLeave(param: any) {
    return this.http.delete(this.url + this.leave + 'cancelLeave', {
      body: param
    });
  }

  getLeaveQuota(param: any) {
    return this.http.post(this.url + this.leave + 'getLeaveQuota', param);
  }

  getEmployerList(param: any) {
    return this.http.post(this.url + this.leave + 'getEmployerList', param);
  }

  getEmployerLeaveQuota(param: any) {
    return this.http.post(this.url + this.leave + 'getEmployerLeaveQuota', param);
  }

  getEmployerLeaveHistory(param: any) {
    return this.http.post(this.url + this.leave + 'getEmployerLeaveHistory', param);
  }

}
