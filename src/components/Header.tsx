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
          <button onClick={() => setMenuOpen(true)} className="lg:hidden absolute left-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-md hover:bg-primary/90 transition-all">
            <div className="grid grid-cols-3 gap-[2px]">
              <span className="w-1.5 h-1.5 bg-primary-foreground rounded-sm" />
              <span className="w-1.5 h-1.5 bg-primary-foreground rounded-sm" />
              <span className="w-1.5 h-1.5 bg-primary-foreground rounded-sm" />
              <span className="w-1.5 h-1.5 bg-primary-foreground rounded-sm" />
              <span className="w-1.5 h-1.5 bg-primary-foreground rounded-sm" />
              <span className="w-1.5 h-1.5 bg-primary-foreground rounded-sm" />
              <span className="w-1.5 h-1.5 bg-primary-foreground rounded-sm" />
              <span className="w-1.5 h-1.5 bg-primary-foreground rounded-sm" />
              <span className="w-1.5 h-1.5 bg-primary-foreground rounded-sm" />
            </div>
          </button>
          
          {/* Logo - centered on mobile/tablet, left on desktop */}
          <div className="flex items-center gap-2 lg:relative absolute left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0">
            <button onClick={() => setMenuOpen(true)} className="hidden lg:flex w-10 h-10 bg-primary text-primary-foreground rounded-full items-center justify-center shadow-md hover:bg-primary/90 transition-all">
              <div className="grid grid-cols-3 gap-[2px]">
                <span className="w-1.5 h-1.5 bg-primary-foreground rounded-sm" />
                <span className="w-1.5 h-1.5 bg-primary-foreground rounded-sm" />
                <span className="w-1.5 h-1.5 bg-primary-foreground rounded-sm" />
                <span className="w-1.5 h-1.5 bg-primary-foreground rounded-sm" />
                <span className="w-1.5 h-1.5 bg-primary-foreground rounded-sm" />
                <span className="w-1.5 h-1.5 bg-primary-foreground rounded-sm" />
                <span className="w-1.5 h-1.5 bg-primary-foreground rounded-sm" />
                <span className="w-1.5 h-1.5 bg-primary-foreground rounded-sm" />
                <span className="w-1.5 h-1.5 bg-primary-foreground rounded-sm" />
              </div>
            </button>
            <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <img alt="OKIAHABA" className="h-16 md:h-20 cursor-pointer lg:ml-5" src={logo} />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            
            
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
            <Link to="/admin" className="hidden lg:flex p-2.5 hover:bg-muted rounded-full transition-colors" title="Управление изображениями">
              <Settings className="w-5 h-5" />
            </Link>
            
            <button className="hidden lg:flex p-2.5 hover:bg-muted rounded-full transition-colors">
              <Search className="w-5 h-5" />
            </button>
            
            <Button variant="ghost" size="sm" onClick={() => setAuthOpen(true)} className="hidden lg:flex items-center gap-2 rounded-full px-4">
              <User className="w-4 h-4" />
              {isLoggedIn ? 'Профиль' : 'Войти'}
            </Button>

            {/* Cart Button - Desktop only */}
            <button onClick={() => setCartOpen(true)} className="hidden lg:flex items-center gap-2 bg-foreground text-background px-4 py-2.5 rounded-full font-semibold text-sm hover:bg-foreground/90 transition-colors">
              <ShoppingBag className="w-5 h-5" />
              <span>{totalItems > 0 ? `${totalPrice} ₽` : '0 ₽'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>;
};
export default Header;
