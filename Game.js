class Game {
  constructor() {
  }

  /**
   * Fill this.allCells, bind move and check win on click
   *
   * @param {NodeList} cells - cells elements
   * @param {number} offsetForMove - add offset to left and top(default = 0)
   */
  init(cells, offsetForMove = 0) {
    /**
     * Array of objects for cells.
     * @type {*[]}
     */
    this.allCells = []

    /**
     * Current empty place
     * @type {object}
     */
    this.emptyPlace = {
      stepsLeft: 3,
      stepsTop: 3
    }

    this.isGameStarted = false
    this.offsetForMove = offsetForMove

    for (let cell of cells) {
      let cellId = cell.innerText - 1

      this.allCells.push({
        cellId,
        stepsLeft: cellId % 4,
        stepsTop: (cellId - (cellId % 4)) / 4,
        element: cell
      })

      cell.onclick = () => {
        this.move(cellId)

        if (this.isGameStarted) {
          if (this.isWin()) {
            this.isGameStarted = false
            this.callbackToWin()
          }
        }
      }
    }
  }

  /**
   * Move cell to empty place
   *
   * @param {number} cellId - id of cell in this.allCells
   */
  move(cellId) {
    if (!this.checkNewPlace(cellId)) return

    const cell = this.allCells[cellId],
          emptyStepsLeft = this.emptyPlace.stepsLeft,
          emptyStepsTop = this.emptyPlace.stepsTop

    cell.element.style.left = `${emptyStepsLeft * 25 + this.offsetForMove}%`
    cell.element.style.top = `${emptyStepsTop * 25 + this.offsetForMove}%`

    this.emptyPlace.stepsLeft = cell.stepsLeft
    this.emptyPlace.stepsTop = cell.stepsTop

    cell.stepsLeft = emptyStepsLeft
    cell.stepsTop = emptyStepsTop
  }

  /**
   * Checks if the cell can move to empty space
   *
   * @param {number} cellId - id of cell in this.allCells
   * @returns {boolean} - true: can, false: can't
   */
  checkNewPlace(cellId) {
    let cell = this.allCells[cellId]
    let stepsLeftDiff = Math.abs( this.emptyPlace.stepsLeft - cell.stepsLeft),
        stepsTopDiff = Math.abs(this.emptyPlace.stepsTop - cell.stepsTop)

    return stepsLeftDiff + stepsTopDiff === 1;
  }

  /**
   * Start the game
   *
   * @param {function} callbackToWin - will be executed at the victory
   */
  start(callbackToWin) {
    this.isGameStarted = true
    this.callbackToWin = callbackToWin

    let numbersOrder = [...Array(15).keys()].sort(() => Math.random() - 0.5)
    this.shuffle(numbersOrder)
  }

  /**
   * Stop the game
   */
  stop() {
    if (!this.isGameStarted) return

    this.isGameStarted = false
  }


  /**
   * Checks if cells are correctly positioned or not
   */
  isWin() {
    return this.isGameStarted && this.allCells.every(cell => {
      return cell.cellId === cell.stepsLeft + cell.stepsTop * 4
    })
  }

  /**
   * Change cells position using numbersOrder(numbers from 0 to 14)
   * @param {array} numbersOrder
   */
  shuffle(numbersOrder) {
    for (let i = 0; i <= 14; i++) {
      const cell = this.allCells[i]

      cell.stepsLeft = numbersOrder[i] % 4
      cell.stepsTop = (numbersOrder[i] - cell.stepsLeft) / 4

      cell.element.style.left = `${cell.stepsLeft * 25 + this.offsetForMove}%`
      cell.element.style.top = `${cell.stepsTop * 25 + this.offsetForMove}%`
    }
    this.emptyPlace = {
      stepsLeft: 3,
      stepsTop: 3
    }
  }
}