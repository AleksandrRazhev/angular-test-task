import { Component } from '@angular/core';

import { TimerService } from '../../services/timer.service';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent {
  constructor(
    public timerService: TimerService,
    public audioService: AudioService
  ) {}
  async start() {
    try {
      const mediaStream = await this.audioService.startStream();
      this.audioService.startRecord(mediaStream);
      this.timerService.start();
    } catch (error) {
      console.error("I can't record", error);
    }
  }
  async stop() {
    this.audioService.stopRecord();
    this.timerService.stop();
  }
}
