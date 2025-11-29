import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { promos } from '@/data/promos';

const ShortsCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="relative py-6 md:py-8">
      <div className="container mx-auto px-4">
        <div className="relative">
          {/* Scroll Buttons */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-card rounded-full shadow-lg flex items-center justify-center hover:bg-muted transition-colors -translate-x-4 hidden md:flex"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-card rounded-full shadow-lg flex items-center justify-center hover:bg-muted transition-colors translate-x-4 hidden md:flex"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Carousel */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 md:mx-0 md:px-0"
          >
            {promos.map((promo) => (
              <div
                key={promo.id}
                className="shorts-card"
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
        </div>
      </div>
    </section>
  );
};

export default ShortsCarousel;
