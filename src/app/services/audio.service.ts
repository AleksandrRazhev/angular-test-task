import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  recorder: MediaRecorder | null = null;
  private blob: BlobPart[] = [];
  private audioUrl: string = '';
  private audioElement: HTMLAudioElement = new Audio();
  isRecording: boolean = false;
  isPlaying: boolean = false;
  startStream(): Promise<MediaStream> {
    return navigator.mediaDevices.getUserMedia({ audio: true });
  }
  startRecord(mediaStream: MediaStream) {
    if (this.audioUrl) URL.revokeObjectURL(this.audioUrl);
    this.recorder = new MediaRecorder(mediaStream);
    this.recorder.ondataavailable = (event) => {
      this.blob = [event.data];
    };
    this.recorder.start();
    this.isRecording = true;
  }
  stopRecord() {
    this.isRecording = false;
    if (this.recorder) {
      this.recorder.stop();
    }
  }
  statPlay() {
    if (this.isRecording) return;
    const audioBlob = new Blob(this.blob, { type: 'audio/wav' });
    this.audioUrl = URL.createObjectURL(audioBlob);
    this.audioElement.src = this.audioUrl;
    this.isPlaying = true;
    this.audioElement.play();
    this.audioElement.onended = () => {
      this.isPlaying = false;
    };
  }
  stopPlay() {
    this.audioElement.pause();
    this.audioElement.currentTime = 0;
    this.isPlaying = false;
  }
}
