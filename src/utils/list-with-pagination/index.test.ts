import { ListWithPagination } from './index';
import { describe, test, expect } from 'vitest';

describe('ListWithPagination', () => {
  describe('shouldShowPagination', () => {
    test('should show pagination if the pagination items are more than one', () => {
      // arrange
      const list = [1, 2, 3];
      const maxItemsPerPage = 2;

      // act
      const pagination = new ListWithPagination({ list, maxItemsPerPage });

      // assert
      expect(pagination.shouldShowPagination).toBe(true);
    });

    test('should not show pagination if the pagination item is only one', () => {
      // arrange
      const list = [1, 2];
      const maxItemsPerPage = 2;

      // act
      const pagination = new ListWithPagination({ list, maxItemsPerPage });

      // assert
      expect(pagination.shouldShowPagination).toBe(false);
    });
  });

  describe('pageCount', () => {
    test('should  correct pageCount, when the list length is less than the maximum count', () => {
      // arrange
      const list = [1, 2, 3, 4];
      const maxItemsPerPage = 5;

      // act
      const pagination = new ListWithPagination({ list, maxItemsPerPage });

      // assert
      expect(pagination.pageCount).toBe(1);
    });

    test('should return correct pageCount, when the list length is the same as the maximum count', () => {
      // arrange
      const list = [1, 2, 3, 4, 5];
      const maxItemsPerPage = 5;

      // act
      const pagination = new ListWithPagination({ list, maxItemsPerPage });

      // assert
      expect(pagination.pageCount).toBe(1);
    });

    test('should return correct pageCount, , when the list length is greater than the maximum count', () => {
      // arrange
      const list = [1, 2, 3, 4, 5, 6];
      const maxItemsPerPage = 5;

      // act
      const pagination = new ListWithPagination({ list, maxItemsPerPage });

      // assert
      expect(pagination.pageCount).toBe(2);
    });
  });

  describe('pageNumbers', () => {
    test('should return correct pageNumbers', () => {
      // arrange
      const list = [1, 2, 3, 4, 5];
      const maxItemsPerPage = 2;

      // act
      const pagination = new ListWithPagination({ list, maxItemsPerPage });

      // assert
      expect(pagination.pageNumbers).toEqual([1, 2, 3]);
    });
  });

  describe('displayItems', () => {
    test('should return correct display items for the current page', () => {
      // arrange
      const list = [1, 2, 3, 4, 5];
      const maxItemsPerPage = 2;
      const currentPage = 2;

      // act
      const pagination = new ListWithPagination({ list, maxItemsPerPage, currentPage });

      // assert
      expect(pagination.displayItems).toEqual([3, 4]);
    });

    test('should return all items if currentPage is not provided', () => {
      // arrange
      const list = [1, 2, 3, 4, 5];
      const maxItemsPerPage = 2;

      // act
      const pagination = new ListWithPagination({ list, maxItemsPerPage });

      // assert
      expect(pagination.displayItems).toEqual(list);
    });
  });
});
