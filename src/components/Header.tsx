import { MapPin, Search, SlidersHorizontal, Menu, ShoppingBag, User, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '@/store/cartStore';
import { useUIStore } from '@/store/uiStore';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.png';
const Header = () => {
  const {
    setIsOpen: setCartOpen,
    getTotalPrice,
    getTotalItems
  } = useCartStore();
  const {
    setMenuOpen,
    setAuthOpen,
    isLoggedIn
  } = useUIStore();
  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();
  return <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="items-center justify-between h-16 md:h-20 my-[23px] py-[42px] px-0 mx-0 flex flex-row gap-0 relative">
          {/* Menu button - left on mobile/tablet */}
          <button onClick={() => setMenuOpen(true)} className="xl:hidden p-2 hover:bg-muted rounded-full transition-colors absolute left-0">
            <Menu className="w-6 h-6" />
          </button>
          
          {/* Logo - centered on mobile/tablet, left on desktop */}
          <div className="flex items-center gap-2 xl:relative absolute left-1/2 -translate-x-1/2 xl:left-0 xl:translate-x-0">
            <button onClick={() => setMenuOpen(true)} className="hidden xl:block p-2 hover:bg-muted rounded-full transition-colors">
              <Menu className="w-6 h-6" />
            </button>
            <img alt="OKIAHABA" className="h-16 md:h-20" src="/lovable-uploads/0107a67c-2673-415a-a89e-a28b89381bfd.png" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <button onClick={() => setMenuOpen(true)} className="font-medium hover:text-primary transition-colors mx-[8px] my-0 px-[6px] py-0 flex-row flex items-center justify-center gap-[9px] text-2xl">
              <Menu className="w-5 h-5" />
              Меню
            </button>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary rounded" />
              <span className="text-base">Москва</span>
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
            <Link to="/admin" className="hidden xl:flex p-2.5 hover:bg-muted rounded-full transition-colors" title="Управление изображениями">
              <Settings className="w-5 h-5" />
            </Link>
            
            <button className="hidden xl:flex p-2.5 hover:bg-muted rounded-full transition-colors">
              <Search className="w-5 h-5" />
            </button>
            
            <Button variant="ghost" size="sm" onClick={() => setAuthOpen(true)} className="hidden xl:flex items-center gap-2 rounded-full px-4">
              <User className="w-4 h-4" />
              {isLoggedIn ? 'Профиль' : 'Войти'}
            </Button>

            {/* Cart Button - Desktop only */}
            <button onClick={() => setCartOpen(true)} className="hidden xl:flex items-center gap-2 bg-foreground text-background px-4 py-2.5 rounded-full font-semibold text-sm hover:bg-foreground/90 transition-colors">
              <ShoppingBag className="w-5 h-5" />
              <span>{totalItems > 0 ? `${totalPrice} ₽` : '0 ₽'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>;
};
export default Header;