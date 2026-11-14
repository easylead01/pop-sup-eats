import { ChevronRight } from 'lucide-react';
import type { SetComponent } from '@/data/products';
import { getProduct } from '@/data/products';
import { getProductImage } from '@/lib/images';
import { useUIStore } from '@/store/uiStore';

/** Роллы, из которых состоит сет: картинка, название и количество штук */
const SetComposition = ({ items, compact = false }: { items: SetComponent[]; compact?: boolean }) => {
  const { setSelectedProduct } = useUIStore();

  return (
    <div className="mb-4">
      <h3 className={`font-semibold mb-2 ${compact ? 'text-sm' : ''}`}>
        В сете {items.length} {items.length === 1 ? 'позиция' : items.length < 5 ? 'позиции' : 'позиций'}
      </h3>
      <ul className={`grid gap-2 ${compact ? 'grid-cols-1' : 'grid-cols-1 xl:grid-cols-2'}`}>
        {items.map((item, index) => {
          const linked = item.productId ? getProduct(item.productId) : undefined;
          const isFullBleed = item.image?.startsWith('/images/mybox/');
          const content = (
            <>
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-secondary/40 flex-shrink-0 flex items-center justify-center">
                {item.image ? (
                  <img
                    src={getProductImage(item.image)}
                    alt={item.name}
                    loading="lazy"
                    className={`w-full h-full ${isFullBleed ? 'object-cover' : 'object-contain p-1'}`}
                  />
                ) : (
                  <span className="text-2xl" aria-hidden>🍣</span>
                )}
              </div>
              <div className="min-w-0 flex-1 text-left">
                <div className="text-sm font-medium leading-snug line-clamp-2">{item.name}</div>
                {item.pieces && <div className="text-xs text-muted-foreground mt-0.5">{item.pieces}</div>}
              </div>
              {linked && <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
            </>
          );
          return (
            <li key={`${item.name}-${index}`}>
              {linked ? (
                <button
                  type="button"
                  onClick={() => setSelectedProduct(linked)}
                  className="w-full flex items-center gap-3 rounded-2xl p-1.5 pr-3 hover:bg-secondary/40 transition-colors"
                  title={`Открыть «${linked.name}»`}
                >
                  {content}
                </button>
              ) : (
                <div className="flex items-center gap-3 rounded-2xl p-1.5 pr-3">{content}</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SetComposition;
