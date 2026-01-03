import { useState } from 'react';
import { MapPin, SlidersHorizontal, Menu, ShoppingBag, User, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '@/store/cartStore';
import { useUIStore } from '@/store/uiStore';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import logo from '@/assets/logo (1).png';
const Header = () => {
  const addresses = [
    'ул. Федора Тютчева, д. 97',
    'ул. Минская, д. 67а',
    'ул. Адмирала Чурсина, 2/1, район Озерки',
    'ул. 50 Лет Октября, д. 95',
    'ул. Ростовская, д. 100б'
  ];
  const [currentAddressIndex, setCurrentAddressIndex] = useState<number | null>(null);
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
    selectedProduct,
    isFiltersOpen,
    setFiltersOpen
  } = useUIStore();
  const isOverlayOpen =
    isMenuOpen || isAuthOpen || isCheckoutOpen || !!selectedProduct || isCartOpen || isFiltersOpen;
  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();
  return <header className={`sticky top-0 z-[60] bg-card/95 backdrop-blur-sm border-b border-border transition-opacity duration-200 ${isOverlayOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="container mx-auto px-4">
        <div className="items-center justify-between h-16 md:h-20 my-[23px] py-[42px] px-0 mx-0 flex flex-row gap-0 relative">
          {/* Mobile/Tablet header row */}
          <div className="flex lg:hidden items-center justify-between w-full translate-y-[10px]">
            {/* Menu button - left on mobile/tablet */}
            <button
              onClick={() => setMenuOpen(true)}
              className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-md hover:bg-primary/90 transition-all"
            >
              <div className="grid grid-cols-3 gap-[1px] md:gap-[2px]">
                <span className="w-[3px] h-[3px] bg-primary-foreground rounded-full" />
                <span className="w-[3px] h-[3px] bg-primary-foreground rounded-full" />
                <span className="w-[3px] h-[3px] bg-primary-foreground rounded-full" />
                <span className="w-[3px] h-[3px] bg-primary-foreground rounded-full" />
                <span className="w-[3px] h-[3px] bg-primary-foreground rounded-full" />
                <span className="w-[3px] h-[3px] bg-primary-foreground rounded-full" />
                <span className="w-[3px] h-[3px] bg-primary-foreground rounded-full" />
                <span className="w-[3px] h-[3px] bg-primary-foreground rounded-full" />
                <span className="w-[3px] h-[3px] bg-primary-foreground rounded-full" />
              </div>
            </button>

            {/* Centered logo between menu and filters/auth */}
            <div className="flex-1 flex justify-center">
              <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <span className="h-16 md:h-20 cursor-pointer flex items-center -translate-y-[6px] md:-translate-y-[4px]">
                  <img src={logo} alt="OKIAHABA" className="h-16 md:h-20 w-auto" />
                </span>
              </Link>
            </div>

            {/* Filters & auth buttons - right on mobile/tablet */}
            <div className="flex items-center gap-2 translate-y-[1px]">
              <button
                onClick={() => setFiltersOpen(true)}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-card text-foreground border border-border shadow-md hover:bg-muted transition-all"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>
              <button
                onClick={() => setAuthOpen(true)}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-card text-foreground border border-border shadow-md hover:bg-muted transition-all"
              >
                <User className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Logo - desktop */}
          <div className="hidden lg:flex items-center gap-2 relative -top-[5px]">
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
              <span className="h-16 md:h-20 cursor-pointer lg:ml-5 flex items-center">
                <img src={logo} alt="OKIAHABA" className="h-16 md:h-20 w-auto" />
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6" style={{ position: 'relative', top: 5 }}>
            
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary rounded" />
              <span className="text-base">Воронеж</span>
            </div>
            <div className="flex flex-col">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="text-left outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
                    <span className="text-sm font-medium">
                      {currentAddressIndex === null ? 'Укажите адрес' : addresses[currentAddressIndex]}
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" sideOffset={8} className="z-[80] mt-1">
                  {addresses.map((address, index) => (
                    <DropdownMenuItem
                      key={address}
                      onClick={() => setCurrentAddressIndex(index)}
                    >
                      {address}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              {/* Desktop: текст, мобилка/планшет: кликабельный номер */}
              <span className="hidden lg:inline text-xs text-muted-foreground">
                +7 (473) 290-43-41
              </span>
              <a
                href="tel:+74732904341"
                className="inline lg:hidden text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                +7 (473) 290-43-41
              </a>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 md:gap-3 lg:translate-y-[5px] lg:transform">
            <Link to="/admin" className="hidden lg:flex p-2.5 hover:bg-muted rounded-full transition-colors" title="Управление изображениями">
              <Settings className="w-5 h-5" />
            </Link>
            
            <button onClick={() => setFiltersOpen(true)} className="hidden lg:flex p-2.5 hover:bg-muted rounded-full transition-colors">
              <SlidersHorizontal className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => setAuthOpen(true)}
              className="hidden lg:flex items-center gap-2 bg-foreground text-background px-4 py-2.5 rounded-full font-semibold text-sm hover:bg-foreground/90 transition-colors"
            >
              <User className="w-4 h-4" />
              <span>{isLoggedIn ? 'Профиль' : 'Войти'}</span>
            </button>

            {/* Cart Button - Desktop only */}
            <button
              onClick={() => setCartOpen(true)}
              className="hidden lg:flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-full font-semibold text-sm shadow-lg hover:bg-primary/90 transition-all active:scale-95"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>{totalItems > 0 ? `${totalPrice} ₽` : '0 ₽'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>;
};
export default Header;
