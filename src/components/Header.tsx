import { MapPin, Search, SlidersHorizontal, Menu, ShoppingBag, User } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useUIStore } from '@/store/uiStore';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.png';

const Header = () => {
  const { setIsOpen: setCartOpen, getTotalPrice, getTotalItems } = useCartStore();
  const { setMenuOpen, setAuthOpen, isLoggedIn } = useUIStore();
  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  return (
    <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-muted rounded-full transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <img src={logo} alt="OKIAHABA" className="h-16 md:h-20" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <button
              onClick={() => setMenuOpen(true)}
              className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
            >
              <Menu className="w-5 h-5" />
              Меню
            </button>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Москва</span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-sm font-medium">ТЦ Метрополис</span>
              <span className="text-xs text-muted-foreground">Ленинградское ш., 16А</span>
            </div>
            
            <span className="text-sm font-medium text-muted-foreground">
              8-800-700-01-10
            </span>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 md:gap-3">
            <button className="hidden md:flex p-2.5 hover:bg-muted rounded-full transition-colors">
              <SlidersHorizontal className="w-5 h-5" />
            </button>
            
            <button className="p-2.5 hover:bg-muted rounded-full transition-colors">
              <Search className="w-5 h-5" />
            </button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setAuthOpen(true)}
              className="hidden md:flex items-center gap-2 rounded-full px-4"
            >
              <User className="w-4 h-4" />
              {isLoggedIn ? 'Профиль' : 'Войти'}
            </Button>

            {/* Cart Button */}
            <button
              onClick={() => setCartOpen(true)}
              className="flex items-center gap-2 bg-foreground text-background px-4 py-2.5 rounded-full font-semibold text-sm hover:bg-foreground/90 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>{totalItems > 0 ? `${totalPrice} ₽` : '0 ₽'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
