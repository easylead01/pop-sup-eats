import { Plus, Flame, ChefHat } from 'lucide-react';
import { Product } from '@/data/products';
import { getProductImageForProduct } from '@/lib/images';
import { useUIStore } from '@/store/uiStore';
import { useCartStore } from '@/store/cartStore';
import { useProductImageContext } from '@/components/ProductImageProvider';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { setSelectedProduct } = useUIStore();
  const { addItem } = useCartStore();
  const { customImages } = useProductImageContext();

  const imageUrl = customImages[product.image] || getProductImageForProduct(product);

  const lower = `${product.name} ${product.description} ${product.ingredients.join(' ')}`.toLowerCase();
  const isSpicy = /остр|спайси|чили|паприк/i.test(lower);
  const isBaked = /запеч|печен/i.test(lower);
  const isTempura = /темпур|жарен|горяч/i.test(lower);
  const isContainCategory =
    product.category === 'rolls' ||
    product.category === 'sushi' ||
    product.category === 'sets' ||
    product.category === 'wok' ||
    product.category === 'pizza' ||
    product.category === 'snacks' ||
    product.category === 'salads' ||
    product.category === 'sauces';
  const paddingClass =
    product.category === 'pizza' || product.category === 'snacks' ? 'p-4' : 'p-2';
  const isTyahan =
    product.category === 'wok' &&
    ((product.productUrl && /ris-?tahan/i.test(product.productUrl)) ||
      /т[яа]хан/i.test(product.name) ||
      ['342', '343', '344'].includes(product.id));
  const finalPadding =
    isTyahan ? 'p-4' : paddingClass;
  const scaleClass =
    product.category === 'pizza' || product.category === 'snacks'
      ? 'scale-[0.8]'
      : isTyahan
      ? 'scale-[0.7]'
      : '';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
  };

  return (
    <div
      className="product-card group"
      onClick={() => setSelectedProduct(product)}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-secondary/30">
        <img
          src={imageUrl}
          alt={product.name}
          className={`w-full h-full transition-transform duration-300 group-hover:scale-105 ${
            isContainCategory ? `object-contain ${finalPadding}` : 'object-cover'
          } ${scaleClass}`}
        />
        
        <button
          onClick={handleAddToCart}
          className="hidden lg:flex absolute bottom-3 right-3 w-10 h-10 bg-black text-white rounded-full items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg border border-transparent"
        >
          <Plus className="w-5 h-5" />
        </button>
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="px-2.5 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
              NEW
            </span>
          )}
          {product.isHit && (
            <span className="px-2.5 py-1 bg-foreground text-background text-xs font-semibold rounded-full">
              HIT
            </span>
          )}
          <div className="flex flex-wrap gap-2">
            {isSpicy && (
              <span className="px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                <Flame className="w-4 h-4" /> Острый
              </span>
            )}
            {isBaked && (
              <span className="px-2 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                <ChefHat className="w-4 h-4" /> запеченый
              </span>
            )}
            {isTempura && (
              <span className="px-2 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 11h3" />
                  <path d="M18 11h3" />
                  <path d="M6 11c2 5 10 5 12 0" />
                  <path d="M5 15h14" />
                </svg>
                Темпура
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-col">
        <div className="h-[64px] md:h-[56px]">
          <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </div>
        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="text-sm text-muted-foreground">
            {product.pieces && `${product.pieces} / `}{product.weight}
          </span>
          
          <button className="price-badge group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all">
            {product.price} ₽
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
