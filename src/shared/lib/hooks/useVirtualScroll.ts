import { useRef, useState } from 'react';

interface I_UseVirtualScrollProps<G_Rows> {
  containerHeight: number;
  rowHeight: number;
  visibleRows?: G_Rows[];
}

export const useVirtualScroll = <G_Rows>(props: I_UseVirtualScrollProps<G_Rows>) => {
  const { containerHeight, visibleRows = [], rowHeight } = props;
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const visibleRowCount = Math.ceil(containerHeight / rowHeight) + 5;
  const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - 2);
  const endIndex = Math.min(startIndex + visibleRowCount, visibleRows.length);

  const handleScroll = () => {
    if (containerRef.current) {
      const newScrollTop = containerRef.current.scrollTop;

      if (newScrollTop !== scrollTop) {
        setScrollTop(newScrollTop);
      }
    }
  };

  const paddingTop = startIndex * rowHeight;
  const paddingBottom = (visibleRows.length - endIndex) * rowHeight;
  const slicedRows = visibleRows.slice(startIndex, endIndex);

  return {
    containerRef,
    handleScroll,
    startIndex,
    endIndex,
    paddingTop,
    paddingBottom,
    visibleRows: slicedRows,
  };
};
