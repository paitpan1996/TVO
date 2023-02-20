import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApproveStatusComponent } from './module/approve-status/approve-status.component';
import { EmployeeHistoryComponent } from './module/employee/employee-history/employee-history.component';
import { EmployeeInformationComponent } from './module/employee/employee-information/employee-information.component';
import { HistoryLeaveComponent } from './module/employee/history-leave/history-leave.component';
import { LeaveStatusComponent } from './module/leave-status/leave-status.component';
import { WriteLeaveComponent } from './module/write-leave/write-leave.component';

const routes: Routes = [
  { path: 'write-leave' , component: WriteLeaveComponent },
  { path: 'leave-status' , component: LeaveStatusComponent },
  { path: 'appove-status' , component: ApproveStatusComponent },
  { path: 'employee-information' , component: EmployeeInformationComponent },
  { path: 'employee-history' , component: EmployeeHistoryComponent },
  { path: 'history-leave' , component: HistoryLeaveComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
