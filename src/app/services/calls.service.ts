import { Injectable } from '@angular/core';

import { Call, NewCall } from '../Models/Call';

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
  removeCall(id: number) {
    const index = this.calls.findIndex((call) => call.id === id);
    if (index > -1) this.calls.splice(index, 1);
  }
  addId(): number {
    if (!this.calls.length) return 1;
    return this.calls[this.calls.length - 1].id + 1;
  }
  addCallType({ id, callType }: Pick<Call, 'id' | 'callType'>) {
    const index = this.calls.findIndex((call) => call.id === id);
    if (index > -1) this.calls[index].callType = callType;
  }
}
