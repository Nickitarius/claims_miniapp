/** Paginator class. */
export class Paginator {
  constructor(
    public data: object[] = [],
    public itemsPerPage: number = 10,
    public pagesTotal: number = (data.length % itemsPerPage) + 1,
    public currentPageIdx: number = 1,
  ) {}

  getCurrentPage() {
    return this.data.slice(
      this.itemsPerPage * (this.currentPageIdx - 1),
      this.itemsPerPage * this.currentPageIdx,
    );
  }

  nextPage() {
    if (this.currentPageIdx < this.pagesTotal - 1) {
      this.currentPageIdx++;
    }
    return this.getCurrentPage();
  }

  prevPage() {
    if (this.currentPageIdx > 0) {
      this.currentPageIdx--;
    }
    return this.getCurrentPage();
  }

  getPageByIdx(index) {
    if (index < this.pagesTotal && index > 0) {
      return this.data.slice(this.itemsPerPage * (index - 1), this.itemsPerPage * index);
    } else {
      return this.getCurrentPage();
    }
  }

  setPageIdx(index) {
    if (index < this.pagesTotal && index > 0) {
      this.currentPageIdx = index;
    }
  }
}
