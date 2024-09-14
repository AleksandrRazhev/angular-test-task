import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { ModalComponent } from './components/shared/modal/modal.component';
import { ModalService } from './services/modal.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, HeaderComponent, ModalComponent, CommonModule],
})
export class AppComponent {
  constructor(public modalService: ModalService) {}
}
