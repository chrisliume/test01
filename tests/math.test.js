'use strict';

const { add, subtract, multiply, divide } = require('../src/math');

describe('math', () => {
  describe('add', () => {
    it('adds two positive numbers', () => {
      expect(add(2, 3)).toBe(5);
    });

    it('adds negative numbers', () => {
      expect(add(-1, -2)).toBe(-3);
    });

    it('adds zero', () => {
      expect(add(5, 0)).toBe(5);
    });

    it('handles floating point', () => {
      expect(add(0.1, 0.2)).toBeCloseTo(0.3);
    });
  });

  describe('subtract', () => {
    it('subtracts two numbers', () => {
      expect(subtract(5, 3)).toBe(2);
    });

    it('returns negative when result is negative', () => {
      expect(subtract(3, 5)).toBe(-2);
    });
  });

  describe('multiply', () => {
    it('multiplies two positive numbers', () => {
      expect(multiply(3, 4)).toBe(12);
    });

    it('multiplies by zero', () => {
      expect(multiply(5, 0)).toBe(0);
    });

    it('multiplies negative numbers', () => {
      expect(multiply(-2, -3)).toBe(6);
    });

    it('handles mixed signs', () => {
      expect(multiply(-2, 3)).toBe(-6);
    });
  });

  describe('divide', () => {
    it('divides two numbers', () => {
      expect(divide(10, 2)).toBe(5);
    });

    it('handles decimal results', () => {
      expect(divide(1, 3)).toBeCloseTo(0.333, 2);
    });

    it('throws on division by zero', () => {
      expect(() => divide(5, 0)).toThrow('Division by zero');
    });
  });
});
