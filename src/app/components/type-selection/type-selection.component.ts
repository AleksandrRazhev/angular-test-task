import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { TypeSelectionService } from '../../services/type-selection.service';
import { CallsService } from '../../services/calls.service';
import { Call, CallType } from '../../Models/Call';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-type-selection',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './type-selection.component.html',
  styleUrl: './type-selection.component.css',
})
export class TypeSelectionComponent {
  ngOnInit() {
    const call = this.callsService.calls.find(
      ({ id }) => id === this.typeSelectionService.id
    );
    if (!call) return;
    this.call = call;
    if (call.callType) this.form.controls.callType.setValue(call.callType);
  }
  ngOnDestroy() {
    this.typeSelectionService.setId(null);
  }
  call: Call | null = null;
  form = new FormGroup({
    callType: new FormControl<CallType | null>(null),
  });
  constructor(
    private typeSelectionService: TypeSelectionService,
    private callsService: CallsService,
    private modalService: ModalService
  ) {}
  submit() {
    const id = this.call?.id;
    const callType = this.form.controls.callType.value;
    if (!id) return;
    this.callsService.addCallType({ id, callType: callType ?? undefined });
    this.callsService.saveCalls();
    this.modalService.close();
  }
  clear() {
    this.form.controls.callType.setValue(null);
  }
}
