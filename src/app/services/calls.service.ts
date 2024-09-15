import { Injectable } from '@angular/core';
import { v4 } from 'uuid';

import { Call, NewCall } from '../Models/Call';

@Injectable({
  providedIn: 'root',
})
export class CallsService {
  calls: Call[] = localStorage.getItem('calls')
    ? JSON.parse(localStorage.getItem('calls') as string)
    : [];
  addCall(call: NewCall) {
    this.calls.push({ id: v4(), ...call });
  }
  saveCalls() {
    localStorage.setItem('calls', JSON.stringify(this.calls));
  }
  removeCall(id: string) {
    const index = this.calls.findIndex((call) => call.id === id);
    if (index > -1) this.calls.splice(index, 1);
  }
  addCallType({ id, callType }: Pick<Call, 'id' | 'callType'>) {
    const index = this.calls.findIndex((call) => call.id === id);
    if (index > -1) this.calls[index].callType = callType;
  }
}
