import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { ModalService } from './services/modal.service';
import { UserService } from './services/user.service';
import { CallsService } from './services/calls.service';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, HeaderComponent],
  providers: [UserService, CallsService],
})
export class AppComponent {
  constructor(public modalService: ModalService) {}
}
