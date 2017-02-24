class Clock {
  constructor() {
    // 1. Create a Date object.
    // 2. Store the hours, minutes, and seconds.
    // 3. Call printTime.
    // 4. Schedule the tick at 1 second intervals.
    let currentTime = new Date();
    this.hours = currentTime.getHours();
    this.minutes = currentTime.getMinutes();
    this.seconds = currentTime.getSeconds();
    this._tick();
  }

  printTime() {
    // Format the time in HH:MM:SS
    // Use console.log to print it.
    let hourString = this.hours, minuteString = this.minutes;
    let secondString = this.seconds;
    if (this.hours < 10) {
      hourString = '0' + this.hours;
    }
    if (this.minutes < 10) {
      minuteString = '0' + this.minutes;
    }
    if (this.seconds < 10) {
      secondString = '0' + this.seconds;
    }
    console.log(`${hourString}:${minuteString}:${secondString}`);
  }

  _tick() {
    // 1. Increment the time by one second.
    // 2. Call printTime.
    setInterval( () => {
      this.seconds++;
      if (this.seconds === 60) {
        this.seconds = 0;
        this.minutes++;
      }
      if (this.minutes === 60) {
        this.minutes = 0;
        this.hours++;
      }
      if (this.hours === 24) {
        this.hours = 0;
      }
      this.printTime();
    }, 1000);
  }
}

const clock = new Clock();
