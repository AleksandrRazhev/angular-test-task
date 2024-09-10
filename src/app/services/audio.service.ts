import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  recorder: MediaRecorder | null = null;
  blob: Blob[] = [];
  startStream(): Promise<MediaStream> {
    return navigator.mediaDevices.getUserMedia({ audio: true });
  }
  startRecord(mediaStream: MediaStream) {
    this.recorder = new MediaRecorder(mediaStream);
    this.recorder.ondataavailable = (event) => {
      this.blob.push(event.data);
    };
    this.recorder.start();
  }
  stopRecord() {
    if (this.recorder) {
      this.recorder.stop();
      const audioBlob = new Blob(this.blob, { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
    }
  }
}
