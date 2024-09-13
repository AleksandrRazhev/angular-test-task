import { Component, Input } from '@angular/core';
import { Call } from '../../../Models/Call';

@Component({
  selector: 'app-call-card',
  standalone: true,
  imports: [],
  templateUrl: './call-card.component.html',
  styleUrl: './call-card.component.css',
})
export class CallCardComponent {
  @Input() call!: Call;
}
