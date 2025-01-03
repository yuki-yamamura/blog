export class ListWithPagination<T> {
  private list: T[] = [];
  private maxItemsPerPage: number;
  private currentPage: number | undefined;

  constructor({
    list,
    maxItemsPerPage,
    currentPage,
  }: {
    list: T[];
    currentPage?: number;
    maxItemsPerPage: number;
  }) {
    this.list = list;
    this.currentPage = currentPage;
    this.maxItemsPerPage = maxItemsPerPage;
  }

  /**
   * whether the pagination should be shown or not
   */
  public get shouldShowPagination(): boolean {
    return this.list.length > this.maxItemsPerPage;
  }

  /**
   * the total number of pages
   */
  public get pageCount(): number {
    return Math.ceil(this.list.length / this.maxItemsPerPage);
  }

  /**
   * the list of page numbers
   */
  public get pageNumbers(): number[] {
    return Array.from(new Array(this.pageCount), (_, index) => index + 1);
  }

  /**
   * the list of items to be displayed on the current page
   */
  public get displayItems(): T[] {
    if (!this.currentPage) {
      return this.list;
    }
    const start = (this.currentPage - 1) * this.maxItemsPerPage;
    const end = start + this.maxItemsPerPage;

    return this.list.slice(start, end);
  }
}
