import { useRef, useState, useEffect, useCallback } from 'react';
import type { CSSProperties } from 'react';
import { ChevronLeft, ChevronRight, X, Heart, Share2, Volume2, VolumeX, Pause, Play } from 'lucide-react';
import { promos, type Promo } from '@/data/promos';
import logo from '@/assets/logo.svg';

const STORY_MS = 12000;
const BRAND = 'Окинава';
const BRAND_SUB = 'Роллы · Пицца · Воронеж';

/** Круглая аватарка: кусочек логотипа с роллом (кольцо 82×82 в координатах logo.svg 600×210) */
const Avatar = ({ size }: { size: number }) => {
  const s = size / 84;
  const style: CSSProperties = {
    width: size,
    height: size,
    backgroundImage: `url(${logo})`,
    backgroundSize: `${600 * s}px ${210 * s}px`,
    backgroundPosition: `${-19 * s}px ${-80 * s}px`,
    backgroundRepeat: 'no-repeat',
  };
  return <div className="rounded-full bg-white flex-shrink-0 ring-2 ring-white/80" style={style} aria-hidden />;
};

const StoryMedia = ({ promo, onLoaded, videoRef, muted }: {
  promo: Promo;
  onLoaded?: () => void;
  videoRef?: React.Ref<HTMLVideoElement>;
  muted?: boolean;
}) =>
  promo.video ? (
    <video ref={videoRef} src={promo.video} className="absolute inset-0 w-full h-full object-cover" autoPlay muted={muted ?? true} playsInline />
  ) : promo.image ? (
    // креатив 3:4 целиком по центру, сверху и снизу — его же размытая копия (как ВК для не-9:16)
    <>
      <img src={promo.image} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover scale-125 blur-2xl brightness-75 saturate-125" draggable={false} />
      <img src={promo.image} alt={promo.title} onLoad={onLoaded} className="absolute inset-0 w-full h-full object-contain" draggable={false} />
    </>
  ) : (
    <div className={`absolute inset-0 bg-gradient-to-br ${promo.gradient}`} />
  );

const ShortsCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(true);
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const elapsedRef = useRef(0);
  const pausedRef = useRef(false);
  const holdStartRef = useRef(0);
  const holdingRef = useRef(false);
  const touchStartRef = useRef<{ x: number; y: number; t: number } | null>(null);
  const touchLastRef = useRef<{ x: number; y: number } | null>(null);
  const [vh, setVh] = useState(() => window.innerHeight);
  const [vw, setVw] = useState(() => window.innerWidth);

  useEffect(() => {
    const onResize = () => { setVh(window.innerHeight); setVw(window.innerWidth); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  const isMobile = vw < 768;

  // Телефоны: перспектива + параллакс при свайпе ленты сторис
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let raf = 0;
    const apply = () => {
      raf = 0;
      const cards = Array.from(el.querySelectorAll<HTMLElement>('.shorts-card'));
      const mobile = window.innerWidth < 768;
      const anchor = el.getBoundingClientRect().left + 16; // точка примагничивания (левый отступ)
      cards.forEach((card) => {
        const img = card.querySelector<HTMLElement>('img');
        if (!mobile) {
          card.style.transform = '';
          card.style.filter = '';
          if (img) img.style.transform = '';
          return;
        }
        const r = card.getBoundingClientRect();
        const step = r.width + 12;
        const p = Math.max(-1.6, Math.min(1.6, (r.left - anchor) / step)); // 0 — карточка на месте
        const a = Math.min(Math.abs(p), 1);
        card.style.transform = `perspective(900px) rotateY(${(-p * 16).toFixed(2)}deg) scale(${(1 - a * 0.1).toFixed(3)})`;
        card.style.filter = `brightness(${(1 - a * 0.28).toFixed(3)})`;
        if (img) img.style.transform = `translateX(${(-p * 9).toFixed(2)}%) scale(1.16)`;
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(apply); };
    apply();
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: direction === 'left' ? -400 : 400, behavior: 'smooth' });
  };

  const close = useCallback(() => setActiveIndex(null), []);
  const prev = useCallback(() => setActiveIndex((i) => (i === null ? null : Math.max(0, i - 1))), []);
  const next = useCallback(
    () => setActiveIndex((i) => (i === null ? null : i + 1 >= promos.length ? null : i + 1)),
    [],
  );

  const setPause = (v: boolean) => {
    pausedRef.current = v;
    setPaused(v);
    const vid = videoRef.current;
    if (vid) {
      if (v) vid.pause();
      else vid.play().catch(() => {});
    }
  };

  // клавиатура
  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === ' ') { e.preventDefault(); setPause(!pausedRef.current); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeIndex, close, prev, next]);

  // блокировка прокрутки страницы, пока открыт просмотр
  useEffect(() => {
    if (activeIndex === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prevOverflow; };
  }, [activeIndex === null]); // eslint-disable-line react-hooks/exhaustive-deps

  // таймер сторис (с паузой); для видео прогресс берётся из самого видео
  useEffect(() => {
    if (activeIndex === null) return;
    elapsedRef.current = 0;
    setProgress(0);
    pausedRef.current = false;
    setPaused(false);
    const promo = promos[activeIndex];
    if (promo.video) {
      const v = videoRef.current;
      if (!v) return;
      const onTime = () => v.duration && setProgress(Math.min(v.currentTime / v.duration, 1));
      v.addEventListener('timeupdate', onTime);
      v.addEventListener('ended', next);
      return () => { v.removeEventListener('timeupdate', onTime); v.removeEventListener('ended', next); };
    }
    const tick = 50;
    const id = window.setInterval(() => {
      if (pausedRef.current) return;
      elapsedRef.current += tick;
      const p = Math.min(elapsedRef.current / STORY_MS, 1);
      setProgress(p);
      if (p >= 1) { window.clearInterval(id); next(); }
    }, tick);
    return () => window.clearInterval(id);
  }, [activeIndex, next]);

  // предзагрузка соседних картинок
  useEffect(() => {
    if (activeIndex === null) return;
    [activeIndex - 2, activeIndex - 1, activeIndex + 1, activeIndex + 2].forEach((i) => {
      const p = promos[i];
      if (p?.image) { const img = new Image(); img.src = p.image; }
    });
  }, [activeIndex]);

  const share = async (promo: Promo) => {
    const url = window.location.href.split('#')[0];
    try {
      if (navigator.share) { await navigator.share({ title: promo.title, url }); return; }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch { /* пользователь отменил */ }
  };

  const goToMenu = () => {
    close();
    window.setTimeout(() => {
      const el = document.getElementById('rolls');
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' });
    }, 50);
  };

  // клик по сторис: левая треть — назад, остальное — вперёд (как в ВК)
  const onStoryClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (Date.now() - holdStartRef.current > 300) return; // долгое нажатие — это пауза, а не перелистывание
    const r = e.currentTarget.getBoundingClientRect();
    if (e.clientX - r.left < r.width / 3) prev(); else next();
  };

  const active = activeIndex !== null ? promos[activeIndex] : null;

  // размеры карточек на компьютере
  const storyH = Math.min(vh - 140, 780);
  const storyW = Math.round((storyH * 9) / 16);
  const sideH = Math.round(storyH * 0.62);
  const sideW = Math.round((sideH * 9) / 16);

  const progressBars = (
    <div className="flex gap-1">
      {promos.map((p, i) => (
        <div key={p.id} className="h-[3px] rounded-full bg-white/35 overflow-hidden flex-1">
          <div
            className="h-full bg-white rounded-full"
            style={{ width: `${activeIndex === null ? 0 : i < activeIndex ? 100 : i === activeIndex ? progress * 100 : 0}%` }}
          />
        </div>
      ))}
    </div>
  );

  const header = (promo: Promo, compact = false) => (
    <div className="flex items-center gap-3 min-w-0">
      <Avatar size={compact ? 28 : 40} />
      <div className="min-w-0 leading-tight">
        <div className={`text-white font-semibold truncate ${compact ? 'text-[12px]' : 'text-[15px]'}`}>
          {BRAND}
          {!compact && <span className="ml-2 font-normal text-white/60">акция</span>}
        </div>
        {!compact && <div className="text-white/60 text-[12px] truncate">{BRAND_SUB}</div>}
      </div>
      {!compact && promo.video && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); setMuted(!muted); }}
          className="ml-auto p-1.5 text-white/90 hover:text-white"
          aria-label={muted ? 'Включить звук' : 'Выключить звук'}
        >
          {muted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
        </button>
      )}
    </div>
  );

  const storyOverlay = (promo: Promo, withClose = false) => (
    <>
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/55 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 top-0 px-3 pt-3 pointer-events-auto" onClick={(e) => e.stopPropagation()}>
        {progressBars}
        <div className="flex items-center mt-3">
          <div className="flex-1 min-w-0">{header(promo)}</div>
          <button
            type="button"
            onClick={() => setPause(!paused)}
            className="p-1.5 text-white/90 hover:text-white"
            aria-label={paused ? 'Продолжить' : 'Пауза'}
          >
            {paused ? <Play className="w-6 h-6" /> : <Pause className="w-6 h-6" />}
          </button>
          {withClose && (
            <button type="button" onClick={close} className="p-1.5 text-white/90 hover:text-white" aria-label="Закрыть">
              <X className="w-7 h-7" />
            </button>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); setLiked((l) => ({ ...l, [promo.id]: !l[promo.id] })); }}
        className="absolute right-4 bottom-4 w-14 h-14 rounded-full bg-black/35 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/50 active:scale-95 transition"
        aria-label="Нравится"
      >
        <Heart className={`w-7 h-7 ${liked[promo.id] ? 'fill-[#ff3347] text-[#ff3347]' : ''}`} strokeWidth={1.8} />
      </button>
      {!promo.hideTitle && (
        <div className="absolute inset-x-0 bottom-0 p-5 pr-20 bg-gradient-to-t from-black/70 to-transparent pointer-events-none">
          <p className="text-white font-bold text-lg leading-tight drop-shadow-lg">{promo.title}</p>
        </div>
      )}
    </>
  );

  const bottomBar = (promo: Promo) => (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={goToMenu}
        className="flex-1 h-11 rounded-full bg-[#2b2b2d] text-left px-5 text-[15px] text-white/55 hover:text-white/80 transition"
      >
        Смотреть меню
      </button>
      <button
        type="button"
        onClick={() => share(promo)}
        className="w-11 h-11 flex items-center justify-center text-white/80 hover:text-white relative"
        aria-label="Поделиться"
      >
        <Share2 className="w-6 h-6" />
        {copied && <span className="absolute -top-8 right-0 whitespace-nowrap text-xs bg-white text-black rounded-md px-2 py-1">Ссылка скопирована</span>}
      </button>
    </div>
  );

  const sideCard = (i: number) => {
    const p = promos[i];
    if (!p) return <div style={{ width: sideW, height: sideH }} className="flex-shrink-0" aria-hidden />;
    return (
      <button
        type="button"
        key={p.id}
        onClick={(e) => { e.stopPropagation(); setActiveIndex(i); }}
        className="relative flex-shrink-0 rounded-[14px] overflow-hidden opacity-45 hover:opacity-75 transition-opacity"
        style={{ width: sideW, height: sideH }}
        aria-label={`Открыть сторис: ${p.title}`}
      >
        <StoryMedia promo={p} />
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/50 to-transparent" />
        <div className="absolute left-3 top-3 right-3">{header(p, true)}</div>
      </button>
    );
  };

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
          <div ref={scrollRef} className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory scroll-pl-4 md:snap-none">
            {promos.map((promo, index) => (
              <div key={promo.id} className="shorts-card" onClick={() => setActiveIndex(index)}>
                {promo.image ? (
                  <img src={promo.image} alt={promo.title} className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-br ${promo.gradient}`} />
                )}
                {!promo.hideTitle && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white font-bold text-base leading-tight drop-shadow-lg">{promo.title}</p>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Просмотр сторис — как в ВК */}
          {active && activeIndex !== null && (
            <div className="fixed inset-0 z-[100] bg-[#141414] select-none" onClick={isMobile ? undefined : close}>
              {isMobile ? (
                <div
                  className="absolute inset-0 flex flex-col"
                  onTouchStart={(e) => {
                    const t = e.touches[0];
                    touchStartRef.current = { x: t.clientX, y: t.clientY, t: Date.now() };
                    holdStartRef.current = Date.now();
                    touchLastRef.current = { x: t.clientX, y: t.clientY };
                    setPause(true);
                  }}
                  onTouchMove={(e) => {
                    const t = e.touches[0];
                    touchLastRef.current = { x: t.clientX, y: t.clientY };
                  }}
                  onTouchEnd={() => {
                    setPause(false);
                    const s = touchStartRef.current, l = touchLastRef.current;
                    touchStartRef.current = null;
                    if (!s || !l) return;
                    const dx = l.x - s.x, dy = l.y - s.y;
                    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
                      if (dx < 0) next();
                      else prev();
                    }
                    else if (dy > 80 && Math.abs(dy) > Math.abs(dx)) close();
                  }}
                >
                  <div className="relative flex-1 overflow-hidden rounded-b-[16px]" onClick={onStoryClick}>
                    <StoryMedia promo={active} videoRef={videoRef} muted={muted} />
                    <div className="absolute inset-x-0 bottom-0" style={{ top: 'env(safe-area-inset-top)' }}>
                      {storyOverlay(active, true)}
                    </div>
                  </div>
                  <div className="px-3 py-3" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 12px)' }}>
                    {bottomBar(active)}
                  </div>
                </div>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); close(); }}
                    className="absolute top-5 right-6 z-10 w-11 h-11 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition"
                    aria-label="Закрыть"
                  >
                    <X className="w-7 h-7" />
                  </button>

                  <div className="absolute inset-0 flex items-center justify-center gap-12">
                    {sideCard(activeIndex - 2)}
                    {sideCard(activeIndex - 1)}

                    <div
                      className="relative flex-shrink-0 rounded-[18px] bg-[#222224] overflow-hidden shadow-2xl"
                      style={{ width: storyW }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div
                        className="relative rounded-[18px] overflow-hidden cursor-pointer"
                        style={{ height: storyH }}
                        onClick={onStoryClick}
                        onMouseDown={() => { holdStartRef.current = Date.now(); holdingRef.current = true; setPause(true); }}
                        onMouseUp={() => { if (holdingRef.current) { holdingRef.current = false; setPause(false); } }}
                        onMouseLeave={() => { if (holdingRef.current) { holdingRef.current = false; setPause(false); } }}
                      >
                        <StoryMedia promo={active} videoRef={videoRef} muted={muted} />
                        {storyOverlay(active)}
                      </div>
                      <div className="px-3 py-3">{bottomBar(active)}</div>
                    </div>

                    {sideCard(activeIndex + 1)}
                    {sideCard(activeIndex + 2)}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ShortsCarousel;
