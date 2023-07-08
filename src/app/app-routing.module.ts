import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookMeetRoomComponent } from './module-room/book-meet-room/book-meet-room.component';
import { HistoryRoomComponent } from './module-room/history-room/history-room.component';
import { ApproveStatusComponent } from './module/approve-status/approve-status.component';
import { EmployeeHistoryComponent } from './module/employee/employee-history/employee-history.component';
import { EmployeeInformationComponent } from './module/employee/employee-information/employee-information.component';
import { HistoryLeaveComponent } from './module/employee/history-leave/history-leave.component';
import { HistoryComponent } from './module/history/history/history.component';
import { SubHistoryComponent } from './module/history/sub-history/sub-history.component';
import { LeaveStatusComponent } from './module/leave-status/leave-status.component';
import { WriteLeaveComponent } from './module/write-leave/write-leave.component';
import { LeaveHistoryComponent } from './module/leave-history/leave-history.component';

const routes: Routes = [
  { path: 'write-leave' , component: WriteLeaveComponent },
  { path: 'leave-status' , component: LeaveStatusComponent },
  { path: 'approve-status' , component: ApproveStatusComponent },
  { path: 'employee-information' , component: EmployeeInformationComponent },
  { path: 'employee-history' , component: EmployeeHistoryComponent },
  { path: 'history-leave' , component: HistoryLeaveComponent },
  { path: 'history' , component: HistoryComponent },
  { path: 'sub-history' , component: SubHistoryComponent },
  { path: 'book-meet' , component: BookMeetRoomComponent },
  { path: 'book-history' , component: HistoryRoomComponent },
  { path: 'leave-history' , component: LeaveHistoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
