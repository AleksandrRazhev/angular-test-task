import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import dayjs from 'dayjs';

import { Call, CallType } from '../../Models/Call';
import { CallsService } from '../../services/calls.service';
import { ModalService } from '../../services/modal.service';
import { TypeSelectionService } from '../../services/type-selection.service';

@Component({
  selector: 'app-call-card',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './call-card.component.html',
  styleUrl: './call-card.component.css',
})
export class CallCardComponent {
  constructor(
    private callsService: CallsService,
    private typeSelectionService: TypeSelectionService,
    private modalService: ModalService
  ) {}
  @Input() call!: Call;
  form = new FormGroup({
    inputValue: new FormControl<string>(''),
  });
  onInputChange() {
    const value = this.form.controls.inputValue.value?.toLowerCase();
    const callsTypes: CallType[] = ['a', 'b', 'c', 'd'] as const;
    if (callsTypes.includes(value as CallType)) {
      this.callsService.addCallType({
        id: this.call.id,
        callType: value as CallType,
      });
      this.callsService.saveCalls();
    }
    this.form.controls.inputValue.setValue('');
  }
  removeCall() {
    this.callsService.removeCall(this.call.id);
    this.callsService.saveCalls();
  }
  getFormattedDate(timestamp: number) {
    return dayjs(timestamp).format('HH:mm.ss - DD.MM.YYг');
  }
  openModal() {
    this.typeSelectionService.setId(this.call.id);
    this.modalService.open();
  }
  get callDuration() {
    return dayjs(this.call.timestampEnd).diff(
      this.call.timestampStart,
      'seconds'
    );
  }
}
