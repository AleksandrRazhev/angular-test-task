import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CallsService } from '../../services/calls.service';
import { CallCardComponent } from '../../components/call-card/call-card.component';
import { ModalComponent } from '../../components/shared/modal/modal.component';
import { ModalService } from '../../services/modal.service';
import { TypeSelectionComponent } from '../../components/type-selection/type-selection.component';

@Component({
  selector: 'app-calls-page',
  standalone: true,
  imports: [
    CommonModule,
    CallCardComponent,
    ModalComponent,
    TypeSelectionComponent,
  ],
  templateUrl: './calls-page.component.html',
  styleUrl: './calls-page.component.css',
})
export class CallsPageComponent {
  ngOnDestroy() {}
  constructor(
    public callsService: CallsService,
    public modalService: ModalService
  ) {}
}
