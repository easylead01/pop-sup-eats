import { useEffect, useState, useRef } from 'react';
import type { TouchEvent } from 'react';
import Header from '@/components/Header';
import ShortsCarousel from '@/components/ShortsCarousel';
import CategoryNav from '@/components/CategoryNav';
import CategorySidebar from '@/components/CategorySidebar';
import CategorySection from '@/components/CategorySection';
import MenuPopup from '@/components/MenuPopup';
import ProductPopup from '@/components/ProductPopup';
import CartPopup from '@/components/CartPopup';
import AuthPopup from '@/components/AuthPopup';
import CheckoutSheet from '@/components/CheckoutSheet';
import FloatingCartButton from '@/components/FloatingCartButton';
import FiltersPopup from '@/components/FiltersPopup';
import { categories, getProductsByCategory, Product } from '@/data/products';
import { ChevronUp } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { useCartStore } from '@/store/cartStore';
import logo from '@/assets/logo (1).png';

const Index = () => {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const {
    selectedProduct,
    setMenuOpen,
    isMenuOpen,
    isAuthOpen,
    isCheckoutOpen,
    isFiltersOpen,
    filterTags,
    sortOption,
  } = useUIStore();
  const { isOpen: isCartOpen, setIsOpen: setCartOpen } = useCartStore();
  const isOverlayOpen =
    !!selectedProduct || isMenuOpen || isAuthOpen || isCheckoutOpen || isCartOpen || isFiltersOpen;
  const swipeStartXRef = useRef<number | null>(null);
  const swipeStartYRef = useRef<number | null>(null);

  const handleSwipeStart = (e: TouchEvent<HTMLDivElement>) => {
    if (typeof window === 'undefined') return;
    if (window.innerWidth >= 1024) return;
    if (isOverlayOpen) return;
    const touch = e.touches[0];
    if (!touch) return;
    swipeStartXRef.current = touch.clientX;
    swipeStartYRef.current = touch.clientY;
  };

  const handleSwipeEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (swipeStartXRef.current === null || swipeStartYRef.current === null) return;
    const touch = e.changedTouches[0];
    if (!touch) {
      swipeStartXRef.current = null;
      swipeStartYRef.current = null;
      return;
    }
    const startX = swipeStartXRef.current;
    const startY = swipeStartYRef.current;
    const dx = touch.clientX - startX;
    const dy = Math.abs(touch.clientY - startY);
    swipeStartXRef.current = null;
    swipeStartYRef.current = null;
    const width = typeof window !== 'undefined' ? window.innerWidth : 0;
    if (dx > 60 && dx > dy && startX <= 40) {
      setMenuOpen(true);
    } else if (dx < -60 && Math.abs(dx) > dy && width > 0 && startX >= width - 40) {
      setCartOpen(true);
    }
  };

  useEffect(() => {
    if (isOverlayOpen) {
      const scrollY = window.scrollY || window.pageYOffset;
      const prevBodyOverflow = document.body.style.overflow;
      const prevHtmlOverflow = document.documentElement.style.overflow;
      const prevHtmlOverscroll = (document.documentElement.style as any).overscrollBehaviorY || '';
      const prevBodyOverscroll = (document.body.style as any).overscrollBehaviorY || '';
      const prevPosition = document.body.style.position;
      const prevTop = document.body.style.top;
      const prevLeft = document.body.style.left;
      const prevRight = document.body.style.right;
      const prevWidth = document.body.style.width;
      const prevHtmlTouchAction = (document.documentElement.style as any).touchAction || '';
      const prevBodyTouchAction = (document.body.style as any).touchAction || '';
      const prevBodyPaddingRight = document.body.style.paddingRight;
      const prevHtmlPaddingRight = document.documentElement.style.paddingRight;
      const prevHtmlScrollBehavior = (document.documentElement.style as any).scrollBehavior || '';
      const scrollbarWidth = Math.max(0, window.innerWidth - document.documentElement.clientWidth);
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.documentElement.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      (document.documentElement.style as any).overscrollBehaviorY = 'none';
      (document.body.style as any).overscrollBehaviorY = 'none';
      (document.documentElement.style as any).touchAction = 'none';
      (document.body.style as any).touchAction = 'none';
      return () => {
        const lockedY = Math.abs(parseInt(document.body.style.top || '0', 10)) || scrollY;
        (document.documentElement.style as any).scrollBehavior = 'auto';
        document.body.style.position = prevPosition;
        document.body.style.top = prevTop;
        document.body.style.left = prevLeft;
        document.body.style.right = prevRight;
        document.body.style.width = prevWidth;
        document.body.style.paddingRight = prevBodyPaddingRight;
        document.documentElement.style.paddingRight = prevHtmlPaddingRight;
        document.body.style.overflow = prevBodyOverflow;
        document.documentElement.style.overflow = prevHtmlOverflow;
        (document.documentElement.style as any).overscrollBehaviorY = prevHtmlOverscroll;
        (document.body.style as any).overscrollBehaviorY = prevBodyOverscroll;
        (document.documentElement.style as any).touchAction = prevHtmlTouchAction;
        (document.body.style as any).touchAction = prevBodyTouchAction;
        window.scrollTo(0, lockedY);
        (document.documentElement.style as any).scrollBehavior = prevHtmlScrollBehavior;
      };
    }
  }, [isOverlayOpen]);

  useEffect(() => {
    if (!isFiltersOpen) {
      const id = window.setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 0);
      return () => window.clearTimeout(id);
    }
  }, [isFiltersOpen]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const link = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!link) return;
      const isMobile = window.innerWidth < 1024;
      if (!isMobile) return;
      const id = link.getAttribute('href')?.slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      const offset = 100;
      const rectTop = el.getBoundingClientRect().top;
      const to = rectTop + window.pageYOffset - offset;
      const start = window.pageYOffset;
      const diff = to - start;
      const duration = 550;
      const startTime = performance.now();
      const ease = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
      const step = (now: number) => {
        const elapsed = now - startTime;
        const p = Math.min(elapsed / duration, 1);
        const eased = ease(p);
        window.scrollTo(0, Math.round(start + diff * eased));
        if (elapsed < duration) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    document.addEventListener('click', handler, true);
    return () => document.removeEventListener('click', handler, true);
  }, []);

  const matchesFilterTag = (product: Product, tagId: string) => {
    const text = `${product.name} ${product.description} ${(product.ingredients || []).join(' ')}`.toLowerCase();

    if (tagId === 'salmon') {
      return text.includes('лосос');
    }
    if (tagId === 'tuna') {
      return text.includes('тунец') || text.includes('тунца') || text.includes('тунцом') || text.includes('tuna');
    }
    if (tagId === 'eel') {
      return text.includes('угор');
    }
    if (tagId === 'shrimp') {
      return text.includes('кревет');
    }
    if (tagId === 'squid') {
      return text.includes('кальмар') || text.includes('калмар');
    }
    if (tagId === 'chicken') {
      return text.includes('куриц');
    }
    if (tagId === 'spicy') {
      return text.includes('остр') || text.includes('спайси') || text.includes('spicy');
    }

    return false;
  };

  const applyFiltersAndSort = (items: Product[]) => {
    let list = items;

    if (filterTags.length > 0) {
      list = list.filter((product) => filterTags.some((tag) => matchesFilterTag(product, tag)));
    }

    if (sortOption === 'price-asc') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      list = [...list].sort((a, b) => b.price - a.price);
    } else if (sortOption === 'popular') {
      list = [...list].sort((a, b) => {
        const scoreA = (a.isHit ? 2 : 0) + (a.isNew ? 1 : 0);
        const scoreB = (b.isHit ? 2 : 0) + (b.isNew ? 1 : 0);
        return scoreB - scoreA;
      });
    }

    return list;
  };
  const hasGlobalFilters = filterTags.length > 0 || sortOption !== 'popular';
  return (
    <div
      className="min-h-screen bg-background"
      onTouchStart={handleSwipeStart}
      onTouchEnd={handleSwipeEnd}
    >
      <Header />
      <ShortsCarousel />
      <CategoryNav />
      
      {/* Main content with sidebar */}
      <div className="container mx-auto px-4 flex">
        {/* Sidebar menu - desktop only */}
          <CategorySidebar />
        
        {/* Products */}
          <main className="flex-1 pb-20 xl:pl-[20px]">
            {hasGlobalFilters ? (
              <CategorySection
                id="filtered"
                name="Результаты фильтрации"
                products={applyFiltersAndSort(
                  categories.flatMap((category) => getProductsByCategory(category.id))
                )}
              />
            ) : (
              categories.map((category) => (
                <CategorySection
                  key={category.id}
                  id={category.id}
                  name={category.name}
                  products={getProductsByCategory(category.id)}
                />
              ))
            )}
          </main>
      </div>

      {/* Footer */}
      <footer className="bg-[#2B2D33] py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Logo & Description */}
            <div>
              <div className="mb-4">
                <img src={logo} alt="OKIAHABA" className="h-8 w-auto" />
              </div>
              <p className="text-gray-400 text-sm">
                Доставка вкусных роллов, суши и пиццы по Воронежу
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
              <div className="space-y-2">
                <a
                  href="tel:88003337952"
                  className="block text-white text-xl font-bold hover:text-primary transition-colors"
                >
                  8 800 333-79-52
                </a>
                <a
                  href="tel:+79507656592"
                  className="block text-gray-200 text-sm font-medium hover:text-primary transition-colors"
                >
                  +7 (950) 765-65-92
                </a>
                <a
                  href="tel:+74732904341"
                  className="block text-gray-200 text-sm font-medium hover:text-primary transition-colors"
                >
                  +7 (473) 290-43-41
                </a>
              </div>
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
      <FiltersPopup />
      
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
