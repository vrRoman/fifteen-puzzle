class Draw {
  constructor() {
  }

  /**
   * Starts drawing time
   *
   * @param {Element} element - HTML element to render time
   * @param {string} propertyName - Name of dynamic time variable or expression
   * @param {number} updateFrequency - Frequency to update time
   */
  static startTime(element, propertyName, updateFrequency) {
    this._interval = setInterval(() => {
      element.innerText = eval(propertyName)
    }, updateFrequency)
  }

  /**
   * Stops drawing time
   */
  static stopTime() {
    clearInterval(this._interval)
  }

  /**
   * Draws results as <ul><li>Result</li></ul>
   *
   * @param {Element} element - HTML element to render results
   * @param {array} allResults - array of results to render
   * @param {string} textForNoResults - the string to be shown if no results are found(default = No results)
   */
  static results(element, allResults, textForNoResults = 'No results') {
    if (allResults.length > 0) {
      let list = document.createElement('ul')
      for (let result of allResults) {
        let resultElement = document.createElement('li')
        resultElement.innerText = result
        list.appendChild(resultElement)
      }
      element.innerHTML = list.outerHTML
    } else {
      element.innerText = textForNoResults
    }
  }

  /**
   * Draw cells for puzzle
   * Position is measured in percentage
   *
   * @param {Element} fieldElement - field to add cells
   * @param {string} cellClass - class for cells(default = undefined)
   * @param {number} increasePosition - how much to increase position(default = 0)
   */
  static gameCells(fieldElement, cellClass = undefined, increasePosition = 0) {
    for (let i = 1; i <= 15; i++) {
      const cell = document.createElement('div')
      cell.innerText = String(i)
      if (cellClass) {
        cell.classList.add(cellClass)
      }

      const stepsLeft = (i - 1) % 4
      const stepsTop = ((i - 1) - stepsLeft) / 4

      cell.style.left = `${stepsLeft * 25 + increasePosition}%`
      cell.style.top = `${stepsTop * 25 + increasePosition}%`

      fieldElement.appendChild(cell)
    }
  }
}