import { useState } from 'react';
import { X, MapPin, User, Phone, MessageSquare, CreditCard, Truck } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { useCartStore } from '@/store/cartStore';
import { useSwipeClose } from '@/hooks/useSwipeClose';
import { toast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';

const CheckoutSheet = () => {
  const { isCheckoutOpen, setCheckoutOpen } = useUIStore();
  const { getTotalPrice, clearCart, items } = useCartStore();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    comment: '',
  });
  const [loading, setLoading] = useState(false);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);
  const [isBackdropHover, setIsBackdropHover] = useState(false);

  const swipeHandlers = useSwipeClose({
    direction: 'down',
    threshold: 80,
    onClose: () => setCheckoutOpen(false),
  });

  if (!isCheckoutOpen) return null;

  const totalPrice = getTotalPrice();
  const deliveryFee = totalPrice >= 1500 ? 0 : 199;
  const finalTotal = totalPrice + deliveryFee;

  const handleSubmit = async () => {
    if (!formData.name || !formData.phone || !formData.address) {
      toast({
        title: 'Заполните все поля',
        description: 'Имя, телефон и адрес обязательны',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    
    toast({
      title: 'Заказ оформлен!',
      description: `Сумма: ${finalTotal} ₽. Ожидайте курьера.`,
    });
    
    clearCart();
    setCheckoutOpen(false);
    setFormData({ name: '', phone: '', address: '', comment: '' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/50 animate-fade-in"
        onClick={() => setCheckoutOpen(false)}
        onMouseEnter={() => setIsBackdropHover(true)}
        onMouseLeave={() => { setIsBackdropHover(false); setCursorPos(null); }}
        onMouseMove={(e) => setCursorPos({ x: e.clientX, y: e.clientY })}
      >
        <button
          onClick={(e) => { e.stopPropagation(); setCheckoutOpen(false); }}
          className={`hidden md:flex absolute -translate-x-1/2 -translate-y-1/2 z-[60] w-10 h-10 bg-foreground text-background rounded-full items-center justify-center shadow-md transition-opacity duration-100 ${isBackdropHover ? 'opacity-100' : 'opacity-0'} hover:scale-105 active:scale-95`}
          style={cursorPos ? { left: cursorPos.x, top: cursorPos.y } : undefined}
          title="Закрыть"
          aria-label="Закрыть"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Sheet */}
      <div 
        className="relative w-full md:max-w-lg bg-card rounded-t-3xl md:rounded-3xl max-h-[85vh] md:max-h-[90vh] overflow-hidden animate-slide-in-up md:animate-scale-in shadow-popup"
        {...swipeHandlers}
      >
        {/* Drag Handle (mobile) */}
        <div className="md:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-muted-foreground/30 rounded-full" />
        </div>

        {/* Header */}
        <div className="sticky top-0 bg-card z-10 px-6 py-4 border-b border-border flex items-center justify-between">
          <h2 className="text-xl font-bold">Оформление заказа</h2>
          <button
            onClick={() => setCheckoutOpen(false)}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto overscroll-contain max-h-[calc(85vh-180px)] md:max-h-[calc(90vh-200px)]">
          <div className="p-6 space-y-5">
            {/* Form */}
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="pl-12"
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="pl-12"
                />
              </div>

              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Адрес доставки"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="pl-12"
                />
              </div>

              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
                <textarea
                  placeholder="Комментарий к заказу (необязательно)"
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  className="w-full min-h-[80px] pl-12 pr-4 py-3 rounded-2xl border border-input bg-background text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                />
              </div>
            </div>

            {/* Delivery info */}
            <div className="bg-muted/50 rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Доставка</p>
                  <p className="text-sm text-muted-foreground">
                    {deliveryFee === 0 ? 'Бесплатно' : `${deliveryFee} ₽`}
                  </p>
                </div>
              </div>
              
              {deliveryFee > 0 && (
                <p className="text-xs text-muted-foreground">
                  Бесплатная доставка от 1500 ₽. До бесплатной доставки: {1500 - totalPrice} ₽
                </p>
              )}
            </div>

            {/* Payment method */}
            <div className="bg-muted/50 rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Способ оплаты</p>
                  <p className="text-sm text-muted-foreground">Картой при получении</p>
                </div>
              </div>
            </div>

            {/* Order summary */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Товары ({items.length})</span>
                <span>{totalPrice} ₽</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Доставка</span>
                <span>{deliveryFee === 0 ? 'Бесплатно' : `${deliveryFee} ₽`}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-card border-t border-border p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">Итого</span>
            <span className="text-2xl font-bold">{finalTotal} ₽</span>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading || items.length === 0}
            className="w-full bg-foreground text-background py-4 rounded-full font-semibold text-lg hover:bg-foreground/90 transition-colors disabled:opacity-50"
          >
            {loading ? 'Оформляем...' : 'Оформить заказ'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSheet;
