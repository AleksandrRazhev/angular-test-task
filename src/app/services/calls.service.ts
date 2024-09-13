import { Injectable } from '@angular/core';

import { Call, CallType, NewCall } from '../Models/Call';

@Injectable({
  providedIn: 'root',
})
export class CallsService {
  constructor() {}
  calls: Call[] = [];
  getAll(): Call[] {
    const calls = localStorage.getItem('calls');
    if (!calls) return (this.calls = []);
    return (this.calls = JSON.parse(calls));
  }
  addCall(call: NewCall) {
    this.calls.push({ id: this.addId(), ...call });
  }
  saveCalls() {
    localStorage.setItem('calls', JSON.stringify(this.calls));
  }
  removeCall(index: number) {
    return this.calls.splice(index, 1);
  }
  addId(): number {
    if (!this.calls.length) return 1;
    return this.calls[this.calls.length - 1].id + 1;
  }
  addCallType(index: number, callType: CallType) {
    return (this.calls[index].callType = callType);
  }
}
