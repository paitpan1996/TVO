import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApproveStatusComponent } from './module/approve-status/approve-status.component';
import { LeaveStatusComponent } from './module/leave-status/leave-status.component';
import { WriteLeaveComponent } from './module/write-leave/write-leave.component';

const routes: Routes = [
  { path: 'write-leave' , component: WriteLeaveComponent },
  { path: 'leave-status' , component: LeaveStatusComponent },
  { path: 'appove-status' , component: ApproveStatusComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
