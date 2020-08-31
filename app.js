const field = document.querySelector('.field'),
      resultsBlock = document.querySelector('.results__values'),
      timeBlock = document.querySelector('.timer__time'),
      winBlock = document.querySelector('.win-block'),
      startBtn = document.querySelector('.button_start-game'),
      stopBtn = document.querySelector('.button_stop-game'),

      game = new Game(),
      timer = new Timer(),
      results = new Results('results')


Draw.gameCells(field, 'field__cell', 0.5)
Draw.results(resultsBlock, results.allResults, "You haven't won yet")

const cells = field.querySelectorAll('.field__cell')
game.init(cells, 0.5)

startBtn.onclick = () => {
  game.start(() => {
    results.add(timer.convertSeconds())
    Draw.results(resultsBlock, results.allResults, "You haven't won yet")
    stopGame()
    winBlock.classList.remove('win-block_disabled')
  })
  timer.start()
  Draw.startTime(timeBlock, 'timer.convertSeconds()', 1000)

  startBtn.classList.add('button_disabled')
  stopBtn.classList.remove('button_disabled')
}
stopBtn.onclick = () => {
  game.stop()
  stopGame()
}

function stopGame() {
  timer.stop()
  Draw.stopTime()
  startBtn.classList.remove('button_disabled')
  stopBtn.classList.add('button_disabled')
}
