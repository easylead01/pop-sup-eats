import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { getProductImage } from '@/lib/images';
import { toast } from '@/hooks/use-toast';

const CartPopup = () => {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, getTotalPrice, clearCart } = useCartStore();
  const totalPrice = getTotalPrice();

  if (!isOpen) return null;

  const handleCheckout = () => {
    toast({
      title: 'Переходим к оформлению',
      description: `Сумма заказа: ${totalPrice} ₽`,
    });
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/40 animate-fade-in"
        onClick={() => setIsOpen(false)}
      />

      {/* Panel */}
      <div className="relative w-full max-w-md bg-card h-full flex flex-col animate-slide-in-right shadow-popup">
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            <h2 className="text-xl font-bold">Корзина</h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Корзина пуста</h3>
              <p className="text-muted-foreground text-sm">
                Добавьте что-нибудь вкусное из меню
              </p>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3 bg-muted/50 rounded-2xl"
                >
                  {/* Image */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={getProductImage(item.product.image)}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm line-clamp-2 mb-1">
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      {item.product.weight}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      {/* Quantity */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="font-semibold text-sm">
                        {item.product.price * item.quantity} ₽
                      </span>
                    </div>
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="p-2 text-muted-foreground hover:text-destructive transition-colors self-start"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t border-border space-y-4">
            {/* Clear */}
            <button
              onClick={clearCart}
              className="text-sm text-muted-foreground hover:text-destructive transition-colors"
            >
              Очистить корзину
            </button>

            {/* Total */}
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">Итого</span>
              <span className="text-2xl font-bold">{totalPrice} ₽</span>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              className="w-full bg-foreground text-background py-4 rounded-full font-semibold text-lg hover:bg-foreground/90 transition-colors"
            >
              Перейти к оформлению
            </button>

            <p className="text-xs text-center text-muted-foreground">
              Минимальная сумма заказа: 500 ₽
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPopup;
