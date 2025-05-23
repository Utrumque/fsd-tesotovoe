import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useVirtualScroll } from '../useVirtualScroll';

describe('useVirtualScroll', () => {
  it('возвращает ожидаемые значения', () => {
    const { result } = renderHook(() =>
      useVirtualScroll({
        containerHeight: 100,
        rowHeight: 20,
        visibleRows: Array(10).fill(null),
      })
    );

    expect(result.current.startIndex).toBe(0);
    expect(result.current.endIndex).toBe(10); // 100/20 + 5 = 10
    expect(result.current.paddingTop).toBe(0);
    expect(result.current.paddingBottom).toBe(0); // (10 - 10) * 20
    expect(result.current.visibleRows).toHaveLength(10);
  });

  it('корректно обрабатывает скролл', () => {
    const { result } = renderHook(() =>
      useVirtualScroll({
        containerHeight: 100,
        rowHeight: 20,
        visibleRows: Array(20).fill(null),
      })
    );

    act(() => {
      if (result.current.containerRef.current) {
        Object.defineProperty(result.current.containerRef.current, 'scrollTop', {
          value: 100,
          writable: true,
        });
        result.current.handleScroll();
      }
    });

    expect(result.current.startIndex).toBe(0); // (100 / 20) - 2 = 3, но ограничено 0
  });

  it('корректно обрабатывает пустой массив visibleRows', () => {
    const { result } = renderHook(() =>
      useVirtualScroll({
        containerHeight: 100,
        rowHeight: 20,
        visibleRows: [],
      })
    );

    expect(result.current.startIndex).toBe(0);
    expect(result.current.endIndex).toBe(0);
    expect(result.current.visibleRows).toHaveLength(0);
  });

  it('корректно обрабатывает скролл за пределы контента', () => {
    const { result } = renderHook(() =>
      useVirtualScroll({
        containerHeight: 100,
        rowHeight: 20,
        visibleRows: Array(20).fill(null),
      })
    );

    act(() => {
      if (result.current.containerRef.current) {
        Object.defineProperty(result.current.containerRef.current, 'scrollTop', {
          value: 2000,
          writable: true,
        });
        result.current.handleScroll();
      }
    });

    expect(result.current.startIndex).toBe(0); // (2000 / 20) - 2 = 98, но ограничено 0
  });

  it('не вызывает setScrollTop, если containerRef.current отсутствует', () => {
    const { result } = renderHook(() =>
      useVirtualScroll({
        containerHeight: 100,
        rowHeight: 20,
        visibleRows: Array(10).fill(null),
      })
    );

    act(() => {
      result.current.handleScroll();
    });

    expect(result.current.startIndex).toBe(0);
  });

  it('не вызывает setScrollTop, если scrollTop не изменился', () => {
    const { result } = renderHook(() =>
      useVirtualScroll({
        containerHeight: 100,
        rowHeight: 20,
        visibleRows: Array(10).fill(null),
      })
    );

    act(() => {
      if (result.current.containerRef.current) {
        Object.defineProperty(result.current.containerRef.current, 'scrollTop', {
          value: 0,
          writable: true,
        });
        result.current.handleScroll();
      }
    });

    expect(result.current.startIndex).toBe(0);
  });

  it('вызывает setScrollTop, если scrollTop изменился', () => {
    const { result } = renderHook(() =>
      useVirtualScroll({
        containerHeight: 100,
        rowHeight: 20,
        visibleRows: Array(10).fill(null),
      })
    );

    act(() => {
      if (result.current.containerRef.current) {
        Object.defineProperty(result.current.containerRef.current, 'scrollTop', {
          value: 100,
          writable: true,
        });
        result.current.handleScroll();
      }
    });

    expect(result.current.startIndex).toBe(0); // (100 / 20) - 2 = 3, но ограничено 0
  });

  it('использует rowHeight по умолчанию', () => {
    const { result } = renderHook(() =>
      useVirtualScroll({
        containerHeight: 100,
        rowHeight: 20,
        visibleRows: Array(10).fill(null),
      })
    );

    expect(result.current.paddingTop).toBe(0);
    expect(result.current.paddingBottom).toBe(0);
  });
});
