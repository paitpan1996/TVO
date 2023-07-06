import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

import { FilterPipe } from './filter.pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WriteLeaveComponent } from './module/write-leave/write-leave.component';
import { LeaveStatusComponent } from './module/leave-status/leave-status.component';
import { ApproveStatusComponent } from './module/approve-status/approve-status.component';
import { EmployeeInformationComponent } from './module/employee/employee-information/employee-information.component';
import { EmployeeHistoryComponent } from './module/employee/employee-history/employee-history.component';
import { HistoryLeaveComponent } from './module/employee/history-leave/history-leave.component';
import { HistoryComponent } from './module/history/history/history.component';
import { SubHistoryComponent } from './module/history/sub-history/sub-history.component';
import { BookMeetRoomComponent } from './module-room/book-meet-room/book-meet-room.component';
import { HistoryRoomComponent } from './module-room/history-room/history-room.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LeaveHistoryComponent } from './module/leave-history/leave-history.component';

@NgModule({
  declarations: [
    AppComponent,
    WriteLeaveComponent,
    LeaveStatusComponent,
    ApproveStatusComponent,
    EmployeeInformationComponent,
    EmployeeHistoryComponent,
    HistoryLeaveComponent,
    FilterPipe,
    HistoryComponent,
    SubHistoryComponent,
    BookMeetRoomComponent,
    HistoryRoomComponent,
    LeaveHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgSelectModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatInputModule,
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'th-TH'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
