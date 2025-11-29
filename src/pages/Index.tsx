import Header from '@/components/Header';
import ShortsCarousel from '@/components/ShortsCarousel';
import CategoryNav from '@/components/CategoryNav';
import CategorySection from '@/components/CategorySection';
import MenuPopup from '@/components/MenuPopup';
import ProductPopup from '@/components/ProductPopup';
import CartPopup from '@/components/CartPopup';
import AuthPopup from '@/components/AuthPopup';
import CheckoutSheet from '@/components/CheckoutSheet';
import { categories, getProductsByCategory } from '@/data/products';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ShortsCarousel />
      <CategoryNav />
      
      <main className="pb-20">
        {categories.map((category) => (
          <CategorySection
            key={category.id}
            id={category.id}
            name={category.name}
            products={getProductsByCategory(category.id)}
          />
        ))}
      </main>

      {/* Footer */}
      <footer className="bg-[#1E2433] py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Logo & Description */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
                  S
                </div>
                <span className="text-xl font-extrabold text-white">SUSHIBOX</span>
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
              © 2025 SUSHIBOX. Все права защищены.
            </p>
          </div>
        </div>
      </footer>

      {/* All Popups & Overlays */}
      <MenuPopup />
      <ProductPopup />
      <CartPopup />
      <AuthPopup />
      <CheckoutSheet />
    </div>
  );
};

export default Index;
