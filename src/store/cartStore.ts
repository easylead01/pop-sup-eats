import { create } from 'zustand';
import { Product } from '@/data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

/** Условия доставки — одни и те же в корзине и в оформлении */
export const FREE_DELIVERY_FROM = 1500;
export const DELIVERY_FEE = 199;
export const MIN_ORDER = 500;

export interface Promo {
  code: string;
  title: string;
  kind: 'percent' | 'fixed';
  value: number;
  /** Минимальная сумма товаров, с которой работает промокод */
  minTotal?: number;
}

/** Демо-промокоды (в прототипе проверяются прямо на сайте) */
export const PROMO_CODES: Promo[] = [
  { code: 'ОКИНАВА10', title: 'Скидка 10%', kind: 'percent', value: 10 },
  { code: 'ПЕРВЫЙ', title: '−300 ₽ на первый заказ', kind: 'fixed', value: 300, minTotal: 1500 },
];

const PROMO_ALIASES: Record<string, string> = {
  OKINAWA10: 'ОКИНАВА10',
  OKIANAVA10: 'ОКИНАВА10',
};

const normalizeCode = (raw: string) => {
  const code = raw.trim().toUpperCase().replace(/\s+/g, '');
  return PROMO_ALIASES[code] ?? code;
};

export interface CartSummary {
  /** Сумма товаров без скидки */
  subtotal: number;
  /** Количество штук */
  count: number;
  discount: number;
  delivery: number;
  total: number;
  /** Сколько не хватает до бесплатной доставки (0 — уже бесплатно) */
  toFreeDelivery: number;
  /** Промокод применён, но сумма ещё не дотягивает до его минимума */
  promoBelowMin: boolean;
}

/** Разбивка суммы: товары, скидка, доставка, итого */
export const computeSummary = (items: CartItem[], promo: Promo | null): CartSummary => {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const promoBelowMin = !!promo && !!promo.minTotal && subtotal < promo.minTotal;
  let discount = 0;
  if (promo && !promoBelowMin && subtotal > 0) {
    discount =
      promo.kind === 'percent'
        ? Math.round((subtotal * promo.value) / 100)
        : Math.min(promo.value, subtotal);
  }
  const delivery = subtotal === 0 || subtotal >= FREE_DELIVERY_FROM ? 0 : DELIVERY_FEE;
  return {
    subtotal,
    count,
    discount,
    delivery,
    total: subtotal - discount + delivery,
    toFreeDelivery: subtotal > 0 ? Math.max(0, FREE_DELIVERY_FROM - subtotal) : 0,
    promoBelowMin,
  };
};

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  promo: Promo | null;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setIsOpen: (isOpen: boolean) => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  applyPromo: (code: string) => { ok: true; promo: Promo } | { ok: false; error: string };
  removePromo: () => void;
  getSummary: () => CartSummary;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,
  promo: null,

  addItem: (product) => {
    set((state) => {
      const existingItem = state.items.find(item => item.product.id === product.id);
      if (existingItem) {
        return {
          items: state.items.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { items: [...state.items, { product, quantity: 1 }] };
    });
  },

  removeItem: (productId) => {
    set((state) => ({
      items: state.items.filter(item => item.product.id !== productId),
    }));
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }
    set((state) => ({
      items: state.items.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      ),
    }));
  },

  clearCart: () => set({ items: [], promo: null }),

  setIsOpen: (isOpen) => set({ isOpen }),

  getTotalPrice: () => {
    return get().items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  },

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },

  applyPromo: (raw) => {
    const code = normalizeCode(raw);
    if (!code) return { ok: false, error: 'Введите промокод' };
    const promo = PROMO_CODES.find((p) => p.code === code);
    if (!promo) return { ok: false, error: 'Такого промокода нет' };
    set({ promo });
    return { ok: true, promo };
  },

  removePromo: () => set({ promo: null }),

  getSummary: () => computeSummary(get().items, get().promo),
}));

/** 2105 → «2 105 ₽» */
export const formatRub = (value: number) => `${value.toLocaleString('ru-RU')} ₽`;
