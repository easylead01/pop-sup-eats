import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { promos } from '@/data/promos';

const ShortsCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const progressIntervalRef = useRef<number | null>(null);
  const nextTimeoutRef = useRef<number | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

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
  
  useEffect(() => {
    if (activeIndex === null) {
      setProgress(0);
      if (progressIntervalRef.current) {
        window.clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      if (nextTimeoutRef.current) {
        window.clearTimeout(nextTimeoutRef.current);
        nextTimeoutRef.current = null;
      }
      return;
    }
    setProgress(0);
    if (progressIntervalRef.current) {
      window.clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    if (nextTimeoutRef.current) {
      window.clearTimeout(nextTimeoutRef.current);
      nextTimeoutRef.current = null;
    }
    const promo = promos[activeIndex];
    const hasVideo = (promo as any).video;
    if (hasVideo && videoRef.current) {
      const v = videoRef.current;
      const handleLoaded = () => {
        setProgress(0);
        v.play().catch(() => {});
      };
      const handleTimeUpdate = () => {
        if (v.duration && v.currentTime >= 0) {
          setProgress(Math.min(v.currentTime / v.duration, 1));
        }
      };
      const handleEnded = () => {
        next();
      };
      v.addEventListener('loadedmetadata', handleLoaded);
      v.addEventListener('timeupdate', handleTimeUpdate);
      v.addEventListener('ended', handleEnded);
      return () => {
        v.removeEventListener('loadedmetadata', handleLoaded);
        v.removeEventListener('timeupdate', handleTimeUpdate);
        v.removeEventListener('ended', handleEnded);
      };
    } else {
      const durationMs = 12000;
      const startedAt = Date.now();
      progressIntervalRef.current = window.setInterval(() => {
        const elapsed = Date.now() - startedAt;
        const p = Math.min(elapsed / durationMs, 1);
        setProgress(p);
      }, 100);
      nextTimeoutRef.current = window.setTimeout(() => {
        next();
      }, durationMs);
      return () => {
        if (progressIntervalRef.current) {
          window.clearInterval(progressIntervalRef.current);
          progressIntervalRef.current = null;
        }
        if (nextTimeoutRef.current) {
          window.clearTimeout(nextTimeoutRef.current);
          nextTimeoutRef.current = null;
        }
      };
    }
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
                    className="absolute inset-0 w-full h-full object-cover scale-110 saturate-110 brightness-85 blur-sm md:blur-2xl md:brightness-75 md:saturate-125"
                  />
                )}
                <div className="absolute inset-0 md:bg-black/40 bg-black/30" />
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
                {(promos[activeIndex] as any)?.video ? (
                  <video
                    ref={videoRef}
                    src={(promos[activeIndex] as any).video as string}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    playsInline
                  />
                ) : (
                  promos[activeIndex]?.image && (
                    <img
                      src={promos[activeIndex].image as string}
                      alt={promos[activeIndex].title}
                      className="w-full h-full object-cover"
                    />
                  )
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3 right-3 z-[130] flex gap-1">
                  {promos.map((_, i) => (
                    <div key={i} className="h-1 rounded-full bg-white/30 overflow-hidden flex-1">
                      <div
                        className="h-full bg-white"
                        style={{ width: `${i < activeIndex! ? 100 : i === activeIndex ? Math.round(progress * 100) : 0}%` }}
                      />
                    </div>
                  ))}
                </div>
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
