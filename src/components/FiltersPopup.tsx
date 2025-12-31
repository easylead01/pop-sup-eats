import { useState } from 'react';
import { X } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { useSwipeClose } from '@/hooks/useSwipeClose';

export const FILTER_TAGS_DEF = [
  { id: 'salmon', label: 'Лосось' },
  { id: 'tuna', label: 'Тунец' },
  { id: 'eel', label: 'Угорь' },
  { id: 'shrimp', label: 'Креветка' },
  { id: 'squid', label: 'Калмары' },
  { id: 'chicken', label: 'Курица' },
  { id: 'spicy', label: 'Острое' },
] as const;

export const SORT_OPTIONS_DEF = [
  { id: 'popular', label: 'Популярные' },
  { id: 'price-desc', label: 'По убыванию цены' },
  { id: 'price-asc', label: 'По возрастанию цены' },
] as const;

type SortOptionId = (typeof SORT_OPTIONS_DEF)[number]['id'];

const FiltersPopup = () => {
  const {
    isFiltersOpen,
    setFiltersOpen,
    filterTags,
    sortOption,
    setFilterTags,
    setSortOption,
    resetFilters,
  } = useUIStore();
  const [isClosing, setIsClosing] = useState(false);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);
  const [isBackdropHover, setIsBackdropHover] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setFiltersOpen(false);
      setIsClosing(false);
    }, 200);
  };

  const swipeHandlers = useSwipeClose({
    direction: 'down',
    threshold: 80,
    onClose: handleClose,
  });

  if (!isFiltersOpen) return null;

  const toggleTag = (id: string) => {
    if (filterTags.includes(id)) {
      setFilterTags(filterTags.filter((t) => t !== id));
    } else {
      setFilterTags([...filterTags, id]);
    }
  };

  const handleSortChange = (id: SortOptionId) => {
    setSortOption(id);
  };

  const handleReset = () => {
    resetFilters();
  };

  const handleApply = () => {
    handleClose();
  };

  const content = (
    <div className="flex flex-col max-h-[90vh] relative product-popup-scroll">
      <div className="flex justify-center pt-3 pb-1 lg:hidden">
        <div className="w-10 h-1 bg-muted-foreground/30 rounded-full" />
      </div>
      <div className="px-6 pb-3 pt-2 lg:px-5 lg:pt-4 lg:pb-3 flex items-center justify-between">
        <h2 className="text-xl font-bold">Фильтры</h2>
        <button
          onClick={handleClose}
          className="p-2 hover:bg-muted rounded-full transition-all hover:scale-105 active:scale-95"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      <div className="px-6 pb-4 space-y-5 lg:px-5">
        <div className="space-y-3">
          <div className="text-sm font-semibold">Категории</div>
          <div className="grid grid-cols-2 gap-2">
            {FILTER_TAGS_DEF.map((tag) => {
              const active = filterTags.includes(tag.id);
              return (
                <button
                  key={tag.id}
                  onClick={() => toggleTag(tag.id)}
                  className={`px-3 py-2 rounded-full text-sm border transition-all ${
                    active
                      ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                      : 'bg-muted/40 text-foreground border-border hover:bg-muted'
                  }`}
                >
                  {tag.label}
                </button>
              );
            })}
          </div>
        </div>
        <div className="space-y-3">
          <div className="text-sm font-semibold">Сортировка</div>
          <div className="flex flex-col gap-2">
            {SORT_OPTIONS_DEF.map((option) => {
              const active = sortOption === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => handleSortChange(option.id)}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm border transition-all ${
                    active
                      ? 'bg-primary/10 border-primary text-foreground'
                      : 'bg-muted/40 border-border text-muted-foreground hover:bg-muted'
                  }`}
                >
                  <span>{option.label}</span>
                  {active && <span className="w-2 h-2 rounded-full bg-primary" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="px-6 pb-5 pt-2 border-t border-border flex gap-3 lg:px-5">
        <button
          onClick={handleReset}
          className="flex-1 h-11 rounded-full border border-border text-sm font-medium text-foreground bg-card hover:bg-muted transition-colors"
        >
          Сбросить
        </button>
        <button
          onClick={handleApply}
          className="flex-1 h-11 rounded-full bg-foreground text-background text-sm font-semibold hover:bg-foreground/90 transition-colors"
        >
          Применить
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50">
      <div
        className={`absolute inset-0 bg-foreground/40 transition-opacity duration-200 ${
          isClosing ? 'opacity-0' : 'animate-fade-in'
        }`}
        onClick={handleClose}
        onMouseEnter={() => setIsBackdropHover(true)}
        onMouseLeave={() => {
          setIsBackdropHover(false);
          setCursorPos(null);
        }}
        onMouseMove={(e) => setCursorPos({ x: e.clientX, y: e.clientY })}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
          className={`hidden md:flex absolute -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-foreground text-background rounded-full items-center justify-center shadow-md transition-opacity duration-100 ${
            isBackdropHover ? 'opacity-100' : 'opacity-0'
          } hover:scale-105 active:scale-95 z-[60]`}
          style={cursorPos ? { left: cursorPos.x, top: cursorPos.y } : undefined}
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div
        className={`lg:hidden absolute bottom-0 left-0 right-0 bg-card rounded-t-3xl shadow-popup max-h-[90vh] overflow-hidden transition-transform duration-300 ease-out ${
          isClosing ? 'translate-y-full' : 'animate-slide-in-up'
        }`}
        {...swipeHandlers}
      >
        {content}
      </div>
      <div
        className={`hidden lg:flex absolute right-0 top-0 h-screen w-1/2 max-w-md bg-card shadow-popup flex-col transition-transform duration-300 ease-out ${
          isClosing ? 'translate-x-full' : 'animate-slide-in-right'
        }`}
        {...swipeHandlers}
      >
        {content}
      </div>
    </div>
  );
};

export default FiltersPopup;
