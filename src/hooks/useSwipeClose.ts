import { useRef, useCallback } from 'react';

interface SwipeCloseOptions {
  direction: 'down' | 'right' | 'left';
  threshold?: number;
  onClose: () => void;
}

export const useSwipeClose = ({ direction, threshold = 100, onClose }: SwipeCloseOptions) => {
  const startY = useRef(0);
  const startX = useRef(0);
  const currentY = useRef(0);
  const currentX = useRef(0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
    startX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    currentY.current = e.touches[0].clientY;
    currentX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const deltaY = currentY.current - startY.current;
    const deltaX = currentX.current - startX.current;

    if (direction === 'down' && deltaY > threshold) {
      onClose();
    } else if (direction === 'right' && deltaX > threshold) {
      onClose();
    } else if (direction === 'left' && deltaX < -threshold) {
      onClose();
    }

    startY.current = 0;
    startX.current = 0;
    currentY.current = 0;
    currentX.current = 0;
  }, [direction, threshold, onClose]);

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
  };
};
