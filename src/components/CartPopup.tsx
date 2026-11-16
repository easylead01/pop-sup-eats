import { useState } from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag, TicketPercent, Check } from 'lucide-react';
import { useCartStore, formatRub, computeSummary, MIN_ORDER, FREE_DELIVERY_FROM } from '@/store/cartStore';
import { useUIStore } from '@/store/uiStore';
import { getProductImageForProduct } from '@/lib/images';
import { Product } from '@/data/products';
import { useSwipeClose } from '@/hooks/useSwipeClose';
import { useProductImageContext } from '@/components/ProductImageProvider';


const pluralItems = (n: number) => {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return 'товар';
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'товара';
  return 'товаров';
};

/** Строка над списком: «3 товара на 2 105 ₽ · Очистить» */
const ClearCartRow = ({ onClear }: { onClear: () => void }) => {
  const items = useCartStore((s) => s.items);
  const { subtotal, count: pieces } = computeSummary(items, null);
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">
        {pieces} {pluralItems(pieces)} на {formatRub(subtotal)}
      </span>
      <button onClick={onClear} className="text-muted-foreground hover:text-destructive transition-colors">
        Очистить
      </button>
    </div>
  );
};

/** Низ корзины: промокод, разбивка суммы и кнопка оформления */
const CartSummaryBlock = ({ onCheckout }: { onCheckout: () => void }) => {
  const promo = useCartStore((s) => s.promo);
  const applyPromo = useCartStore((s) => s.applyPromo);
  const removePromo = useCartStore((s) => s.removePromo);
  const items = useCartStore((s) => s.items);
  const summary = computeSummary(items, promo);
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleApply = () => {
    const res = applyPromo(code);
    if ('error' in res) {
      setError(res.error);
    } else {
      setCode('');
      setError(null);
    }
  };

  const belowMin = summary.subtotal < MIN_ORDER;

  return (
    <div className="space-y-4">
      {/* Промокод */}
      {promo ? (
        <div className="flex items-center gap-3 rounded-2xl bg-emerald-50 border border-emerald-200 px-4 py-3">
          <span className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0">
            <Check className="w-4 h-4" strokeWidth={3} />
          </span>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm">{promo.code}</div>
            <div className="text-xs text-emerald-700">
              {summary.promoBelowMin && promo.minTotal
                ? `Сработает от ${formatRub(promo.minTotal)} — добавьте ещё на ${formatRub(promo.minTotal - summary.subtotal)}`
                : promo.title}
            </div>
          </div>
          <button
            onClick={removePromo}
            className="p-1.5 text-muted-foreground hover:text-foreground rounded-full hover:bg-black/5 transition"
            aria-label="Убрать промокод"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div>
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              handleApply();
            }}
          >
            <div className="relative flex-1">
              <TicketPercent className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
              <input
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="Промокод"
                autoCapitalize="characters"
                autoComplete="off"
                spellCheck={false}
                className={`w-full h-12 pl-11 pr-3 rounded-full border bg-background text-base uppercase placeholder:normal-case placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring ${error ? 'border-destructive' : 'border-input'}`}
              />
            </div>
            <button
              type="submit"
              disabled={!code.trim()}
              className="h-12 px-5 rounded-full bg-foreground text-background font-semibold text-sm transition hover:bg-foreground/85 active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none"
            >
              Применить
            </button>
          </form>
          {error && <p className="mt-1.5 pl-4 text-xs text-destructive">{error}</p>}
        </div>
      )}

      {/* Разбивка суммы */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Товары, {summary.count} шт</span>
          <span>{formatRub(summary.subtotal)}</span>
        </div>
        {summary.discount > 0 && (
          <div className="flex justify-between text-emerald-600">
            <span>Скидка по промокоду</span>
            <span>−{formatRub(summary.discount)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-muted-foreground">Доставка</span>
          <span>{summary.delivery === 0 ? 'Бесплатно' : formatRub(summary.delivery)}</span>
        </div>
        {summary.toFreeDelivery > 0 && (
          <div className="pt-0.5">
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-orange-500 transition-[width] duration-300"
                style={{ width: `${Math.min(100, (summary.subtotal / FREE_DELIVERY_FROM) * 100)}%` }}
              />
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground">
              До бесплатной доставки ещё {formatRub(summary.toFreeDelivery)}
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-border pt-3">
        <span className="text-lg font-semibold">Итого</span>
        <span className="text-2xl font-bold">{formatRub(summary.total)}</span>
      </div>

      <button
        onClick={onCheckout}
        disabled={belowMin}
        className="w-full text-background py-4 rounded-full font-semibold text-lg transition-all hover:scale-[1.01] active:scale-[0.99] bg-orange-500 hover:bg-orange-400 disabled:opacity-50 disabled:pointer-events-none"
      >
        Перейти к оформлению
      </button>
      <p className="text-xs text-center text-muted-foreground">
        {belowMin
          ? `Минимальная сумма заказа ${formatRub(MIN_ORDER)} — добавьте ещё на ${formatRub(MIN_ORDER - summary.subtotal)}`
          : `Минимальная сумма заказа: ${formatRub(MIN_ORDER)}`}
      </p>
    </div>
  );
};

const CartPopup = () => {
  const {
    items,
    isOpen,
    setIsOpen,
    updateQuantity,
    removeItem,
    clearCart
  } = useCartStore();
  const {
    openCheckoutWithAuthCheck
  } = useUIStore();
  const { customImages } = useProductImageContext();
  const [isClosing, setIsClosing] = useState(false);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);
  const [isBackdropHover, setIsBackdropHover] = useState(false);
  
  const getImageUrl = (product: Product) => {
    return customImages[product.image] || getProductImageForProduct(product);
  };
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 200);
  };
  const swipeHandlers = useSwipeClose({
    direction: 'down',
    threshold: 80,
    onClose: handleClose
  });
  if (!isOpen) return null;
  const handleCheckout = () => {
    setIsOpen(false);
    openCheckoutWithAuthCheck();
  };
  return <div className="fixed inset-0 z-50">
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

      <div
        className={`
          lg:hidden
          absolute bottom-0 left-0 right-0 bg-card rounded-t-3xl shadow-popup
          h-[90vh] overflow-hidden transition-transform duration-300 ease-out
          ${isClosing ? 'translate-y-full' : 'animate-slide-in-up'}
        `}
        {...swipeHandlers}
      >
        <div className="flex flex-col h-full relative product-popup-scroll">
          <div className="flex justify-center pt-3 pb-1 absolute top-0 left-0 right-0 z-20">
            <div className="w-10 h-1 bg-muted-foreground/30 rounded-full" />
          </div>
        <div className="p-4 pt-6 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            <h2 className="text-xl font-bold">Корзина</h2>
          </div>
          <button onClick={handleClose} className="p-2 hover:bg-muted rounded-full transition-all hover:scale-105 active:scale-95">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {items.length === 0 ? <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Корзина пуста</h3>
              <p className="text-muted-foreground text-sm">
                Добавьте что-нибудь вкусное из меню
              </p>
            </div> : <div className="p-4 space-y-4">
              <ClearCartRow onClear={clearCart} />
              {items.map((item, index) => <div key={item.product.id} className="flex gap-4 p-3 bg-muted/50 rounded-2xl animate-fade-in" style={{
            animationDelay: `${index * 50}ms`
          }}>
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={getImageUrl(item.product)} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm line-clamp-2 mb-1">
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      {item.product.weight}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-all hover:scale-105 active:scale-95">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-all hover:scale-105 active:scale-95">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-semibold text-sm">
                        {formatRub(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                  <button onClick={() => removeItem(item.product.id)} className="p-2 text-muted-foreground hover:text-destructive transition-all self-start hover:scale-105 active:scale-95">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>)}
            </div>}
        </div>
        {items.length > 0 && <div className="p-4 border-t border-border">
            <CartSummaryBlock onCheckout={handleCheckout} />
          </div>}
        </div>
      </div>

      {/* Компьютер: окно по центру со скруглениями, как окно товара (на мобильных — шторка выше) */}
      <div className="hidden lg:flex absolute inset-0 items-center justify-center p-8 pointer-events-none">
      <div
        className={`
          pointer-events-auto flex flex-col w-[min(640px,calc(100vw-64px))] max-h-[min(796px,calc(100vh-64px))]
          bg-card rounded-[28px] overflow-hidden shadow-2xl
          transition-all duration-200 ease-out
          ${isClosing ? 'opacity-0 scale-95' : 'animate-fade-in'}
        `}
      >
        <div className="px-6 py-5 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            <h2 className="text-xl font-bold">Корзина</h2>
          </div>
          <button onClick={handleClose} className="p-2 hover:bg-muted rounded-full transition-all hover:scale-105 active:scale-95" aria-label="Закрыть">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
          {items.length === 0 ? <div className="flex flex-col items-center justify-center text-center px-8 py-16">
              <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Корзина пуста</h3>
              <p className="text-muted-foreground text-sm">
                Добавьте что-нибудь вкусное из меню
              </p>
            </div> : <div className="px-6 py-4 space-y-3">
              <ClearCartRow onClear={clearCart} />
              {items.map((item, index) => <div key={item.product.id} className="flex gap-4 p-3 bg-muted/50 rounded-2xl animate-fade-in" style={{
            animationDelay: `${index * 50}ms`
          }}>
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={getImageUrl(item.product)} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm line-clamp-2 mb-1">
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      {item.product.weight}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-all hover:scale-105 active:scale-95">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-all hover:scale-105 active:scale-95">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-semibold text-sm">
                        {formatRub(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                  <button onClick={() => removeItem(item.product.id)} className="p-2 text-muted-foreground hover:text-destructive transition-all self-start hover:scale-105 active:scale-95">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>)}
            </div>}
        </div>
        {items.length > 0 && <div className="px-6 py-5 border-t border-border">
            <CartSummaryBlock onCheckout={handleCheckout} />
          </div>}
      </div>
      </div>
    </div>;
};
export default CartPopup;
