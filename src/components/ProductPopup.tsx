import { useState, useEffect } from 'react';
import { X, Heart, Minus, Plus, AlertCircle, Ruler } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { useCartStore } from '@/store/cartStore';
import { getProductImageForProduct } from '@/lib/images';
import { useSwipeClose } from '@/hooks/useSwipeClose';
import { toast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { useProductImageContext } from '@/components/ProductImageProvider';
import SetComposition from '@/components/SetComposition';
import MyboxProductPopup from '@/components/MyboxProductPopup';

const ProductPopup = () => {
  const { selectedProduct, setSelectedProduct } = useUIStore();
  const { addItem } = useCartStore();
  const { customImages } = useProductImageContext();
  const [quantity, setQuantity] = useState(1);
  const [isClosing, setIsClosing] = useState(false);
  const isMobile = useIsMobile();
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 1024;
  });
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 1023px)');
    const onChange = () => setIsSmallScreen(window.innerWidth < 1024);
    mql.addEventListener('change', onChange);
    setIsSmallScreen(window.innerWidth < 1024);
    return () => mql.removeEventListener('change', onChange);
  }, []);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);
  const [isBackdropHover, setIsBackdropHover] = useState(false);
  
  const imageUrl = selectedProduct 
    ? (customImages[selectedProduct.image] || getProductImageForProduct(selectedProduct))
    : '';

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedProduct(null);
      setQuantity(1);
      setIsClosing(false);
    }, 300);
  };

  const swipeHandlers = useSwipeClose({
    direction: (isMobile || isSmallScreen) ? 'down' : 'right',
    threshold: 80,
    onClose: handleClose,
  });

  // Esc закрывает окно товара
  useEffect(() => {
    if (!selectedProduct) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProduct?.id]);

  // Reset quantity when product changes (и прокрутку — при переходе из сета к роллу)
  useEffect(() => {
    setQuantity(1);
    document.querySelectorAll('.product-popup-scroll').forEach((el) => el.scrollTo({ top: 0 }));
  }, [selectedProduct?.id]);

  

  if (!selectedProduct) return null;
  // Демо «Стиль MyBox»: своё окно товара в их оформлении
  if (selectedProduct.id.startsWith('mb-')) return <MyboxProductPopup />;
  const desc = (selectedProduct.description || '').trim();
  const normalizeText = (t: string) =>
    t
      .replace(/^Ингредиенты:\s*/i, '')
      .replace(/\s*,\s*/g, ',')
      .replace(/\s+/g, ' ')
      .replace(/\.$/, '')
      .trim();
  const normalizedDesc = normalizeText(desc);
  const compositionText =
    selectedProduct.ingredients.length > 0
      ? selectedProduct.ingredients.map((s) => s.trim()).filter(Boolean).join(', ')
      : normalizedDesc;
  const descTokens = normalizedDesc.split(',').map((s) => s.trim().toLowerCase()).filter(Boolean);
  const ingTokens = (selectedProduct.ingredients || []).map((s) => s.trim().toLowerCase()).filter(Boolean);
  const isSameComposition = descTokens.length > 0 && descTokens.join(',') === ingTokens.join(',');
  const shouldShowDescription = normalizedDesc.length > 0 && !isSameComposition;
  const singleEconomy = typeof selectedProduct.economy === 'number'
    ? selectedProduct.economy
    : (typeof selectedProduct.oldPrice === 'number' && selectedProduct.oldPrice > selectedProduct.price
      ? selectedProduct.oldPrice - selectedProduct.price
      : undefined);
  const totalOldPrice = typeof selectedProduct.oldPrice === 'number' ? selectedProduct.oldPrice * quantity : undefined;
  const totalEconomy = typeof singleEconomy === 'number' ? singleEconomy * quantity : undefined;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(selectedProduct);
    }
    toast({
      title: 'Добавлено в корзину',
      description: `${selectedProduct.name} × ${quantity}`,
    });
    handleClose();
  };

  const totalPrice = selectedProduct.price * quantity;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-foreground/50 transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'animate-fade-in'}`}
        onClick={handleClose}
        onMouseEnter={() => setIsBackdropHover(true)}
        onMouseLeave={() => { setIsBackdropHover(false); setCursorPos(null); }}
        onMouseMove={(e) => setCursorPos({ x: e.clientX, y: e.clientY })}
      >
        <button
          onClick={(e) => { e.stopPropagation(); handleClose(); }}
          className={`hidden md:flex absolute -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-foreground text-background rounded-full items-center justify-center shadow-md transition-opacity duration-100 ${isBackdropHover ? 'opacity-100' : 'opacity-0'} hover:scale-105 active:scale-95 z-[110]`}
          style={cursorPos ? { left: cursorPos.x, top: cursorPos.y } : undefined}
          title="Закрыть"
          aria-label="Закрыть"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Desktop: окно по центру со скруглениями (как в версии MyBox), фото слева во всю высоту */}
      <div className="hidden lg:flex absolute inset-0 items-center justify-center p-8 pointer-events-none">
        <div
          className={`pointer-events-auto flex bg-card rounded-[28px] overflow-hidden shadow-2xl h-[min(760px,calc(100vh-64px),52vw)] transition-all duration-300 ease-out
            ${isClosing ? 'opacity-0 scale-95' : 'animate-fade-in'}`}
        >
          {/* Фото на отдельной мягкой панели: тёплый светлый фон, скругления, тонкий контур */}
          <div className="h-full aspect-square flex-shrink-0 p-3">
          <div className="relative h-full w-full rounded-[22px] overflow-hidden ring-1 ring-black/[0.05] bg-[radial-gradient(120%_90%_at_50%_35%,#fbfaf8_0%,#f3f1ed_55%,#ebe8e3_100%)]">
            <img
              src={imageUrl}
              alt={selectedProduct.name}
              className="w-full h-full object-contain p-8 mix-blend-multiply"
            />
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-4 left-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-foreground text-background flex items-center justify-center hover:scale-105 active:scale-95 transition"
              aria-label="Закрыть"
            >
              <X className="w-5 h-5" />
            </button>
            <button
              type="button"
              className="absolute top-4 right-4 w-11 h-11 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-all shadow-[0_2px_10px_rgba(0,0,0,0.08)] hover:scale-105 active:scale-95"
              aria-label="В избранное"
            >
              <Heart className="w-5 h-5" />
            </button>
            <div className="absolute bottom-4 left-4 flex gap-2">
              {selectedProduct.isNew && (
                <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">NEW</span>
              )}
              {selectedProduct.isHit && (
                <span className="px-3 py-1 bg-foreground text-background text-xs font-semibold rounded-full">HIT</span>
              )}
            </div>
          </div>
          </div>

          <div className="w-[min(480px,calc(100vw-64px-min(760px,calc(100vh-64px),52vw)))] flex flex-col pl-8 pr-8 pt-10 pb-7">
            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain pr-2 product-popup-scroll">
              <h2 className="text-[28px] leading-[34px] font-bold mb-3">{selectedProduct.name}</h2>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mb-5">
                {selectedProduct.size && (
                  <span className="flex items-center gap-1">
                    <Ruler className="w-3.5 h-3.5" />
                    {selectedProduct.size}
                  </span>
                )}
                {selectedProduct.pieces && <span>{selectedProduct.pieces}</span>}
                <span>{selectedProduct.weight}</span>
                {selectedProduct.calories && (
                  <span className="flex items-center gap-1">
                    {selectedProduct.calories} ккал
                    <AlertCircle className="w-3.5 h-3.5" />
                  </span>
                )}
                {typeof singleEconomy === 'number' && (
                  <span className="flex items-center gap-1 text-green-600">Экономия: {singleEconomy} ₽</span>
                )}
              </div>

              {shouldShowDescription && (
                <p className="text-muted-foreground mb-5 text-[15px] leading-relaxed">{selectedProduct.description}</p>
              )}

              {selectedProduct.setItems?.length ? (
                <SetComposition items={selectedProduct.setItems} compact />
              ) : (
                <div className="mb-5">
                  <h3 className="font-semibold text-lg mb-1.5">Состав</h3>
                  <p className="text-muted-foreground text-[15px] leading-relaxed">{compositionText}</p>
                </div>
              )}

            </div>

            <div className="flex items-center gap-3 pt-5">
              <div className="flex items-center h-14 rounded-full border border-border px-1 flex-shrink-0">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-muted active:scale-95 transition"
                  aria-label="Меньше"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-7 text-center font-semibold text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-muted active:scale-95 transition"
                  aria-label="Больше"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 h-14 bg-foreground text-background rounded-full font-semibold text-lg hover:bg-foreground/90 transition-all active:scale-[0.98]"
              >
                {typeof totalOldPrice === 'number' && totalOldPrice > totalPrice ? (
                  <span className="mr-2 line-through opacity-70">{totalOldPrice} ₽</span>
                ) : null}
                В корзину за {totalPrice} ₽
                {typeof totalEconomy === 'number' && totalEconomy > 0 ? (
                  <span className="ml-2 text-green-200">−{totalEconomy} ₽</span>
                ) : null}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet: Bottom sheet */}
      <div 
        className={`
          lg:hidden
          absolute bottom-0 left-0 right-0 bg-card rounded-t-3xl shadow-popup
          max-h-[95vh] overflow-hidden transition-transform duration-300 ease-out
          ${isClosing ? 'translate-y-full' : 'animate-slide-in-up'}
        `}
        {...swipeHandlers}
      >
        {/* Drag Handle */}
        <div className="flex justify-center pt-3 pb-1 absolute top-0 left-0 right-0 z-20">
          <div className="w-10 h-1 bg-muted-foreground/30 rounded-full" />
        </div>

        <div className="flex flex-col max-h-[95vh] relative product-popup-scroll">
          {/* Image */}
          <div className="relative bg-secondary/20 flex-shrink-0 mt-4">
            <img
              src={imageUrl}
              alt={selectedProduct.name}
              className="w-full h-auto object-contain p-2"
            />
            
          {/* Favorite */}
            <button className="absolute top-4 right-4 w-10 h-10 bg-card rounded-full flex items-center justify-center border border-border active:scale-95">
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

          <div className="pt-2 px-6 pb-2 flex flex-col">
            <h2 className="text-xl font-bold mb-2">
              {selectedProduct.name}
            </h2>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              {selectedProduct.size && (
                <span className="flex items-center gap-1">
                  <Ruler className="w-3.5 h-3.5" />
                  {selectedProduct.size}
                </span>
              )}
              {selectedProduct.pieces && <span>{selectedProduct.pieces}</span>}
              <span>{selectedProduct.weight}</span>
              {selectedProduct.calories && (
                <span className="flex items-center gap-1">
                  {selectedProduct.calories} ккал
                  <AlertCircle className="w-3.5 h-3.5" />
                </span>
              )}
              {typeof singleEconomy === 'number' && (
                <span className="flex items-center gap-1 text-green-600">
                  Экономия: {singleEconomy} ₽
                </span>
              )}
            </div>

            {shouldShowDescription && (
              <p className="text-muted-foreground mb-4 text-sm">
                {selectedProduct.description}
              </p>
            )}

            {/* Ingredients / set rolls */}
            {selectedProduct.setItems?.length ? (
              <SetComposition items={selectedProduct.setItems} compact />
            ) : (
              <div className="mb-3">
                <h3 className="font-semibold mb-1 text-sm">Состав</h3>
                <p className="text-muted-foreground text-xs">
                  {compositionText}
                </p>
              </div>
            )}


          </div>
          <div className="sticky-btn-wrapper">
            <div className="flex items-center gap-4 justify-center">
              <div className="flex items-center gap-2 border border-border bg-background rounded-full px-3 py-2 shadow-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="qty-button w-8 h-8 active:scale-95 transition-transform"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-semibold text-base">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="qty-button w-8 h-8 active:scale-95 transition-transform"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-none w-[124px] md:w-[124px] h-12 px-4 bg-foreground text-background rounded-full font-semibold text-base active:scale-[0.98] transition-transform shadow-md"
              >
                {typeof totalOldPrice === 'number' && totalOldPrice > totalPrice ? (
                  <span className="mr-2 line-through opacity-70">{totalOldPrice} ₽</span>
                ) : null}
                {totalPrice} ₽
                {typeof totalEconomy === 'number' && totalEconomy > 0 ? (
                  <span className="ml-2 text-green-200">−{totalEconomy} ₽</span>
                ) : null}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPopup;
