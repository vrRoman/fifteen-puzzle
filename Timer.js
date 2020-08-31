class Timer {
  /**
   * startTime is measured in seconds!
   * @param {number} startTime - counting will start from startTime(seconds)
   */
  constructor(startTime = 0) {
    this.startTime = startTime
  }

  /**
   * this.currentTime - number of elapsed seconds
   *
   * Increases this.currentTime every second(At the beginning this.currentTime = this.startTime)
   */
  start() {
    this.currentTime = this.startTime
    this._interval = setInterval(() => {
      this.currentTime++
    }, 1000)
  }

  /**
   * Stops increasing this.currentTime
   */
  stop() {
    clearInterval(this._interval)
  }

  /**
   * Convert seconds to string format: '0:00:00'
   *
   * @param {number} time - number of seconds to convert(default = this.currentTime)
   * @return {string} - time like this: '0:00:00'
   */
  convertSeconds(time = this.currentTime) {
    let seconds = time
    let minutes = (seconds - (seconds % 60)) / 60

    let hours = (minutes - (minutes % 60)) / 60
    minutes = minutes % 60
    seconds = seconds % 60

    return `${hours}:${minutes > 9 ? minutes : '0' + minutes}:${seconds > 9 ? seconds : '0' + seconds}`
  }
}