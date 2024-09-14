import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CallsService } from '../../services/calls.service';
import { CallCardComponent } from '../../components/shared/call-card/call-card.component';

@Component({
  selector: 'app-calls-page',
  standalone: true,
  imports: [CommonModule, CallCardComponent],
  templateUrl: './calls-page.component.html',
  styleUrl: './calls-page.component.css',
})
export class CallsPageComponent {
  ngOnInit() {
    this.callsService.getAll();
    // this.callsService.addCall({
    //   username:
    //     'NewUserNewUserNewUserNewUserNewUserNewUserNewUserNewUserNewUserNewUserNewUserNewUser',
    //   timestampStart: Date.now(),
    //   timestampEnd: Date.now() + 10000,
    //   callDuration: 10000,
    // });
    // this.callsService.saveCalls();
    // this.callsService.removeCall(0);
  }
  ngOnDestroy() {}
  constructor(public callsService: CallsService) {}
}
