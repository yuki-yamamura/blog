import { formatDate } from '.';
import { describe, test, expect } from 'vitest';

describe('date', () => {
  describe('formatDate', () => {
    test('should return `YYYY-MM-DD` date if no template is provided', () => {
      // act, assert
      expect(formatDate('2025-01-01')).toBe('2025-01-01');
    });

    test('should return `YYYY/MM/DD` date if template is provided', () => {
      // act, assert
      expect(formatDate('2025-01-01', 'YYYY/MM/DD')).toBe('2025/01/01');
    });
  });
});
