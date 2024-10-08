export class Timer {
  timer: number = 0;
  interval: ReturnType<typeof setTimeout> | null = null;
  start() {
    if (this.interval) return;
    this.timer = 0;
    this.interval = setInterval(() => this.timer++, 1000);
  }
  stop() {
    if (this.interval) clearInterval(this.interval);
    this.interval = null;
  }
}
