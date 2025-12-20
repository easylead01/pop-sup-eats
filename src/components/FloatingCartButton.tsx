import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

const FloatingCartButton = () => {
  const { setIsOpen, getTotalPrice } = useCartStore();
  const totalPrice = getTotalPrice();

  return (
    <button
      onClick={() => setIsOpen(true)}
      className="xl:hidden fixed bottom-6 right-[76px] md:right-[88px] z-50 flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-full font-semibold text-sm shadow-lg hover:bg-primary/90 transition-all active:scale-95"
    >
      <ShoppingBag className="w-5 h-5" />
      <span>{totalPrice > 0 ? `${totalPrice} ₽` : '0 ₽'}</span>
    </button>
  );
};

export default FloatingCartButton;
