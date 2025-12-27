import promo1 from '@/assets/promo-1.png';
import promo2 from '@/assets/promo-2.png';
import promo3 from '@/assets/promo-3.png';
import promo4 from '@/assets/promo-4.png';
import promo5 from '@/assets/promo-5.png';
import promo6 from '@/assets/promo-6.png';
import promo7 from '@/assets/promo-7.png';

export interface Promo {
  id: string;
  title: string;
  gradient: string;
  image?: string;
  video?: string;
}

export const promos: Promo[] = [
  {
    id: '1',
    title: 'Скидка 20% на первый заказ',
    gradient: 'from-orange-500 to-red-500',
    image: promo1,
  },
  {
    id: '2',
    title: 'Бесплатная доставка от 1500₽',
    gradient: 'from-blue-500 to-purple-500',
    image: promo2,
  },
  {
    id: '3',
    title: 'Двойные роллы по вторникам',
    gradient: 'from-pink-500 to-orange-400',
    image: promo3,
  },
  {
    id: '4',
    title: 'Сет дня -30%',
    gradient: 'from-emerald-500 to-teal-500',
    image: promo4,
  },
  {
    id: '5',
    title: 'Подарок к заказу',
    gradient: 'from-violet-500 to-pink-500',
    image: promo5,
  },
  {
    id: '6',
    title: 'Попробуй новинки',
    gradient: 'from-amber-500 to-orange-600',
    image: promo6,
  },
  {
    id: '7',
    title: 'Happy Hour 18:00–21:00',
    gradient: 'from-teal-500 to-emerald-500',
    image: promo7,
  },
];
