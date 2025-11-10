// lib/utils.test.ts
import { stripHtml, calculateReadingTime, formatDate } from './utils';

describe('lib/utils', () => {
  // Tests for stripHtml
  describe('stripHtml', () => {
    it('should remove all HTML tags from a string', () => {
      const html = '<p>Hello <b>World</b></p>';
      expect(stripHtml(html)).toBe('Hello World');
    });

    it('should handle strings with no HTML', () => {
      const text = 'This is a plain text string';
      expect(stripHtml(text)).toBe(text);
    });

    it('should handle multiple spaces between tags', () => {
      const html = '<div>Hello</div>   <span>World</span>';
      expect(stripHtml(html)).toBe('Hello World');
    });

    it('should return an empty string if input is empty', () => {
      expect(stripHtml('')).toBe('');
    });
  });

  // Tests for calculateReadingTime
  describe('calculateReadingTime', () => {
    it('should return 1 for a short text', () => {
      const html = '<p>This is a short text.</p>';
      expect(calculateReadingTime(html)).toBe(1);
    });

    it('should calculate the correct reading time', () => {
      const longText = '<p>word '.repeat(400) + '</p>'; // 400 words
      expect(calculateReadingTime(longText)).toBe(2); // 400 / 200 = 2
    });

    it('should work with a custom WPM', () => {
      const text = '<p>word '.repeat(300) + '</p>'; // 300 words
      expect(calculateReadingTime(text, 150)).toBe(2); // 300 / 150 = 2
    });

    it('should always return at least 1', () => {
      expect(calculateReadingTime('')).toBe(1);
    });
  });

  // Tests for formatDate
  describe('formatDate', () => {
    it('should format a valid ISO date string correctly for id-ID locale', () => {
      const dateStr = '2023-10-27T10:00:00Z';
      const { human, iso } = formatDate(dateStr);
      expect(human).toBe('27 Oktober 2023');
      expect(iso).toBe(dateStr);
    });

    it('should handle another locale', () => {
      const dateStr = '2023-12-25T10:00:00Z';
      const { human } = formatDate(dateStr, 'en-US');
      expect(human).toBe('December 25, 2023');
    });

    it('should return a placeholder for an invalid date string', () => {
      const { human, iso } = formatDate('not a date');
      expect(human).toBe('-');
      expect(iso).toBeUndefined();
    });

    it('should handle different date formats that Date constructor can parse', () => {
        const dateStr = '25 Dec 2023';
        const { human } = formatDate(dateStr, 'en-US');
        expect(human).toBe('December 25, 2023');
    });
  });
});
