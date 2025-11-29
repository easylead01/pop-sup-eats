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
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-2xl font-extrabold">
              <span className="text-primary">SUSHI</span>
              <span className="text-foreground">BOX</span>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">О компании</a>
              <a href="#" className="hover:text-foreground transition-colors">Доставка</a>
              <a href="#" className="hover:text-foreground transition-colors">Контакты</a>
              <a href="#" className="hover:text-foreground transition-colors">Вакансии</a>
            </div>
            
            <p className="text-sm text-muted-foreground">
              © 2024 SUSHIBOX. Все права защищены.
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
