import { Component, ViewChild } from '@angular/core';

import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  constructor(public modalService: ModalService) {}
}
