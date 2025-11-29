import { Plus } from 'lucide-react';
import { Product } from '@/data/products';
import { getProductImage } from '@/lib/images';
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

  const imageUrl = customImages[product.image] || getProductImage(product.image);

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
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Quick Add Button */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-3 right-3 w-10 h-10 bg-background text-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg border border-border"
        >
          <Plus className="w-5 h-5" />
        </button>
        
        {/* Badges */}
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
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between mt-3">
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
