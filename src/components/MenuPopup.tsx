import { useState } from 'react';
import { X } from 'lucide-react';
import { categories } from '@/data/products';
import { useUIStore } from '@/store/uiStore';
import { useSwipeClose } from '@/hooks/useSwipeClose';
import rollsCategoryImage from '@/assets/Роллы.jpg';
import rollsBakedCategoryImage from '@/assets/Запеченные роллы.jpg';
import rollsTempuraCategoryImage from '@/assets/Темпура Роллы.jpg';
import setsCategoryImage from '@/assets/Сеты.jpg';
import sushiCategoryImage from '@/assets/Суши.jpg';
import pizzaCategoryImage from '@/assets/Пицца.jpg';
import saladsCategoryImage from '@/assets/Салаты.jpg';
import wokCategoryImage from '@/assets/Лапша WOK.jpg';
import snacksCategoryImage from '@/assets/Закуски.jpg';
import saucesCategoryImage from '@/assets/Соусы.jpg';

const categoryImages: Record<string, string> = {
  rolls: rollsCategoryImage,
  'rolls-baked': rollsBakedCategoryImage,
  'rolls-tempura': rollsTempuraCategoryImage,
  sets: setsCategoryImage,
  sushi: sushiCategoryImage,
  pizza: pizzaCategoryImage,
  salads: saladsCategoryImage,
  wok: wokCategoryImage,
  snacks: snacksCategoryImage,
  sauces: saucesCategoryImage,
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
    direction: 'down',
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

      <div className="w-full max-w-md mx-auto lg:ml-0 lg:mr-auto">
        <div 
          className={`
            lg:hidden
            absolute bottom-0 left-0 right-0 bg-card rounded-t-3xl shadow-popup
            max-h-[90vh] overflow-hidden transition-transform duration-300 ease-out
            ${isClosing ? 'translate-y-full' : 'animate-slide-in-up'}
          `}
          {...swipeHandlers}
        >
          <div className="flex flex-col max-h-[90vh] relative product-popup-scroll">
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-muted-foreground/30 rounded-full" />
            </div>
            <div className="px-6 pb-3 pt-2 flex items-center justify-between">
              <h2 className="text-xl font-bold">Меню</h2>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-muted rounded-full transition-all hover:scale-105 active:scale-95"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="px-4 pb-6">
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
                        src={categoryImages[category.id]}
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

        <div 
          className={`
            hidden lg:block
            relative w-full max-w-md bg-card h-full overflow-y-auto overscroll-contain shadow-popup
            transition-transform duration-200
            ${isClosing ? '-translate-x-full' : 'animate-slide-in-left'}
          `}
          {...swipeHandlers}
        >
          <div className="sticky top-0 bg-card z-10 p-4 border-b border-border flex items-center justify-between">
            <h2 className="text-xl font-bold">Меню</h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-muted rounded-full transition-all hover:scale-105 active:scale-95"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
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
                      src={categoryImages[category.id]}
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
    </div>
  );
};

export default MenuPopup;
