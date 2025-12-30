import { useState } from 'react';
import { X } from 'lucide-react';
import { categories } from '@/data/products';
import { useUIStore } from '@/store/uiStore';
import { getProductImage } from '@/lib/images';
import { useSwipeClose } from '@/hooks/useSwipeClose';

const categoryImages: Record<string, string> = {
  rolls: 'roll-philadelphia',
  'rolls-baked': 'roll-philadelphia',
  'rolls-tempura': 'tempura',
  sets: 'sushi-set',
  sushi: 'sushi-salmon',
  pizza: 'pizza-pepperoni',
  hot: 'gyoza',
  salads: 'poke-bowl',
  wok: 'wok-noodles',
  drinks: 'soup-miso',
  snacks: 'gyoza',
  soups: 'soup-miso',
  desserts: 'mochi',
  sauces: 'soup-miso',
};

const MenuPopup = () => {
  const { isMenuOpen, setMenuOpen } = useUIStore();
  const [isClosing, setIsClosing] = useState(false);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);
  const [isBackdropHover, setIsBackdropHover] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setMenuOpen(false);
      setIsClosing(false);
    }, 200);
  };

  const swipeHandlers = useSwipeClose({
    direction: 'left',
    threshold: 80,
    onClose: handleClose,
  });

  if (!isMenuOpen) return null;

  const scrollToCategory = (categoryId: string) => {
    const animateScrollTo = (to: number, duration = 500) => {
      const start = window.pageYOffset;
      const diff = to - start;
      const startTime = performance.now();
      const ease = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
      const step = (now: number) => {
        const elapsed = now - startTime;
        const p = Math.min(elapsed / duration, 1);
        const eased = ease(p);
        window.scrollTo(0, Math.round(start + diff * eased));
        if (elapsed < duration) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    handleClose();
    setTimeout(() => {
      const element = document.getElementById(categoryId);
      if (element) {
        const offset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        animateScrollTo(offsetPosition, 550);
      }
    }, 250);
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-foreground/40 transition-opacity duration-200 ${isClosing ? 'opacity-0' : 'animate-fade-in'}`}
        onClick={handleClose}
        onMouseEnter={() => setIsBackdropHover(true)}
        onMouseLeave={() => { setIsBackdropHover(false); setCursorPos(null); }}
        onMouseMove={(e) => setCursorPos({ x: e.clientX, y: e.clientY })}
      >
        <button
          onClick={(e) => { e.stopPropagation(); handleClose(); }}
          className={`hidden md:flex absolute -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-foreground text-background rounded-full items-center justify-center shadow-md transition-opacity duration-100 ${isBackdropHover ? 'opacity-100' : 'opacity-0'} hover:scale-105 active:scale-95 z-[60]`}
          style={cursorPos ? { left: cursorPos.x, top: cursorPos.y } : undefined}
          title="Закрыть"
          aria-label="Закрыть"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Panel */}
      <div 
        className={`relative w-full max-w-md bg-card h-full overflow-y-auto overscroll-contain shadow-popup transition-transform duration-200 ${
          isClosing ? '-translate-x-full' : 'animate-slide-in-left'
        }`}
        {...swipeHandlers}
      >
        {/* Header */}
        <div className="sticky top-0 bg-card z-10 p-4 border-b border-border flex items-center justify-between">
          <h2 className="text-xl font-bold">Меню</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-muted rounded-full transition-all hover:scale-105 active:scale-95"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="p-4">
          <div className="grid grid-cols-2 gap-3">
            {categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => scrollToCategory(category.id)}
                className="category-card animate-fade-in hover:scale-[1.02] active:scale-[0.98] transition-transform"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-secondary/30">
                  <img
                    src={getProductImage(categoryImages[category.id] || 'roll-philadelphia')}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm font-medium text-center">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPopup;
