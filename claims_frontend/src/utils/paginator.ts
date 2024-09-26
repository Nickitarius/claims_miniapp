/**Class which stores an array and returns pages as it's sub-arrays. */
export class Paginator {
  constructor(
    public data: object[] = [],
    public itemsPerPage: number = 10,
    public pagesTotal: number = Math.floor(data.length / itemsPerPage) + 1,
    public currentPageIdx: number = 1,
  ) {}

  /**Returns a sub-array representing current page. */
  getCurrentPage() {
    return this.data.slice(
      this.itemsPerPage * (this.currentPageIdx - 1),
      this.itemsPerPage * this.currentPageIdx,
    );
  }

  /**
   * Increases current page index by 1 and returns the new current page.
   * If paginator is already at the last page, returns the last page.
   */
  goNextPage() {
    if (this.currentPageIdx <= this.pagesTotal) {
      this.currentPageIdx++;
    }
    return this.getCurrentPage();
  }

  /**
   * Decreases current page index by 1 and returns the new current page.
   * If paginator is already at the 1st page, returns the first page.
   */
  goPrevPage() {
    if (this.currentPageIdx > 1) {
      this.currentPageIdx--;
    }
    return this.getCurrentPage();
  }

  /**
   * Returns page with a specified index, if it is valid. Otherwise, throws an error.
   * This method DOES NOT change current page index.
   */
  getPageByIdx(index) {
    if (index < this.pagesTotal && index > 0) {
      return this.data.slice(this.itemsPerPage * (index - 1), this.itemsPerPage * index);
    } else {
      throw RangeError(
        `Page index '${index}' is out of range: min index is 1, max index is ${this.pagesTotal}.`,
      );
    }
  }

  /**
   * Sets current page index to the specified one, if it is valid.
   * Otherwise, throws an error.
   */
  setPageIdx(index) {
    if (index <= this.pagesTotal && index > 0) {
      this.currentPageIdx = index;
    } else {
      throw RangeError(
        `Page index '${index}' is out of range: min index is 1, max index is ${this.pagesTotal}.`,
      );
    }
  }
}
