export class ListWithPagination<T> {
  private list: T[] = [];
  private currentPage: number;
  private maxItemsPerPage: number;

  constructor({
    list,
    currentPage,
    maxItemsPerPage,
  }: {
    list: T[];
    currentPage: number;
    maxItemsPerPage: number;
  }) {
    this.list = list;
    this.currentPage = currentPage;
    this.maxItemsPerPage = maxItemsPerPage;

    this.shouldShowPagination = this.list.length > this.maxItemsPerPage;
    this.pageCount = Math.ceil(this.list.length / this.maxItemsPerPage);
  }

  /**
   * whether the pagination should be shown or not
   */
  public shouldShowPagination: boolean;

  /**
   * the total number of pages
   */
  public pageCount: number;

  /**
   * the list of page numbers
   */
  public pageNumbers: number[] = (() => {
    return Array.from(new Array(this.pageCount), (_, index) => index + 1);
  })();

  /**
   * the list of items to be displayed on the current page
   */
  public displayItems: T[] = (() => {
    const start = (this.currentPage - 1) * this.maxItemsPerPage;
    const end = start + this.maxItemsPerPage;

    return this.list.slice(start, end);
  })();
}
