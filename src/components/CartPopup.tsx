import { useState } from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useUIStore } from '@/store/uiStore';
import { getProductImageForProduct } from '@/lib/images';
import { Product } from '@/data/products';
import { useSwipeClose } from '@/hooks/useSwipeClose';
import { useProductImageContext } from '@/components/ProductImageProvider';

const CartPopup = () => {
  const {
    items,
    isOpen,
    setIsOpen,
    updateQuantity,
    removeItem,
    getTotalPrice,
    clearCart
  } = useCartStore();
  const {
    openCheckoutWithAuthCheck
  } = useUIStore();
  const { customImages } = useProductImageContext();
  const [isClosing, setIsClosing] = useState(false);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);
  const [isBackdropHover, setIsBackdropHover] = useState(false);
  const totalPrice = getTotalPrice();
  
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
                        {item.product.price * item.quantity} ₽
                      </span>
                    </div>
                  </div>
                  <button onClick={() => removeItem(item.product.id)} className="p-2 text-muted-foreground hover:text-destructive transition-all self-start hover:scale-105 active:scale-95">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>)}
            </div>}
        </div>
        {items.length > 0 && <div className="p-4 border-t border-border space-y-4">
            <button onClick={clearCart} className="text-sm text-muted-foreground hover:text-destructive transition-colors">
              Очистить корзину
            </button>
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">Итого</span>
              <span className="text-2xl font-bold">{totalPrice} ₽</span>
            </div>
            <button onClick={handleCheckout} className="w-full text-background py-4 rounded-full font-semibold text-lg transition-all hover:scale-[1.01] active:scale-[0.99] bg-orange-500 hover:bg-orange-400">
              Перейти к оформлению
            </button>
            <p className="text-xs text-center text-muted-foreground">
              Минимальная сумма заказа: 500 ₽
            </p>
          </div>}
        </div>
      </div>

      <div
        className={`
          hidden lg:flex
          absolute right-0 top-0 h-screen w-full max-w-md bg-card flex-col shadow-popup
          transition-transform duration-200
          ${isClosing ? 'translate-x-full' : 'animate-slide-in-right'}
        `}
      >
        <div className="p-4 border-b border-border flex items-center justify-between">
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
                        {item.product.price * item.quantity} ₽
                      </span>
                    </div>
                  </div>
                  <button onClick={() => removeItem(item.product.id)} className="p-2 text-muted-foreground hover:text-destructive transition-all self-start hover:scale-105 active:scale-95">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>)}
            </div>}
        </div>
        {items.length > 0 && <div className="p-4 border-t border-border space-y-4">
            <button onClick={clearCart} className="text-sm text-muted-foreground hover:text-destructive transition-colors">
              Очистить корзину
            </button>
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">Итого</span>
              <span className="text-2xl font-bold">{totalPrice} ₽</span>
            </div>
            <button onClick={handleCheckout} className="w-full text-background py-4 rounded-full font-semibold text-lg transition-all hover:scale-[1.01] active:scale-[0.99] bg-orange-500 hover:bg-orange-400">
              Перейти к оформлению
            </button>
            <p className="text-xs text-center text-muted-foreground">
              Минимальная сумма заказа: 500 ₽
            </p>
          </div>}
      </div>
    </div>;
};
export default CartPopup;
