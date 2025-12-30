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
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);
  const [isBackdropHover, setIsBackdropHover] = useState(false);

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
  const [isSmallScreen, setIsSmallScreen] = useState(() => window.innerWidth < 1024);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const touchLastRef = useRef<{ x: number; y: number } | null>(null);
  const touchThreshold = 60;
  const [bgLoaded, setBgLoaded] = useState(false);
  const [cardLoaded, setCardLoaded] = useState(false);
  const [vvTop, setVvTop] = useState(0);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    const onChange = (e: MediaQueryListEvent) => setIsSmallScreen(e.matches);
    setIsSmallScreen(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

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
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const cleanupOverflow = () => {
      document.body.style.overflow = prevOverflow;
    };
    setBgLoaded(false);
    setCardLoaded(false);
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
        setCardLoaded(true);
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
        cleanupOverflow();
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
        cleanupOverflow();
      };
    }
  }, [activeIndex]);
  useEffect(() => {
    if (activeIndex === null) return;
    const update = () => setVvTop(window.visualViewport ? Math.round(window.visualViewport.offsetTop) : 0);
    update();
    window.visualViewport?.addEventListener('resize', update);
    window.visualViewport?.addEventListener('scroll', update);
    return () => {
      window.visualViewport?.removeEventListener('resize', update);
      window.visualViewport?.removeEventListener('scroll', update);
    };
  }, [activeIndex]);
  
  useEffect(() => {
    if (activeIndex !== null) {
      const ids = [
        activeIndex,
        (activeIndex + 1) % promos.length,
        (activeIndex + promos.length - 1) % promos.length,
      ];
      ids.forEach((i) => {
        const p = promos[i];
        if ((p as any)?.image) {
          const img = new Image();
          img.src = (p as any).image as string;
        }
      });
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
            <div
              className="fixed inset-0 z-[100] flex items-center justify-center"
              onClick={isSmallScreen ? undefined : close}
              onTouchStart={(e) => {
                const t = e.touches[0];
                touchStartRef.current = { x: t.clientX, y: t.clientY };
                touchLastRef.current = { x: t.clientX, y: t.clientY };
              }}
              onTouchMove={(e) => {
                const t = e.touches[0];
                touchLastRef.current = { x: t.clientX, y: t.clientY };
              }}
              onTouchEnd={() => {
                if (!touchStartRef.current || !touchLastRef.current) return;
                const dx = touchLastRef.current.x - touchStartRef.current.x;
                const dy = touchLastRef.current.y - touchStartRef.current.y;
                const absX = Math.abs(dx);
                const absY = Math.abs(dy);
                touchStartRef.current = null;
                touchLastRef.current = null;
                if (absX > absY && absX > touchThreshold) {
                  if (dx < 0) next();
                  else prev();
                } else if (absY > touchThreshold) {
                  close();
                }
              }}
            >
              {/* Blurred tinted backdrop */}
              <div
                className="absolute inset-0"
                onMouseEnter={() => setIsBackdropHover(true)}
                onMouseLeave={() => { setIsBackdropHover(false); setCursorPos(null); }}
                onMouseMove={(e) => setCursorPos({ x: e.clientX, y: e.clientY })}
              >
                {isSmallScreen ? (
                  <div className={`absolute inset-0 bg-gradient-to-br ${promos[activeIndex]?.gradient ?? 'from-gray-700 to-gray-900'}`} />
                ) : promos[activeIndex]?.image ? (
                  <img
                    src={promos[activeIndex].image as string}
                    alt=""
                    aria-hidden
                    onLoad={() => setBgLoaded(true)}
                    className={`absolute inset-0 w-full h-full object-cover scale-110 saturate-110 brightness-85 blur-sm md:blur-2xl md:brightness-75 md:saturate-125 transition-opacity duration-300 ${bgLoaded ? 'opacity-100' : 'opacity-0'}`}
                  />
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-br ${promos[activeIndex]?.gradient ?? 'from-gray-700 to-gray-900'}`} />
                )}
                <div className="absolute inset-0 bg-black/30 md:bg-black/40 lg:bg-black/50 backdrop-blur-sm md:backdrop-blur-md" />
                <button
                  onClick={(e) => { e.stopPropagation(); close(); }}
                  className={`hidden lg:flex absolute -translate-x-1/2 -translate-y-1/2 z-[110] w-10 h-10 bg-foreground text-background rounded-full items-center justify-center shadow-lg transition-opacity duration-100 ${isBackdropHover ? 'opacity-100' : 'opacity-0'} hover:scale-105 active:scale-95`}
                  style={cursorPos ? { left: cursorPos.x, top: cursorPos.y } : undefined}
                  title="Закрыть"
                  aria-label="Закрыть"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="fixed left-3 right-3 z-[140] pointer-events-none" style={{ top: vvTop + 8 }}>
                <div className="flex gap-1">
                  {promos.map((_, i) => (
                    <div key={i} className="h-1 rounded-full bg-white/30 overflow-hidden flex-1">
                      <div
                        className="h-full bg-white"
                        style={{ width: `${i < activeIndex! ? 100 : i === activeIndex ? Math.round(progress * 100) : 0}%` }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation arrows + center card */}
              <div className="relative z-[120] flex items-center gap-4">
                <button
                  onClick={(e) => { e.stopPropagation(); prev(); }}
                  className="hidden lg:flex w-10 h-10 bg-card/80 backdrop-blur rounded-full shadow-lg items-center justify-center hover:bg-muted transition-all"
                  title="Предыдущий"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Center card */}
                <div
                  className={`relative ${isSmallScreen ? 'w-screen h-screen rounded-none shadow-none' : 'w-[min(92vw,380px)] aspect-[3/4] rounded-2xl shadow-popup'} overflow-hidden bg-card transition-opacity duration-300 ease-out ${cardLoaded ? 'opacity-100' : 'opacity-0'}`}
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
                        onLoad={() => setCardLoaded(true)}
                        className="w-full h-full object-cover"
                      />
                    )
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
                    className="hidden absolute top-3 right-3 z-[130] p-2 bg-card rounded-full shadow-md hover:bg-muted transition-all hover:scale-105 active:scale-95"
                    title="Закрыть"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <button
                  onClick={(e) => { e.stopPropagation(); next(); }}
                  className="hidden lg:flex w-10 h-10 bg-card/80 backdrop-blur rounded-full shadow-lg items-center justify-center hover:bg-muted transition-all"
                  title="Следующий"
                >
                  <ChevronRight className="w-5 h-5" />
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
