import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import ShortsCarousel from '@/components/ShortsCarousel';
import logo from '@/assets/logo.png';
import CategoryNav from '@/components/CategoryNav';
import CategorySidebar from '@/components/CategorySidebar';
import CategorySection from '@/components/CategorySection';
import MenuPopup from '@/components/MenuPopup';
import ProductPopup from '@/components/ProductPopup';
import CartPopup from '@/components/CartPopup';
import AuthPopup from '@/components/AuthPopup';
import CheckoutSheet from '@/components/CheckoutSheet';
import FloatingCartButton from '@/components/FloatingCartButton';
import { categories, getProductsByCategory } from '@/data/products';
import { ChevronUp } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { useCartStore } from '@/store/cartStore';

const Index = () => {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const { selectedProduct, isMenuOpen, isAuthOpen, isCheckoutOpen } = useUIStore();
  const { isOpen: isCartOpen } = useCartStore();
  const isOverlayOpen = !!selectedProduct || isMenuOpen || isAuthOpen || isCheckoutOpen || isCartOpen;
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ShortsCarousel />
      <CategoryNav />
      
      {/* Main content with sidebar */}
      <div className="container mx-auto px-4 flex">
        {/* Sidebar menu - desktop only */}
        <CategorySidebar />
        
        {/* Products */}
        <main className="flex-1 pb-20 xl:pl-[20px]">
          {categories.map((category) => (
            <CategorySection
              key={category.id}
              id={category.id}
              name={category.name}
              products={getProductsByCategory(category.id)}
            />
          ))}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-[#2B2D33] py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Logo & Description */}
            <div>
              <div className="mb-4">
                <img src={logo} alt="OKIAHABA" className="h-10" />
              </div>
              <p className="text-gray-400 text-sm">
                Доставка вкусных роллов, суши и пиццы по Москве
              </p>
            </div>

            {/* Menu */}
            <div>
              <h3 className="text-white font-semibold mb-4">Меню</h3>
              <ul className="space-y-2">
                <li><a href="#rolls" className="text-gray-400 hover:text-white transition-colors text-sm">Роллы</a></li>
                <li><a href="#sets" className="text-gray-400 hover:text-white transition-colors text-sm">Сеты</a></li>
                <li><a href="#sushi" className="text-gray-400 hover:text-white transition-colors text-sm">Суши</a></li>
                <li><a href="#pizza" className="text-gray-400 hover:text-white transition-colors text-sm">Пицца</a></li>
              </ul>
            </div>

            {/* Information */}
            <div>
              <h3 className="text-white font-semibold mb-4">Информация</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">О компании</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Доставка и оплата</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Контакты</a></li>
              </ul>
            </div>

            {/* Contacts */}
            <div>
              <h3 className="text-white font-semibold mb-4">Контакты</h3>
              <a href="tel:88007000110" className="text-white text-2xl font-bold hover:text-primary transition-colors">
                8-800-700-01-10
              </a>
              <p className="text-gray-400 text-sm mt-2">Звонок бесплатный</p>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-600 pt-6">
            <p className="text-center text-gray-400 text-sm">
              © 2025 OKIAHABA. Все права защищены.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Cart Button - Mobile only */}
      <FloatingCartButton />

      {/* All Popups & Overlays */}
      <MenuPopup />
      <ProductPopup />
      <CartPopup />
      <AuthPopup />
      <CheckoutSheet />
      
      {/* Scroll To Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed z-50 rounded-full bg-black text-white flex items-center justify-center shadow-lg transition-opacity duration-200 
          ${showTop && !isOverlayOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
          w-11 h-11 md:w-11 md:h-11 xl:w-12 xl:h-12
          bottom-6 right-6 md:bottom-6 md:right-6 xl:bottom-8 xl:right-8
        `}
        aria-label="Наверх"
        title="Наверх"
      >
        <ChevronUp className="w-5 h-5 md:w-5 md:h-5 xl:w-6 xl:h-6" />
      </button>
    </div>
  );
};

export default Index;
