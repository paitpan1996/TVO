import { Component, EventEmitter, Output } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-dynamic-ot-form',
  templateUrl: './dynamic-ot-form.component.html',
  styleUrls: ['./dynamic-ot-form.component.scss']
})
export class DynamicOtFormComponent {
  @Output() deleteForm = new EventEmitter<void>();
  @Output() formDataSubmitted = new EventEmitter<any>();
  otDate: string = '';
  otStartTime: string = '';
  otEndTime: string = '';
  otHourDiff: string = '';
  otType: number = 1;

  onSubmitForm(): void {
    const FormData = {
      otDate: this.otDate,
      otStartTime: this.otStartTime,
      otEndTime: this.otEndTime,
      otHourDiff: this.otHourDiff,
      otType: this.otType,
    }
    this.formDataSubmitted.emit(FormData);
  }

  onDeleteForm(): void {
    this.deleteForm.emit();
  }

  calculateHourDiff() {
    if (this.otStartTime && this.otEndTime) {
      const start = moment(`1970-01-01T${this.otStartTime}`);
      const end = moment(`1970-01-01T${this.otEndTime}`);
      const diff = end.diff(start, 'hours', true); // Calculate difference in hours
      this.otHourDiff = diff.toFixed(2);
    } else {
      this.otHourDiff = '';
    }
  }

  onStartTimeChange(event: Event){
    this.otStartTime = (event.target as HTMLInputElement).value;
    this.calculateHourDiff();
  }

  onEndTimeChange(event: Event){
    this.otEndTime = (event.target as HTMLInputElement).value;
    this.calculateHourDiff();
  }
}
