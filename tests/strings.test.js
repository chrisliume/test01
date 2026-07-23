'use strict';

const { capitalize, slugify, truncate } = require('../src/strings');

describe('strings', () => {
  describe('capitalize', () => {
    it('capitalizes the first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
    });

    it('preserves the rest of the string', () => {
      expect(capitalize('hello world')).toBe('Hello world');
    });

    it('returns empty string for empty input', () => {
      expect(capitalize('')).toBe('');
    });

    it('returns empty string for non-string input', () => {
      expect(capitalize(123)).toBe('');
      expect(capitalize(null)).toBe('');
      expect(capitalize(undefined)).toBe('');
    });

    it('handles single character', () => {
      expect(capitalize('a')).toBe('A');
    });
  });

  describe('slugify', () => {
    it('converts string to slug', () => {
      expect(slugify('Hello World')).toBe('hello-world');
    });

    it('removes special characters', () => {
      expect(slugify('Hello, World!')).toBe('hello-world');
    });

    it('trims whitespace', () => {
      expect(slugify('  hello world  ')).toBe('hello-world');
    });

    it('replaces multiple spaces with single dash', () => {
      expect(slugify('hello   world')).toBe('hello-world');
    });

    it('handles underscores', () => {
      expect(slugify('hello_world')).toBe('hello-world');
    });

    it('returns empty string for non-string input', () => {
      expect(slugify(123)).toBe('');
      expect(slugify(null)).toBe('');
    });
  });

  describe('truncate', () => {
    it('does not truncate short strings', () => {
      expect(truncate('hello', 10)).toBe('hello');
    });

    it('truncates long strings with ellipsis', () => {
      expect(truncate('hello world this is long', 10)).toBe('hello w...');
    });

    it('uses default max length of 50', () => {
      const longStr = 'a'.repeat(60);
      expect(truncate(longStr)).toBe('a'.repeat(47) + '...');
    });

    it('returns empty string for non-string input', () => {
      expect(truncate(123)).toBe('');
      expect(truncate(null)).toBe('');
    });

    it('handles exact length', () => {
      expect(truncate('hello', 5)).toBe('hello');
    });
  });
});
