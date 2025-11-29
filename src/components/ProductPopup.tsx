import { useState } from 'react';
import { X, Heart, Minus, Plus, AlertCircle } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { useCartStore } from '@/store/cartStore';
import { getProductImage } from '@/lib/images';
import { toast } from '@/hooks/use-toast';

const ProductPopup = () => {
  const { selectedProduct, setSelectedProduct } = useUIStore();
  const { addItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);

  if (!selectedProduct) return null;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(selectedProduct);
    }
    toast({
      title: 'Добавлено в корзину',
      description: `${selectedProduct.name} × ${quantity}`,
    });
    setSelectedProduct(null);
    setQuantity(1);
  };

  const totalPrice = selectedProduct.price * quantity;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/50 animate-fade-in"
        onClick={() => {
          setSelectedProduct(null);
          setQuantity(1);
        }}
      />

      {/* Modal */}
      <div className="relative bg-card rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-scale-in shadow-popup">
        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="relative md:w-1/2 aspect-square md:aspect-auto bg-secondary/20">
            <img
              src={getProductImage(selectedProduct.image)}
              alt={selectedProduct.name}
              className="w-full h-full object-cover"
            />
            
            {/* Close & Favorite */}
            <button
              onClick={() => {
                setSelectedProduct(null);
                setQuantity(1);
              }}
              className="absolute top-4 left-4 w-10 h-10 bg-foreground text-background rounded-full flex items-center justify-center hover:bg-foreground/90 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <button className="absolute top-4 right-4 w-10 h-10 bg-card rounded-full flex items-center justify-center hover:bg-muted transition-colors border border-border">
              <Heart className="w-5 h-5" />
            </button>

            {/* Badges */}
            <div className="absolute bottom-4 left-4 flex gap-2">
              {selectedProduct.isNew && (
                <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                  NEW
                </span>
              )}
              {selectedProduct.isHit && (
                <span className="px-3 py-1 bg-foreground text-background text-xs font-semibold rounded-full">
                  HIT
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="md:w-1/2 p-6 md:p-8 flex flex-col">
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                {selectedProduct.name}
              </h2>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                {selectedProduct.pieces && <span>{selectedProduct.pieces}</span>}
                <span>{selectedProduct.weight}</span>
                {selectedProduct.calories && (
                  <span className="flex items-center gap-1">
                    {selectedProduct.calories} ккал
                    <AlertCircle className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>

              <p className="text-muted-foreground mb-6">
                {selectedProduct.description}
              </p>

              {/* Ingredients */}
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Состав</h3>
                <p className="text-muted-foreground text-sm">
                  {selectedProduct.ingredients.join(', ')}
                </p>
              </div>

              {/* Allergens */}
              {selectedProduct.allergens.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    Аллергены
                    <AlertCircle className="w-4 h-4 text-primary" />
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {selectedProduct.allergens.join(', ')}
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center gap-4 pt-4 border-t border-border">
              {/* Quantity */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="qty-button"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-semibold text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="qty-button"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-foreground text-background py-4 rounded-full font-semibold text-lg hover:bg-foreground/90 transition-colors"
              >
                {totalPrice} ₽
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPopup;
