import { useEffect, useState } from 'react';
import { Minus, Plus, Heart, X } from 'lucide-react';
import type { Product, SetComponent } from '@/data/products';
import { getProduct } from '@/data/products';
import { getProductImage } from '@/lib/images';
import { useUIStore } from '@/store/uiStore';
import { useCartStore } from '@/store/cartStore';
import { toast } from '@/hooks/use-toast';

/**
 * Демо-окно товара в стиле MyBox: большое фото слева, справа название с перчиком,
 * «шт / г · ккал», описание, мини-карточки роллов (для сетов), «Состав», «Аллергены»
 * и внизу счётчик + чёрная кнопка «В корзину за …».
 */

const ACCENT = '#EE7233';
const FONT = { fontFamily: '"Golos Text", Golos, system-ui, sans-serif' };

const ChiliIcon = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} aria-label="острое" role="img">
    <path d="M22.5 6.5c1.6-.4 3 .2 3.6 1.2" stroke="#3B8B3B" strokeWidth="2.2" strokeLinecap="round" fill="none" />
    <path
      d="M24 9.5c2.3 2.6 1.9 7.3-1.3 11.3-3.6 4.5-9.6 7.6-15.7 7.3-1.5-.1-1.7-1.3-.4-1.9 4.6-2.1 8.1-5.4 10.1-9.7 1.1-2.4 1.5-4.6 3-6.4 1.2-1.4 3.1-1.8 4.3-.6z"
      fill="#E5322D"
    />
    <path d="M19.8 11.3c-.9 1.4-1.2 3-1.9 4.6" stroke="#fff" strokeOpacity=".45" strokeWidth="1.4" strokeLinecap="round" fill="none" />
    <path d="M21.4 8.9c.9-.9 2.4-1 3.2-.2l-1 1.6c-.7-.4-1.5-.4-2.2-1.4z" fill="#3B8B3B" />
  </svg>
);

const InfoIcon = ({ color = '#000', size = 22 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="12" cy="12" r="10.5" stroke={color} strokeWidth="1.5" />
    <path d="M12 10.5v6" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="12" cy="7.5" r="1.1" fill={color} />
  </svg>
);

const Marker = ({ id }: { id: string }) => {
  if (id === 'new') {
    return (
      <span
        className="w-14 h-14 rounded-full flex items-center justify-center text-white text-[13px] font-semibold tracking-wide shadow-md"
        style={{ background: ACCENT }}
      >
        NEW
      </span>
    );
  }
  if (id === 'veggie') {
    return (
      <span className="w-14 h-14 rounded-full flex items-center justify-center bg-[#4CAF50] text-white text-[12px] font-semibold shadow-md">
        VEG
      </span>
    );
  }
  return null;
};

const halfLabel = (item: SetComponent, linked?: Product) => {
  if (item.pieces && linked?.pieces && item.pieces !== linked.pieces) {
    const a = parseInt(item.pieces, 10);
    const b = parseInt(linked.pieces, 10);
    if (a && b && a * 2 === b) return 'x½';
  }
  if (!linked && item.pieces && /^\d+ шт$/.test(item.pieces)) return `x${parseInt(item.pieces, 10)}`;
  return 'x1';
};

const SetMiniCards = ({ items, onOpen }: { items: SetComponent[]; onOpen: (p: Product) => void }) => (
  <div className="flex flex-col gap-3 mt-[30px]">
    {items.map((item, index) => {
      const linked = item.productId ? getProduct(item.productId) : undefined;
      const img = linked?.detailImage || item.image;
      const meta = linked ? `${linked.pieces} / ${linked.weight.replace(' гр', ' г')}` : item.pieces;
      const Wrapper = linked ? 'button' : 'div';
      return (
        <Wrapper
          key={`${item.name}-${index}`}
          {...(linked ? { type: 'button' as const, onClick: () => onOpen(linked) } : {})}
          className="flex items-start gap-3 text-left group"
        >
          <div className="relative w-[74px] h-[74px] flex-shrink-0">
            <div className="w-full h-full rounded-[13px] overflow-hidden bg-[#E7EEEE] flex items-center justify-center">
              {img ? (
                <img src={getProductImage(img)} alt={item.name} loading="lazy" className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl" aria-hidden>🍣</span>
              )}
            </div>
            <span className="absolute -right-1.5 bottom-0 bg-white border border-black rounded-full px-1.5 pt-[3px] pb-[4px] text-[10px] leading-[12px]">
              {halfLabel(item, linked)}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <div className={`text-[16px] leading-[20px] ${linked ? 'group-hover:underline' : ''}`}>{item.name}</div>
            {linked && (
              <div className="text-[13px] leading-[16px] text-black/55 mt-1 line-clamp-2">
                {linked.ingredients.join(', ')}
              </div>
            )}
            {meta && <div className="text-[14px] leading-[18px] mt-1.5">{meta}</div>}
          </div>
        </Wrapper>
      );
    })}
  </div>
);

const MyboxProductPopup = () => {
  const { selectedProduct, setSelectedProduct } = useUIStore();
  const { addItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    setQuantity(1);
    document.querySelectorAll('.mybox-popup-scroll').forEach((el) => el.scrollTo({ top: 0 }));
  }, [selectedProduct?.id]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedProduct(null);
      setIsClosing(false);
    }, 280);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && handleClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!selectedProduct) return null;
  const p = selectedProduct;
  const image = getProductImage(p.detailImage || p.image);
  const isSpicy = p.markers?.includes('spicy');
  const badges = (p.markers || []).filter((m) => m === 'new' || m === 'veggie');
  const supply = [p.pieces, p.weight?.replace(' гр', ' г')].filter(Boolean).join(' / ');
  const total = p.price * quantity;

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) addItem(p);
    toast({ title: 'Добавлено в корзину', description: `${p.name} × ${quantity}` });
    handleClose();
  };

  const counter = (
    <div className="flex items-center h-14 rounded-full border border-black/15 bg-white flex-shrink-0">
      <button
        type="button"
        onClick={() => setQuantity(Math.max(1, quantity - 1))}
        className="w-14 h-14 flex items-center justify-center rounded-full hover:bg-black/5 active:scale-95 transition"
        aria-label="Меньше"
      >
        <Minus className="w-4 h-4" strokeWidth={1.75} />
      </button>
      <span className="min-w-[24px] text-center text-[18px] leading-[22px]">{quantity}</span>
      <button
        type="button"
        onClick={() => setQuantity(quantity + 1)}
        className="w-14 h-14 flex items-center justify-center rounded-full hover:bg-black/5 active:scale-95 transition"
        aria-label="Больше"
      >
        <Plus className="w-4 h-4" strokeWidth={1.75} />
      </button>
    </div>
  );

  const addButton = (
    <button
      type="button"
      onClick={handleAdd}
      className="h-14 rounded-full bg-black text-white text-[18px] leading-[20px] px-8 hover:bg-black/85 active:scale-[0.98] transition"
    >
      В корзину за {total} ₽
    </button>
  );

  const details = (
    <>
      <h1 className="text-[26px] leading-[32px] lg:text-[32px] lg:leading-[38px] font-normal">
        {p.name}
        {isSpicy && <ChiliIcon className="inline-block w-[30px] h-[29px] ml-1 -mt-1 align-middle" />}
      </h1>

      <div className="flex items-center gap-8 mt-4 text-[14px] leading-[18px]">
        {supply && <span>{supply}</span>}
        {p.calories ? (
          <span className="flex items-center gap-2">
            {p.calories} ккал
            <InfoIcon />
          </span>
        ) : null}
      </div>

      {p.description && <p className="mt-[30px] text-[16px] leading-[20px]">{p.description}</p>}

      {p.setItems?.length ? <SetMiniCards items={p.setItems} onOpen={(next) => setSelectedProduct(next)} /> : null}

      {p.ingredients.length > 0 && (
        <section className="mt-[30px]">
          <h2 className="text-[20px] leading-[24px] font-normal">Состав</h2>
          <p className="mt-5 text-[18px] leading-[24px]">{p.ingredients.join(', ')}</p>
        </section>
      )}

      {p.allergens.length > 0 && (
        <section className="mt-[30px]">
          <h2 className="text-[20px] leading-[24px] font-normal flex items-center gap-2.5">
            Аллергены
            <InfoIcon color={ACCENT} size={24} />
          </h2>
          <p className="mt-5 text-[18px] leading-[24px]">{p.allergens.join(', ')}</p>
        </section>
      )}
    </>
  );

  const imageOverlays = (
    <>
      <div className="absolute left-4 top-1 lg:left-14 flex gap-2">
        {badges.map((m) => (
          <Marker key={m} id={m} />
        ))}
      </div>
      <button
        type="button"
        className="absolute right-4 top-1 lg:right-14 w-14 h-14 flex items-center justify-center text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.35)] hover:scale-105 transition"
        aria-label="В избранное"
      >
        <Heart className="w-10 h-10" strokeWidth={1.6} />
      </button>
    </>
  );

  return (
    <div className="fixed inset-0 z-50 text-black" style={FONT}>
      {/* Затемнение */}
      <div
        className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'animate-fade-in'}`}
        onClick={handleClose}
      />

      {/* Компьютер: панель справа почти на весь экран */}
      <div
        className={`hidden lg:flex absolute top-0 right-0 bottom-0 left-10 xl:left-[120px] bg-white transition-transform duration-300 ease-out
          ${isClosing ? 'translate-x-full' : 'animate-slide-in-right'}`}
      >
        <div className="relative flex-shrink-0 self-start mt-[52px] w-[min(796px,calc(100vh-104px),55vw)] aspect-square">
          <img src={image} alt={p.name} className="w-full h-full object-cover" />
          {imageOverlays}
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-[3px] left-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-black text-white flex items-center justify-center hover:scale-105 active:scale-95 transition"
            aria-label="Закрыть"
          >
            <X className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>

        <div className="flex-1 min-w-0 flex flex-col pl-[53px] pr-10 pt-[52px] pb-8">
          <div className="mybox-popup-scroll flex-1 overflow-y-auto overscroll-contain max-w-[440px] pr-2">{details}</div>
          <div className="flex items-center gap-3 pt-6 max-w-[440px]">
            {counter}
            <div className="flex-1 [&>button]:w-full">{addButton}</div>
          </div>
        </div>
      </div>

      {/* Телефон/планшет: на весь экран снизу */}
      <div
        className={`lg:hidden absolute inset-x-0 bottom-0 top-3 bg-white rounded-t-[24px] overflow-hidden flex flex-col transition-transform duration-300 ease-out
          ${isClosing ? 'translate-y-full' : 'animate-slide-in-up'}`}
      >
        <div className="mybox-popup-scroll flex-1 overflow-y-auto overscroll-contain">
          <div className="relative w-full aspect-square">
            <img src={image} alt={p.name} className="w-full h-full object-cover" />
            {imageOverlays}
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-3 left-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-black text-white flex items-center justify-center active:scale-95 transition"
              aria-label="Закрыть"
            >
              <X className="w-5 h-5" strokeWidth={2} />
            </button>
          </div>
          <div className="px-4 pt-5 pb-6">{details}</div>
        </div>
        <div className="flex items-center gap-3 px-4 py-3 border-t border-black/5 bg-white">
          {counter}
          <div className="flex-1 [&>button]:w-full [&>button]:px-4 [&>button]:text-[16px]">{addButton}</div>
        </div>
      </div>
    </div>
  );
};

export default MyboxProductPopup;
