import { X } from 'lucide-react';
import { categories } from '@/data/products';
import { useUIStore } from '@/store/uiStore';
import { getProductImage } from '@/lib/images';

const categoryImages: Record<string, string> = {
  rolls: 'roll-philadelphia',
  sets: 'sushi-set',
  sushi: 'sushi-salmon',
  pizza: 'pizza-pepperoni',
  hot: 'gyoza',
  salads: 'poke-bowl',
  wok: 'wok-noodles',
  drinks: 'soup-miso',
  snacks: 'gyoza',
  soups: 'soup-miso',
  desserts: 'mochi',
  sauces: 'soup-miso',
};

const MenuPopup = () => {
  const { isMenuOpen, setMenuOpen } = useUIStore();

  if (!isMenuOpen) return null;

  const scrollToCategory = (categoryId: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(categoryId);
      if (element) {
        const offset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/40 animate-fade-in"
        onClick={() => setMenuOpen(false)}
      />

      {/* Panel */}
      <div className="relative w-full max-w-md bg-card h-full overflow-y-auto animate-slide-in-left">
        {/* Header */}
        <div className="sticky top-0 bg-card z-10 p-4 border-b border-border flex items-center justify-between">
          <h2 className="text-xl font-bold">Меню</h2>
          <button
            onClick={() => setMenuOpen(false)}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="p-4 border-b border-border">
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium">
              Classic
            </button>
            <button className="px-4 py-2 bg-transparent border border-primary text-primary rounded-full text-sm font-medium hover:bg-primary/10 transition-colors">
              Market
            </button>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="p-4">
          <div className="grid grid-cols-2 gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => scrollToCategory(category.id)}
                className="category-card"
              >
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-secondary/30">
                  <img
                    src={getProductImage(categoryImages[category.id] || 'roll-philadelphia')}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm font-medium text-center">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPopup;
