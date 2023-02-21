import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WriteLeaveComponent } from './module/write-leave/write-leave.component';
import { LeaveStatusComponent } from './module/leave-status/leave-status.component';
import { ApproveStatusComponent } from './module/approve-status/approve-status.component';
import { EmployeeInformationComponent } from './module/employee/employee-information/employee-information.component';
import { EmployeeHistoryComponent } from './module/employee/employee-history/employee-history.component';
import { HistoryLeaveComponent } from './module/employee/history-leave/history-leave.component';

@NgModule({
  declarations: [
    AppComponent,
    WriteLeaveComponent,
    LeaveStatusComponent,
    ApproveStatusComponent,
    EmployeeInformationComponent,
    EmployeeHistoryComponent,
    HistoryLeaveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgSelectModule,
    FormsModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
