import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ot-select-type',
  templateUrl: './ot-select-type.component.html',
  styleUrls: ['./ot-select-type.component.scss']
})
export class OtSelectTypeComponent {
  @Input() otTypes: any[] = [];
}
