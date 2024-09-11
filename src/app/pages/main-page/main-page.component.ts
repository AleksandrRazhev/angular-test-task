import { Component } from '@angular/core';

import { TimerService } from '../../services/timer.service';
import { AudioService } from '../../services/audio.service';
import { ITextButtons } from '../../Models/Buttons';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [NgClass],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent {
  constructor(
    public timerService: TimerService,
    public audioService: AudioService
  ) {}
  textButtons: ITextButtons = {
    topButton: 'Начать разговор',
    bottomButton: 'Нет записей',
  };
  async onClickTopButton() {
    if (this.audioService.isRecording) {
      this.audioService.stopRecord();
      this.timerService.stop();
      this.textButtons.topButton = 'Начать разговор';
    } else {
      try {
        const mediaStream = await this.audioService.startStream();
        this.audioService.startRecord(mediaStream);
        this.timerService.start();
        this.textButtons.topButton = 'Окончить разговор';
        this.textButtons.bottomButton = 'Воспроизвести запись';
      } catch (error) {
        console.error("I can't record", error);
      }
    }
  }
  onClickBottomButton() {
    if (!this.audioService.blob[0]) return;
    if (this.audioService.isPlaying) {
      this.audioService.stopPlay();
      this.textButtons.bottomButton = 'Воспроизвести запись';
    } else {
      this.audioService.statPlay(() => {
        this.textButtons.bottomButton = 'Воспроизвести запись';
      });
      this.textButtons.bottomButton = 'Остановить воспроизведение';
    }
  }
}
