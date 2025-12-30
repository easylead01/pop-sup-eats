import { MapPin, Search, SlidersHorizontal, Menu, ShoppingBag, User, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '@/store/cartStore';
import { useUIStore } from '@/store/uiStore';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.png';
const Header = () => {
  const {
    setIsOpen: setCartOpen,
    isOpen: isCartOpen,
    getTotalPrice,
    getTotalItems
  } = useCartStore();
  const {
    setMenuOpen,
    setAuthOpen,
    isLoggedIn,
    isMenuOpen,
    isAuthOpen,
    isCheckoutOpen,
    selectedProduct
  } = useUIStore();
  const isOverlayOpen = isMenuOpen || isAuthOpen || isCheckoutOpen || !!selectedProduct || isCartOpen;
  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();
  return <header className={`sticky top-0 z-[60] bg-card/95 backdrop-blur-sm border-b border-border transition-opacity duration-200 ${isOverlayOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="container mx-auto px-4">
        <div className="items-center justify-between h-16 md:h-20 my-[23px] py-[42px] px-0 mx-0 flex flex-row gap-0 relative">
          {/* Menu button - left on mobile/tablet */}
          <button onClick={() => setMenuOpen(true)} className="lg:hidden absolute left-0 top-[27px] md:top-[35px] w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-md hover:bg-primary/90 transition-all">
            <div className="grid grid-cols-3 gap-[2px] md:gap-[3px]">
              <span className="w-1 h-1 bg-primary-foreground rounded-full" />
              <span className="w-1 h-1 bg-primary-foreground rounded-full" />
              <span className="w-1 h-1 bg-primary-foreground rounded-full" />
              <span className="w-1 h-1 bg-primary-foreground rounded-full" />
              <span className="w-1 h-1 bg-primary-foreground rounded-full" />
              <span className="w-1 h-1 bg-primary-foreground rounded-full" />
              <span className="w-1 h-1 bg-primary-foreground rounded-full" />
              <span className="w-1 h-1 bg-primary-foreground rounded-full" />
              <span className="w-1 h-1 bg-primary-foreground rounded-full" />
            </div>
          </button>
          
          {/* Logo - centered on mobile/tablet, left on desktop */}
          <div className="flex items-center gap-2 lg:relative absolute top-[15px] lg:-top-[5px] left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0">
            <button onClick={() => setMenuOpen(true)} className="hidden lg:flex mt-[14.5px] w-10 h-10 bg-primary text-primary-foreground rounded-full items-center justify-center shadow-md hover:bg-primary/90 transition-all">
              <div className="grid grid-cols-3 grid-rows-3 lg:w-[70%] lg:h-[70%] place-items-center gap-[4%]">
                <span className="block w-1 h-1 bg-primary-foreground rounded-full" />
                <span className="block w-1 h-1 bg-primary-foreground rounded-full" />
                <span className="block w-1 h-1 bg-primary-foreground rounded-full" />
                <span className="block w-1 h-1 bg-primary-foreground rounded-full" />
                <span className="block w-1 h-1 bg-primary-foreground rounded-full" />
                <span className="block w-1 h-1 bg-primary-foreground rounded-full" />
                <span className="block w-1 h-1 bg-primary-foreground rounded-full" />
                <span className="block w-1 h-1 bg-primary-foreground rounded-full" />
                <span className="block w-1 h-1 bg-primary-foreground rounded-full" />
              </div>
            </button>
            <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <img alt="OKIAHABA" className="h-16 md:h-20 cursor-pointer lg:ml-5" src={logo} />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6" style={{ position: 'relative', top: 5 }}>
            
            
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
          <div className="flex items-center gap-2 md:gap-3 lg:translate-y-[5px] lg:transform">
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
