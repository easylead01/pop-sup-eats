import { Product } from '@/data/products';
import { getProductImage } from '@/lib/images';
import { useUIStore } from '@/store/uiStore';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { setSelectedProduct } = useUIStore();

  return (
    <div
      className="product-card group"
      onClick={() => setSelectedProduct(product)}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-secondary/30">
        <img
          src={getProductImage(product.image)}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        
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
          
          <button className="price-badge">
            {product.price} ₽
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
