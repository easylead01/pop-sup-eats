import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { promos } from '@/data/promos';

const ShortsCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };
  
  const close = () => setActiveIndex(null);
  const prev = () => setActiveIndex((i) => (i === null ? null : (i + promos.length - 1) % promos.length));
  const next = () => setActiveIndex((i) => (i === null ? null : (i + 1) % promos.length));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (activeIndex === null) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeIndex]);

  return (
    <section className="relative py-6 md:py-8">
      <div className="container mx-auto px-4">
        <div className="relative">
          {/* Scroll Buttons */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-50 w-10 h-10 bg-card rounded-full shadow-lg flex items-center justify-center hover:bg-muted transition-colors -translate-x-4 hidden md:flex"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-50 w-10 h-10 bg-card rounded-full shadow-lg flex items-center justify-center hover:bg-muted transition-colors translate-x-4 hidden md:flex"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Carousel */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 md:mx-0 md:px-0"
          >
            {promos.map((promo, index) => (
              <div
                key={promo.id}
                className="shorts-card"
                onClick={() => setActiveIndex(index)}
              >
                {/* Background */}
                {promo.image ? (
                  <img 
                    src={promo.image} 
                    alt={promo.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-br ${promo.gradient}`} />
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Text */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-bold text-base leading-tight drop-shadow-lg">
                    {promo.title}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Popup */}
          {activeIndex !== null && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center" onClick={close}>
              {/* Blurred tinted backdrop */}
              <div className="absolute inset-0">
                {promos[activeIndex]?.image && (
                  <img
                    src={promos[activeIndex].image as string}
                    alt=""
                    aria-hidden
                    className="absolute inset-0 w-full h-full object-cover blur-2xl brightness-75 saturate-125 scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-black/40" />
              </div>

              {/* Navigation arrows */}
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-[110] w-10 h-10 bg-card/80 backdrop-blur rounded-full shadow-lg flex items-center justify-center hover:bg-muted transition-all"
                title="Предыдущий"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-[110] w-10 h-10 bg-card/80 backdrop-blur rounded-full shadow-lg flex items-center justify-center hover:bg-muted transition-all"
                title="Следующий"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Center card */}
              <div
                className="relative z-[120] w-[min(92vw,380px)] aspect-[3/4] rounded-2xl overflow-hidden shadow-popup animate-scale-in bg-card"
                onClick={(e) => e.stopPropagation()}
              >
                {promos[activeIndex]?.image && (
                  <img
                    src={promos[activeIndex].image as string}
                    alt={promos[activeIndex].title}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-center">
                  <p className="text-white font-bold text-base md:text-lg leading-tight drop-shadow-lg text-center">
                    {promos[activeIndex]?.title}
                  </p>
                </div>
                {/* Close button */}
                <button
                  onClick={close}
                  className="absolute top-3 right-3 z-[130] p-2 bg-card rounded-full shadow-md hover:bg-muted transition-all hover:scale-105 active:scale-95"
                  title="Закрыть"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ShortsCarousel;
