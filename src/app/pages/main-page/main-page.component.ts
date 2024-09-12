import { Component } from '@angular/core';
import { NgClass } from '@angular/common';

import { TimerService } from '../../services/timer.service';
import { AudioService } from '../../services/audio.service';
import { ITextButtons } from '../../Models/Buttons';

@Component({
  selector: 'app-main-page',
  standalone: true,
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
  imports: [NgClass],
})
export class MainPageComponent {
  constructor(public audioService: AudioService) {}
  ngOnInit() {
    if (this.audioService.blob[0])
      this.textButtons.bottomButton = 'Воспроизвести запись';
  }
  ngOnDestroy() {
    this.audioService.revokeURL();
    this.recordTimer.stop();
    this.playTimer.stop();
    if (this.audioService.isRecording) this.audioService.stopRecord();
    if (this.audioService.isPlaying) this.audioService.stopPlay();
  }
  recordTimer: TimerService = new TimerService();
  playTimer: TimerService = new TimerService();
  textButtons: ITextButtons = {
    topButton: 'Начать разговор',
    bottomButton: 'Нет записей',
  };
  async onClickTopButton() {
    if (this.audioService.isRecording) {
      this.audioService.stopRecord();
      this.recordTimer.stop();
      this.textButtons.topButton = 'Начать разговор';
    } else {
      try {
        const mediaStream = await this.audioService.startStream();
        this.audioService.startRecord(mediaStream);
        this.recordTimer.start();
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
      this.playTimer.stop();
      this.textButtons.bottomButton = 'Воспроизвести запись';
    } else {
      this.playTimer.start();
      this.audioService.statPlay(() => {
        this.playTimer.stop();
        this.textButtons.bottomButton = 'Воспроизвести запись';
      });
      this.textButtons.bottomButton = 'Остановить воспроизведение';
    }
  }
}
