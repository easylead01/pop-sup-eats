export interface Promo {
  id: string;
  title: string;
  gradient: string;
  image?: string;
  video?: string;
  /** Заголовок уже есть на самой картинке — не затемнять низ и не писать поверх */
  hideTitle?: boolean;
}

// Сторис 1440×1920 (3:4), сделаны по макетам Claude Design: текст акции уже на картинке.
// Старые сторис-заглушки promo-1…7.png лежат в src/assets, если понадобится вернуть.
import promoDeshevo from '@/assets/promo-deshevo.webp';
import promoSetBig from '@/assets/promo-set-big.webp';
import promoSet15 from '@/assets/promo-set-15.webp';
import promoSetMini from '@/assets/promo-set-mini.webp';
import promoFri from '@/assets/promo-fri.webp';
import promoCezarNavy from '@/assets/promo-cezar-navy.webp';
import promoPizza from '@/assets/promo-pizza.webp';
import promoRollOvara from '@/assets/promo-roll-ovara.webp';
import promoBday15 from '@/assets/promo-bday15.webp';
import promoWedding15 from '@/assets/promo-wedding15.webp';

export const promos: Promo[] = [
  { id: 'deshevo', title: 'Сет «Дёшево и Сердито» — 1 800 ₽', gradient: 'from-zinc-800 to-zinc-900', image: promoDeshevo, hideTitle: true },
  { id: 'set-big', title: 'Собери чеки на 17 000 ₽ и получи сет Биг в подарок', gradient: 'from-indigo-900 to-slate-900', image: promoSetBig, hideTitle: true },
  { id: 'set-15', title: 'Собери чеки на 12 000 ₽ и получи сет 15 в подарок', gradient: 'from-emerald-50 to-emerald-100', image: promoSet15, hideTitle: true },
  { id: 'set-mini', title: 'Собери чеки на 9 000 ₽ и получи сет мини в подарок', gradient: 'from-rose-950 to-stone-900', image: promoSetMini, hideTitle: true },
  { id: 'fri', title: 'Собери чеки на 3 000 ₽ и получи картофель фри в подарок', gradient: 'from-teal-950 to-slate-900', image: promoFri, hideTitle: true },
  { id: 'cezar-navy', title: 'Собери чеки на 4 000 ₽ и получи салат цезарь в подарок', gradient: 'from-slate-900 to-blue-950', image: promoCezarNavy, hideTitle: true },
  { id: 'pizza', title: 'Собери чеки на 10 000 ₽ и получи пиццу мама-миа в подарок', gradient: 'from-green-950 to-stone-900', image: promoPizza, hideTitle: true },
  { id: 'roll-ovara', title: 'Закажи роллы на 2 000 ₽ и получи ролл овара в подарок', gradient: 'from-slate-100 to-slate-200', image: promoRollOvara, hideTitle: true },
  { id: 'bday15', title: 'Скидка 15% в день рождения', gradient: 'from-violet-950 to-indigo-950', image: promoBday15, hideTitle: true },
  { id: 'wedding15', title: 'Скидка 15% на годовщину свадьбы', gradient: 'from-amber-50 to-orange-100', image: promoWedding15, hideTitle: true },
];
