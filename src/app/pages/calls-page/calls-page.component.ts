import { Component } from '@angular/core';
import { CallsService } from '../../services/calls.service';

@Component({
  selector: 'app-calls-page',
  standalone: true,
  imports: [],
  templateUrl: './calls-page.component.html',
  styleUrl: './calls-page.component.css',
})
export class CallsPageComponent {
  ngOnInit() {
    this.callsService.getAll();
    // this.callsService.addCall({
    //   username: 'New User',
    //   timestampStart: Date.now(),
    //   timestampEnd: Date.now() + 10000,
    //   callDuration: 10000,
    // });
    this.callsService.saveCalls();
  }
  ngOnDestroy() {
    console.log(this.callsService.calls);
  }
  constructor(public callsService: CallsService) {}
}
