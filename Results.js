class Results {
  /**
   * @param {string} resultsKey - Key of the results in localStorage
   */
  constructor(resultsKey) {
    this.resultsKey = resultsKey
  }

  /**
   * If length of results array > 8, results after 8 are deleted
   * Overwrites old value
   *
   * @type Array
   * @param resultsValue - array of all results to save
   */
  set allResults(resultsValue) {
    if (resultsValue.length > 8) {
      resultsValue.splice(8, resultsValue.length - 8)
    }
    localStorage.setItem(this.resultsKey, JSON.stringify(resultsValue))
  }

  /**
   * @returns {Array} - array of saved results
   */
  get allResults() {
    return JSON.parse(localStorage.getItem(this.resultsKey)) ? JSON.parse(localStorage.getItem(this.resultsKey)) : []
  }

  /**
   * Add result to allResults
   * If length of results array > 8, results after 8 are deleted
   *
   * @param {string} result - result to add
   */
  add(result) {
    let newResults = this.allResults
    newResults.unshift(result)
    this.allResults = newResults
  }


}