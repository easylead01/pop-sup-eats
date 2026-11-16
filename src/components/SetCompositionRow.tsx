import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Product, SetComponent } from '@/data/products';
import { getProduct } from '@/data/products';
import { getProductImage } from '@/lib/images';

/**
 * «Состав сета» как у Фарфора: заголовок и ряд карточек роллов с прокруткой вбок.
 * Карточки разделены тонкими линиями; стрелки появляются, когда есть куда листать.
 * variant="mybox" — в стиле окна MyBox (фото на светлой плашке, метка «x1»).
 */

const countLabel = (item: SetComponent, linked?: Product) => {
  if (item.pieces && linked?.pieces && item.pieces !== linked.pieces) {
    const a = parseInt(item.pieces, 10);
    const b = parseInt(linked.pieces, 10);
    if (a && b && a * 2 === b) return 'x½';
  }
  if (!linked && item.pieces && /^\d+ шт$/.test(item.pieces)) return `x${parseInt(item.pieces, 10)}`;
  return 'x1';
};

type Props = {
  items: SetComponent[];
  variant?: 'default' | 'mybox';
  onOpen?: (p: Product) => void;
  compact?: boolean;
};

const SetCompositionRow = ({ items, variant = 'default', onOpen, compact = false }: Props) => {
  const scroller = useRef<HTMLUListElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);
  const isMybox = variant === 'mybox';

  const update = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    el.scrollLeft = 0;
    update();
    el.addEventListener('scroll', update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', update);
      ro.disconnect();
    };
  }, [items, update]);

  const page = (dir: 1 | -1) => {
    const el = scroller.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  const cardW = compact ? 'w-[168px]' : 'w-[212px]';
  const imgBox = compact ? 'h-[72px]' : 'h-[84px]';

  return (
    <section className="relative">
      <h3 className={isMybox ? 'text-[20px] leading-[24px] font-normal mb-4' : `${compact ? 'text-lg' : 'text-xl'} font-bold mb-4`}>
        Состав сета
      </h3>

      <div className="relative">
        <ul
          ref={scroller}
          className="flex overflow-x-auto scrollbar-hide overscroll-x-contain"
        >
          {items.map((item, index) => {
            const linked = item.productId ? getProduct(item.productId) : undefined;
            const img = (isMybox ? linked?.detailImage : undefined) || linked?.image || item.image;
            const meta = linked ? `${linked.pieces ?? ''}${linked.pieces ? ' / ' : ''}${linked.weight.replace(' гр', ' г')}` : item.pieces;
            const desc = linked ? linked.ingredients.join(', ') : '';
            const clickable = !!(linked && onOpen);
            const body = (
              <>
                <div className={`relative ${imgBox} ${isMybox ? (compact ? 'w-[72px]' : 'w-[84px]') : 'w-full'} flex items-center`}>
                  {isMybox ? (
                    <div className="w-full h-full rounded-[13px] overflow-hidden bg-[#E7EEEE] flex items-center justify-center">
                      {img ? (
                        <img src={getProductImage(img)} alt="" loading="lazy" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-3xl" aria-hidden>🍣</span>
                      )}
                    </div>
                  ) : img ? (
                    <img src={getProductImage(img)} alt="" loading="lazy" className="h-full max-w-full object-contain object-left" />
                  ) : (
                    <span className="text-4xl" aria-hidden>🍣</span>
                  )}
                  {isMybox && (
                    <span className="absolute -right-1.5 bottom-0 bg-white border border-black rounded-full px-1.5 pt-[3px] pb-[4px] text-[10px] leading-[12px]">
                      {countLabel(item, linked)}
                    </span>
                  )}
                </div>
                <div className={`mt-3 ${isMybox ? 'text-[16px] leading-[20px]' : 'font-semibold text-[15px] leading-[20px]'} line-clamp-2 ${clickable ? 'group-hover:underline' : ''}`}>
                  {item.name}
                </div>
                {desc && (
                  <div className={`mt-1.5 text-[13px] leading-[17px] ${isMybox ? 'text-black/55' : 'text-muted-foreground'} line-clamp-4`}>
                    {desc}
                  </div>
                )}
                {meta && <div className={`mt-2 text-[13px] leading-[16px] ${isMybox ? 'text-black' : 'text-muted-foreground'}`}>{meta}</div>}
              </>
            );
            return (
              <li
                key={`${item.name}-${index}`}
                className={`${cardW} flex-shrink-0 px-5 first:pl-0 border-l first:border-l-0 ${isMybox ? 'border-black/10' : 'border-border'}`}
              >
                {clickable ? (
                  <button type="button" onClick={() => onOpen!(linked!)} className="group block w-full text-left">
                    {body}
                  </button>
                ) : (
                  <div>{body}</div>
                )}
              </li>
            );
          })}
        </ul>

        {/* мягкое растворение краёв, когда есть куда листать */}
        {canRight && <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-14 bg-gradient-to-l from-white to-transparent" />}
        {canLeft && <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-14 bg-gradient-to-r from-white to-transparent" />}

        {canLeft && (
          <button
            type="button"
            onClick={() => page(-1)}
            className="hidden md:flex absolute left-0 top-[42px] -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-black/10 items-center justify-center hover:bg-neutral-50 active:scale-95 transition"
            aria-label="Листать влево"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        {canRight && (
          <button
            type="button"
            onClick={() => page(1)}
            className="hidden md:flex absolute right-0 top-[42px] -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-black/10 items-center justify-center hover:bg-neutral-50 active:scale-95 transition"
            aria-label="Листать вправо"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </section>
  );
};

export default SetCompositionRow;
