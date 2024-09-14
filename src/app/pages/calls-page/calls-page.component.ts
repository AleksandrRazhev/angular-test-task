import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CallsService } from '../../services/calls.service';
import { CallCardComponent } from '../../components/shared/call-card/call-card.component';
import { ModalComponent } from '../../components/shared/modal/modal.component';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-calls-page',
  standalone: true,
  imports: [CommonModule, CallCardComponent, ModalComponent],
  templateUrl: './calls-page.component.html',
  styleUrl: './calls-page.component.css',
})
export class CallsPageComponent {
  ngOnInit() {
    this.callsService.getAll();
  }
  ngOnDestroy() {}
  constructor(
    public callsService: CallsService,
    public modalService: ModalService
  ) {}
}
