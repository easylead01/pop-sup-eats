import setsCatalog from '@/data/sets.catalog.json';
import sushiCatalog from '@/data/sushi.catalog.json';
import pizzaCatalog from '@/data/pizza.catalog.json';
import snacksCatalog from '@/data/snacks.catalog.json';
import myboxCatalog from '@/data/mybox.catalog.json';
type SetItem = {
  setItems?: SetComponent[];
  id: string | number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  productUrl: string;
  weight?: string;
  calories?: number;
  pieces?: string;
  ingredients?: string[];
  oldPrice?: number;
  economy?: number;
};
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  weight: string;
  pieces?: string;
  size?: string;
  calories?: number;
  category: string;
  /** Явная подкатегория роллов; если не задана — определяется по словам в названии/составе */
  subcategory?: 'classic' | 'baked' | 'tempura';
  image: string;
  productUrl?: string;
  ingredients: string[];
  allergens: string[];
  isNew?: boolean;
  isHit?: boolean;
  oldPrice?: number;
  economy?: number;
  /** Для сетов: из каких роллов состоит */
  setItems?: SetComponent[];
}

export interface SetComponent {
  name: string;
  pieces?: string;
  image?: string;
  /** id товара в меню, если такой ролл можно открыть отдельно */
  productId?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image: string;
}

export const categories: Category[] = [
  { id: 'rolls', name: 'Роллы', icon: '🍣', image: 'cat-rolls' },
  { id: 'rolls-baked', name: 'Роллы запеченные', icon: '🔥', image: 'cat-rolls-baked' },
  { id: 'rolls-tempura', name: 'Роллы темпура', icon: '🍤', image: 'cat-rolls-tempura' },
  { id: 'sets', name: 'Сеты', icon: '🍱', image: 'cat-sets' },
  { id: 'sushi', name: 'Суши', icon: '🥢', image: 'cat-sushi' },
  { id: 'pizza', name: 'Пицца', icon: '🍕', image: 'cat-pizza' },
  { id: 'salads', name: 'Салаты', icon: '🥗', image: 'cat-salads' },
  { id: 'wok', name: 'Лапша / WOK', icon: '🍜', image: 'cat-wok' },
  { id: 'snacks', name: 'Закуски', icon: '🥟', image: 'cat-snacks' },
  { id: 'sauces', name: 'Соусы', icon: '🫙', image: 'cat-sauces' },
];

export const products: Product[] = [
  {
    "id": "y102981026",
    "name": "Ролл Марс",
    "description": "Тунец, Снежный краб, Креветка, Масаго",
    "price": 499,
    "weight": "260 гр",
    "pieces": "6 шт",
    "category": "rolls",
    "subcategory": "classic",
    "image": "/images/rolls/yaposhka-102981026.webp",
    "ingredients": [
      "Тунец",
      "Снежный краб",
      "Креветка",
      "Масаго"
    ],
    "allergens": []
  },
  {
    "id": "y102981027",
    "name": "Ролл Ши",
    "description": "Лосось, Креветка тигровая, Сливочный сыр, Масаго, Авокадо",
    "price": 699,
    "weight": "260 гр",
    "pieces": "6 шт",
    "category": "rolls",
    "subcategory": "classic",
    "image": "/images/rolls/yaposhka-102981027.webp",
    "ingredients": [
      "Лосось",
      "Креветка тигровая",
      "Сливочный сыр",
      "Масаго",
      "Авокадо"
    ],
    "allergens": []
  },
  {
    "id": "y102981028",
    "name": "Ролл Филадельфия люкс",
    "description": "Лосось, Сливочный сыр, Масаго, Авокадо",
    "price": 799,
    "weight": "260 гр",
    "pieces": "6 шт",
    "category": "rolls",
    "subcategory": "classic",
    "image": "/images/rolls/yaposhka-102981028.webp",
    "ingredients": [
      "Лосось",
      "Сливочный сыр",
      "Масаго",
      "Авокадо"
    ],
    "allergens": []
  },
  {
    "id": "y102981029",
    "name": "Ролл Бамбу",
    "description": "Угорь, Тунец, Сливочный сыр, Плавленый сыр, Пармезан, Чеддер, Авокадо, Унаги",
    "price": 499,
    "weight": "260 гр",
    "pieces": "6 шт",
    "category": "rolls",
    "subcategory": "classic",
    "image": "/images/rolls/yaposhka-102981029.webp",
    "ingredients": [
      "Угорь",
      "Тунец",
      "Сливочный сыр",
      "Плавленый сыр",
      "Пармезан",
      "Чеддер",
      "Авокадо",
      "Унаги"
    ],
    "allergens": []
  },
  {
    "id": "y102981030",
    "name": "Ролл Абури",
    "description": "Лосось, Снежный краб, Масаго, Спайси соус",
    "price": 599,
    "weight": "260 гр",
    "pieces": "6 шт",
    "category": "rolls",
    "subcategory": "classic",
    "image": "/images/rolls/yaposhka-102981030.webp",
    "ingredients": [
      "Лосось",
      "Снежный краб",
      "Масаго",
      "Спайси соус"
    ],
    "allergens": []
  },
  {
    "id": "y102981031",
    "name": "Ролл С курицей",
    "description": "Копченая куриная грудка, Плавленый сыр, Айсберг, Кунжут",
    "price": 349,
    "weight": "250 гр",
    "pieces": "6 шт",
    "category": "rolls",
    "subcategory": "classic",
    "image": "/images/rolls/yaposhka-102981031.webp",
    "ingredients": [
      "Копченая куриная грудка",
      "Плавленый сыр",
      "Айсберг",
      "Кунжут"
    ],
    "allergens": []
  },
  {
    "id": "y102981032",
    "name": "Ролл Сырный",
    "description": "Креветка тигровая, Сливочный сыр, Плавленый сыр, Пармезан, Моцарелла, Авокадо, Чеддер, Унаги",
    "price": 449,
    "weight": "260 гр",
    "pieces": "6 шт",
    "category": "rolls",
    "subcategory": "classic",
    "image": "/images/rolls/yaposhka-102981032.webp",
    "ingredients": [
      "Креветка тигровая",
      "Сливочный сыр",
      "Плавленый сыр",
      "Пармезан",
      "Моцарелла",
      "Авокадо",
      "Чеддер",
      "Унаги"
    ],
    "allergens": []
  },
  {
    "id": "y102980989",
    "name": "Ролл Невада",
    "description": "Креветки, Сливочный сыр, Томаго, Огурец, Кунжут",
    "price": 399,
    "weight": "235 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "classic",
    "image": "/images/rolls/yaposhka-102980989.webp",
    "ingredients": [
      "Креветки",
      "Сливочный сыр",
      "Томаго",
      "Огурец",
      "Кунжут"
    ],
    "allergens": []
  },
  {
    "id": "y102980990",
    "name": "Ролл Горо",
    "description": "Тортилья, Сливочный сыр, Маринованный огурец, Помидор, Копченая курица",
    "price": 299,
    "weight": "150 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "classic",
    "image": "/images/rolls/yaposhka-102980990.webp",
    "ingredients": [
      "Тортилья",
      "Сливочный сыр",
      "Маринованный огурец",
      "Помидор",
      "Копченая курица"
    ],
    "allergens": []
  },
  {
    "id": "y102980991",
    "name": "Ролл Такеши",
    "description": "Копченый лосось, Сливочный сыр, Огурец",
    "price": 649,
    "weight": "255 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "classic",
    "image": "/images/rolls/yaposhka-102980991.webp",
    "ingredients": [
      "Копченый лосось",
      "Сливочный сыр",
      "Огурец"
    ],
    "allergens": []
  },
  {
    "id": "y102980992",
    "name": "Ролл Калифорния с креветками",
    "description": "Креветки тигровые, Тобико, Авокадо, Огурец, Майонез",
    "price": 549,
    "weight": "245 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "classic",
    "image": "/images/rolls/yaposhka-102980992.webp",
    "ingredients": [
      "Креветки тигровые",
      "Тобико",
      "Авокадо",
      "Огурец",
      "Майонез"
    ],
    "allergens": []
  },
  {
    "id": "y102980993",
    "name": "Ролл Юдзу тунец",
    "description": "Тунец, Креветка темпура, Сливочный сыр, Авокадо, Огурец, Соус юдзу",
    "price": 699,
    "weight": "314 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "classic",
    "image": "/images/rolls/yaposhka-102980993.webp",
    "ingredients": [
      "Тунец",
      "Креветка темпура",
      "Сливочный сыр",
      "Авокадо",
      "Огурец",
      "Соус юдзу"
    ],
    "allergens": []
  },
  {
    "id": "y102980994",
    "name": "Ролл Филадельфия лайт",
    "description": "Лосось, Сливочный сыр, Авокадо",
    "price": 499,
    "weight": "230 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "classic",
    "image": "/images/rolls/yaposhka-102980994.webp",
    "ingredients": [
      "Лосось",
      "Сливочный сыр",
      "Авокадо"
    ],
    "allergens": []
  },
  {
    "id": "y102980995",
    "name": "Ролл Санрайс",
    "description": "Креветки, Тобико, Сливочный сыр, Огурец",
    "price": 449,
    "weight": "235 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "classic",
    "image": "/images/rolls/yaposhka-102980995.webp",
    "ingredients": [
      "Креветки",
      "Тобико",
      "Сливочный сыр",
      "Огурец"
    ],
    "allergens": []
  },
  {
    "id": "y102980996",
    "name": "Ролл Каппа хара маки",
    "description": "Лосось, Огурец, Спайси соус",
    "price": 399,
    "weight": "170 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "classic",
    "image": "/images/rolls/yaposhka-102980996.webp",
    "ingredients": [
      "Лосось",
      "Огурец",
      "Спайси соус"
    ],
    "allergens": []
  },
  {
    "id": "y102980997",
    "name": "Ролл Вегас",
    "description": "Лосось, Авокадо, Сыр сливочный, Тобико",
    "price": 699,
    "weight": "235 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "classic",
    "image": "/images/rolls/yaposhka-102980997.webp",
    "ingredients": [
      "Лосось",
      "Авокадо",
      "Сыр сливочный",
      "Тобико"
    ],
    "allergens": []
  },
  {
    "id": "y102980998",
    "name": "Ролл Филадельфия",
    "description": "Лосось, Сливочный сыр, Огурец",
    "price": 379,
    "weight": "265 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "classic",
    "image": "/images/rolls/yaposhka-102980998.webp",
    "ingredients": [
      "Лосось",
      "Сливочный сыр",
      "Огурец"
    ],
    "allergens": []
  },
  {
    "id": "y102980999",
    "name": "Ролл Чиз эби",
    "description": "Сливочный сыр, Темпура креветка, Огурец, Сыр чеддер, Терияки, Лук фри",
    "price": 449,
    "weight": "260 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "classic",
    "image": "/images/rolls/yaposhka-102980999.webp",
    "ingredients": [
      "Сливочный сыр",
      "Темпура креветка",
      "Огурец",
      "Сыр чеддер",
      "Терияки",
      "Лук фри"
    ],
    "allergens": []
  },
  {
    "id": "y102981000",
    "name": "Ролл Дракон",
    "description": "Угорь, Тигровые креветки, Огурец, Унаги соус, Кунжут",
    "price": 599,
    "weight": "230 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "classic",
    "image": "/images/rolls/yaposhka-102981000.webp",
    "ingredients": [
      "Угорь",
      "Тигровые креветки",
      "Огурец",
      "Унаги соус",
      "Кунжут"
    ],
    "allergens": []
  },
  {
    "id": "y102981001",
    "name": "Ролл Ютто",
    "description": "Лосось, Угорь, Сливочный сыр, Авокадо",
    "price": 599,
    "weight": "245 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "classic",
    "image": "/images/rolls/yaposhka-102981001.webp",
    "ingredients": [
      "Лосось",
      "Угорь",
      "Сливочный сыр",
      "Авокадо"
    ],
    "allergens": []
  },
  {
    "id": "y102981002",
    "name": "Ролл Унаги Онигара",
    "description": "Угорь, Сливочный сыр, Дайкон, Тобико, Унаги соус, Кунжут",
    "price": 649,
    "weight": "260 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "classic",
    "image": "/images/rolls/yaposhka-102981002.webp",
    "ingredients": [
      "Угорь",
      "Сливочный сыр",
      "Дайкон",
      "Тобико",
      "Унаги соус",
      "Кунжут"
    ],
    "allergens": []
  },
  {
    "id": "y102981003",
    "name": "Ролл Трюфель креветка",
    "description": "Тигровая креветка, Лосось, Сливочный сыр, Трюфельный соус",
    "price": 749,
    "weight": "288 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "classic",
    "image": "/images/rolls/yaposhka-102981003.webp",
    "ingredients": [
      "Тигровая креветка",
      "Лосось",
      "Сливочный сыр",
      "Трюфельный соус"
    ],
    "allergens": []
  },
  {
    "id": "y102981004",
    "name": "Острый ролл с креветкой",
    "description": "Креветки, Тобико, Спайси соус (острый), Огурец",
    "price": 499,
    "weight": "230 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "classic",
    "image": "/images/rolls/yaposhka-102981004.webp",
    "ingredients": [
      "Креветки",
      "Тобико",
      "Спайси соус (острый)",
      "Огурец"
    ],
    "allergens": []
  },
  {
    "id": "y102981005",
    "name": "Ролл Куки (с воздушным рисом)",
    "description": "Лосось, Снежный краб, Сливочный сыр, Огурец, Унаги, Воздушный рис",
    "price": 499,
    "weight": "233 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "classic",
    "image": "/images/rolls/yaposhka-102981005.webp",
    "ingredients": [
      "Лосось",
      "Снежный краб",
      "Сливочный сыр",
      "Огурец",
      "Унаги",
      "Воздушный рис"
    ],
    "allergens": []
  },
  {
    "id": "y102981006",
    "name": "Ролл Бонито сяке",
    "description": "Лосось, Сливочный сыр, Огурец, Бонито",
    "price": 549,
    "weight": "220 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "classic",
    "image": "/images/rolls/yaposhka-102981006.webp",
    "ingredients": [
      "Лосось",
      "Сливочный сыр",
      "Огурец",
      "Бонито"
    ],
    "allergens": []
  },
  {
    "id": "y102981007",
    "name": "Ролл Канада",
    "description": "Угорь, Сливочный сыр, Тобико, Огурец, Унаги соус, Кунжут",
    "price": 349,
    "weight": "275 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "classic",
    "image": "/images/rolls/yaposhka-102981007.webp",
    "ingredients": [
      "Угорь",
      "Сливочный сыр",
      "Тобико",
      "Огурец",
      "Унаги соус",
      "Кунжут"
    ],
    "allergens": []
  },
  {
    "id": "y102981008",
    "name": "Ролл Сливочный с креветкой",
    "description": "Креветки, Сливочный сыр, Огурец, Кунжут",
    "price": 399,
    "weight": "235 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "classic",
    "image": "/images/rolls/yaposhka-102981008.webp",
    "ingredients": [
      "Креветки",
      "Сливочный сыр",
      "Огурец",
      "Кунжут"
    ],
    "allergens": []
  },
  {
    "id": "y102981009",
    "name": "Ролл Бесто",
    "description": "Тортилья, Сливочный сыр, Зеленый лук, Копченый лосось",
    "price": 499,
    "weight": "150 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "classic",
    "image": "/images/rolls/yaposhka-102981009.webp",
    "ingredients": [
      "Тортилья",
      "Сливочный сыр",
      "Зеленый лук",
      "Копченый лосось"
    ],
    "allergens": []
  },
  {
    "id": "y102981010",
    "name": "Эби темпура ролл",
    "description": "Тигровые креветки темпура, Тобико, Огурец",
    "price": 499,
    "weight": "224 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "classic",
    "image": "/images/rolls/yaposhka-102981010.webp",
    "ingredients": [
      "Тигровые креветки темпура",
      "Тобико",
      "Огурец"
    ],
    "allergens": []
  },
  {
    "id": "y102981011",
    "name": "Ролл Филадельфия эби",
    "description": "Сливочный сыр, Огурец, Креветки тигровые",
    "price": 499,
    "weight": "260 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "classic",
    "image": "/images/rolls/yaposhka-102981011.webp",
    "ingredients": [
      "Сливочный сыр",
      "Огурец",
      "Креветки тигровые"
    ],
    "allergens": []
  },
  {
    "id": "y102981012",
    "name": "Ролл Канада лайт",
    "description": "Угорь, Сливочный сыр, Авокадо",
    "price": 449,
    "weight": "240 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "classic",
    "image": "/images/rolls/yaposhka-102981012.webp",
    "ingredients": [
      "Угорь",
      "Сливочный сыр",
      "Авокадо"
    ],
    "allergens": []
  },
  {
    "id": "y102981013",
    "name": "Ролл Фито",
    "description": "Салат айсберг, Огурец, Паприка, Помидор",
    "price": 249,
    "weight": "200 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "classic",
    "image": "/images/rolls/yaposhka-102981013.webp",
    "ingredients": [
      "Салат айсберг",
      "Огурец",
      "Паприка",
      "Помидор"
    ],
    "allergens": []
  },
  {
    "id": "y102981014",
    "name": "Ролл Клара",
    "description": "Кларий, Сливочный сыр, Огурец, Унаги соус, Кунжут",
    "price": 499,
    "weight": "280 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "classic",
    "image": "/images/rolls/yaposhka-102981014.webp",
    "ingredients": [
      "Кларий",
      "Сливочный сыр",
      "Огурец",
      "Унаги соус",
      "Кунжут"
    ],
    "allergens": []
  },
  {
    "id": "y102981015",
    "name": "Ролл Калифорния с крабом",
    "description": "Тобико, Снежный краб, Огурец, Авокадо, Майонез",
    "price": 249,
    "weight": "245 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "classic",
    "image": "/images/rolls/yaposhka-102981015.webp",
    "ingredients": [
      "Тобико",
      "Снежный краб",
      "Огурец",
      "Авокадо",
      "Майонез"
    ],
    "allergens": []
  },
  {
    "id": "y102981016",
    "name": "Ролл Сливочный с крабом",
    "description": "Снежный краб, Сливочный сыр, Огурец, Кунжут",
    "price": 299,
    "weight": "235 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "classic",
    "image": "/images/rolls/yaposhka-102981016.webp",
    "ingredients": [
      "Снежный краб",
      "Сливочный сыр",
      "Огурец",
      "Кунжут"
    ],
    "allergens": []
  },
  {
    "id": "y102981017",
    "name": "Ролл Тори чиз",
    "description": "Темпура курица, Огурец, Сливочный сыр, Сыр чеддер",
    "price": 349,
    "weight": "258 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "classic",
    "image": "/images/rolls/yaposhka-102981017.webp",
    "ingredients": [
      "Темпура курица",
      "Огурец",
      "Сливочный сыр",
      "Сыр чеддер"
    ],
    "allergens": []
  },
  {
    "id": "y102981018",
    "name": "Ролл Восточный с лососем",
    "description": "Лосось, Авокадо, Огурец, Кунжут",
    "price": 449,
    "weight": "220 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "classic",
    "image": "/images/rolls/yaposhka-102981018.webp",
    "ingredients": [
      "Лосось",
      "Авокадо",
      "Огурец",
      "Кунжут"
    ],
    "allergens": []
  },
  {
    "id": "y102981019",
    "name": "Ролл Калифорния с лососем",
    "description": "Лосось, Тобико, Майонез, Огурец, Авокадо",
    "price": 699,
    "weight": "245 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "classic",
    "image": "/images/rolls/yaposhka-102981019.webp",
    "ingredients": [
      "Лосось",
      "Тобико",
      "Майонез",
      "Огурец",
      "Авокадо"
    ],
    "allergens": []
  },
  {
    "id": "y102981022",
    "name": "Ролл Магуро спайси",
    "description": "Тунец, Спайси соус, Кунжут",
    "price": 499,
    "weight": "220 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "classic",
    "image": "/images/rolls/yaposhka-102981022.webp",
    "ingredients": [
      "Тунец",
      "Спайси соус",
      "Кунжут"
    ],
    "allergens": []
  },
  {
    "id": "y102981023",
    "name": "Острый ролл с лососем",
    "description": "Лосось, Тобико, Спайси соус (острый), Огурец",
    "price": 549,
    "weight": "230 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "classic",
    "image": "/images/rolls/yaposhka-102981023.webp",
    "ingredients": [
      "Лосось",
      "Тобико",
      "Спайси соус (острый)",
      "Огурец"
    ],
    "allergens": []
  },
  {
    "id": "y102981024",
    "name": "Ролл Магуро томаго",
    "description": "Тунец, Томаго, Спайси соус (острый), Огурец",
    "price": 399,
    "weight": "245 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "classic",
    "image": "/images/rolls/yaposhka-102981024.webp",
    "ingredients": [
      "Тунец",
      "Томаго",
      "Спайси соус (острый)",
      "Огурец"
    ],
    "allergens": []
  },
  {
    "id": "y102981025",
    "name": "Ролл Капля",
    "description": "Копченый лосось, Снежный краб, Сливочный сыр, Тобико, Огурец",
    "price": 549,
    "weight": "255 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "classic",
    "image": "/images/rolls/yaposhka-102981025.webp",
    "ingredients": [
      "Копченый лосось",
      "Снежный краб",
      "Сливочный сыр",
      "Тобико",
      "Огурец"
    ],
    "allergens": []
  },
  {
    "id": "y102981033",
    "name": "Ролл Тори Фреш",
    "description": "Копченая куриная грудка, Томаго, Огурец, Зеленый лук",
    "price": 299,
    "weight": "265 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "classic",
    "image": "/images/rolls/yaposhka-102981033.webp",
    "ingredients": [
      "Копченая куриная грудка",
      "Томаго",
      "Огурец",
      "Зеленый лук"
    ],
    "allergens": []
  },
  {
    "id": "y102981034",
    "name": "Ролл Нью Сат Су",
    "description": "Лосось, Сливочный сыр, Имбирь, Огурец, Спайси соус (острый)",
    "price": 799,
    "weight": "290 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "classic",
    "image": "/images/rolls/yaposhka-102981034.webp",
    "ingredients": [
      "Лосось",
      "Сливочный сыр",
      "Имбирь",
      "Огурец",
      "Спайси соус (острый)"
    ],
    "allergens": []
  },
  {
    "id": "y102981035",
    "name": "Ролл Уни",
    "description": "Тигровая креветка, Угорь, Огурец, Сливочный сыр, Тобика, Кунжут, Унаги соус, Сырный соус",
    "price": 499,
    "weight": "250 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "baked",
    "image": "/images/rolls/yaposhka-102981035.webp",
    "ingredients": [
      "Тигровая креветка",
      "Угорь",
      "Огурец",
      "Сливочный сыр",
      "Тобика",
      "Кунжут",
      "Унаги соус",
      "Сырный соус"
    ],
    "allergens": []
  },
  {
    "id": "y102981036",
    "name": "Ролл Окинава",
    "description": "Креветки, Сливочный сыр, Тобика, Сырный соус, Терияки",
    "price": 599,
    "weight": "300 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "baked",
    "image": "/images/rolls/yaposhka-102981036.webp",
    "ingredients": [
      "Креветки",
      "Сливочный сыр",
      "Тобика",
      "Сырный соус",
      "Терияки"
    ],
    "allergens": []
  },
  {
    "id": "y102981037",
    "name": "Ролл Ричи",
    "description": "Снежный краб, Сливочный сыр, Томаго, Огурец, Моцарелла",
    "price": 349,
    "weight": "265 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "baked",
    "image": "/images/rolls/yaposhka-102981037.webp",
    "ingredients": [
      "Снежный краб",
      "Сливочный сыр",
      "Томаго",
      "Огурец",
      "Моцарелла"
    ],
    "allergens": []
  },
  {
    "id": "y102981038",
    "name": "Ролл Филадельфия HOT",
    "description": "Лосось, Сливочный сыр, Огурец, Сырный соус",
    "price": 749,
    "weight": "275 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "baked",
    "image": "/images/rolls/yaposhka-102981038.webp",
    "ingredients": [
      "Лосось",
      "Сливочный сыр",
      "Огурец",
      "Сырный соус"
    ],
    "allergens": []
  },
  {
    "id": "y102981039",
    "name": "Ролл Япошка",
    "description": "Лосось, Угорь, Сливочный сыр, Огурец, Сырный соус, Унаги, Соус, Кунжут",
    "price": 899,
    "weight": "310 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "baked",
    "image": "/images/rolls/yaposhka-102981039.webp",
    "ingredients": [
      "Лосось",
      "Угорь",
      "Сливочный сыр",
      "Огурец",
      "Сырный соус",
      "Унаги",
      "Соус",
      "Кунжут"
    ],
    "allergens": []
  },
  {
    "id": "y102981040",
    "name": "Ролл Мурукай",
    "description": "Лосось, Мидии, Сливочный сыр, Спайси соус",
    "price": 649,
    "weight": "275 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "baked",
    "image": "/images/rolls/yaposhka-102981040.webp",
    "ingredients": [
      "Лосось",
      "Мидии",
      "Сливочный сыр",
      "Спайси соус"
    ],
    "allergens": []
  },
  {
    "id": "y102981041",
    "name": "Ролл Амондо (с миндалем)",
    "description": "Лосось, Сливочный сыр, Омлет, Тобика, Сырный соус, Лепестки миндаля",
    "price": 499,
    "weight": "263 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "baked",
    "image": "/images/rolls/yaposhka-102981041.webp",
    "ingredients": [
      "Лосось",
      "Сливочный сыр",
      "Омлет",
      "Тобика",
      "Сырный соус",
      "Лепестки миндаля"
    ],
    "allergens": []
  },
  {
    "id": "y102981042",
    "name": "Ролл Нью Йорк",
    "description": "Креветки, Авокадо, Сливочный сыр, Сырный соус",
    "price": 499,
    "weight": "265 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "baked",
    "image": "/images/rolls/yaposhka-102981042.webp",
    "ingredients": [
      "Креветки",
      "Авокадо",
      "Сливочный сыр",
      "Сырный соус"
    ],
    "allergens": []
  },
  {
    "id": "y102981043",
    "name": "Ролл Калифорния запеченая",
    "description": "Тобика, Снежный краб, Огурец, Авокадо, Сырный соус",
    "price": 449,
    "weight": "270 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "baked",
    "image": "/images/rolls/yaposhka-102981043.webp",
    "ingredients": [
      "Тобика",
      "Снежный краб",
      "Огурец",
      "Авокадо",
      "Сырный соус"
    ],
    "allergens": []
  },
  {
    "id": "y102981044",
    "name": "Ролл Утата (опаленный)",
    "description": "Бекон, Сливочный сыр, Огурец",
    "price": 349,
    "weight": "235 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "baked",
    "image": "/images/rolls/yaposhka-102981044.webp",
    "ingredients": [
      "Бекон",
      "Сливочный сыр",
      "Огурец"
    ],
    "allergens": []
  },
  {
    "id": "y102981045",
    "name": "Ролл Когета",
    "description": "Лосось, Сливочный сыр, Темпура креветка, Огурец, Унаги соус, Спайси соус (острый), Кунжут",
    "price": 949,
    "weight": "290 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "baked",
    "image": "/images/rolls/yaposhka-102981045.webp",
    "ingredients": [
      "Лосось",
      "Сливочный сыр",
      "Темпура креветка",
      "Огурец",
      "Унаги соус",
      "Спайси соус (острый)",
      "Кунжут"
    ],
    "allergens": []
  },
  {
    "id": "y102981046",
    "name": "Ролл Филадельфия опаленная",
    "description": "Лосось, Сливочный сыр, Авокадо, Кунжут, Унаги соус",
    "price": 749,
    "weight": "265 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "baked",
    "image": "/images/rolls/yaposhka-102981046.webp",
    "ingredients": [
      "Лосось",
      "Сливочный сыр",
      "Авокадо",
      "Кунжут",
      "Унаги соус"
    ],
    "allergens": []
  },
  {
    "id": "y102980978",
    "name": "Ролл Катана",
    "description": "Креветки, Сливочный сыр, Снежный краб, Огурец",
    "price": 399,
    "weight": "270 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "tempura",
    "image": "/images/rolls/yaposhka-102980978.webp",
    "ingredients": [
      "Креветки",
      "Сливочный сыр",
      "Снежный краб",
      "Огурец"
    ],
    "allergens": []
  },
  {
    "id": "y102980979",
    "name": "Ролл Гейша",
    "description": "Угорь, Лосось, Огурец",
    "price": 599,
    "weight": "250 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "tempura",
    "image": "/images/rolls/yaposhka-102980979.webp",
    "ingredients": [
      "Угорь",
      "Лосось",
      "Огурец"
    ],
    "allergens": []
  },
  {
    "id": "y102980980",
    "name": "Ролл Находка",
    "description": "Лосось, Спайси соус (острый), Огурец",
    "price": 549,
    "weight": "260 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "tempura",
    "image": "/images/rolls/yaposhka-102980980.webp",
    "ingredients": [
      "Лосось",
      "Спайси соус (острый)",
      "Огурец"
    ],
    "allergens": []
  },
  {
    "id": "y102980981",
    "name": "Ролл Вулкан",
    "description": "Угорь, Креветка, Тобико, Огурец",
    "price": 499,
    "weight": "260 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "tempura",
    "image": "/images/rolls/yaposhka-102980981.webp",
    "ingredients": [
      "Угорь",
      "Креветка",
      "Тобико",
      "Огурец"
    ],
    "allergens": []
  },
  {
    "id": "y102980982",
    "name": "Ролл Филадельфия спешл",
    "description": "Лосось, Сливочный сыр, Авокадо",
    "price": 599,
    "weight": "270 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "tempura",
    "image": "/images/rolls/yaposhka-102980982.webp",
    "ingredients": [
      "Лосось",
      "Сливочный сыр",
      "Авокадо"
    ],
    "allergens": []
  },
  {
    "id": "y102980983",
    "name": "Ролл Бали",
    "description": "Креветки, Сливочный сыр, Салат айсберг, Унаги соус",
    "price": 399,
    "weight": "275 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "tempura",
    "image": "/images/rolls/yaposhka-102980983.webp",
    "ingredients": [
      "Креветки",
      "Сливочный сыр",
      "Салат айсберг",
      "Унаги соус"
    ],
    "allergens": []
  },
  {
    "id": "y102980984",
    "name": "Ролл Тори Хот",
    "description": "Копченая куриная грудка, Моцарелла, Айсберг",
    "price": 349,
    "weight": "260 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "tempura",
    "image": "/images/rolls/yaposhka-102980984.webp",
    "ingredients": [
      "Копченая куриная грудка",
      "Моцарелла",
      "Айсберг"
    ],
    "allergens": []
  },
  {
    "id": "y102980985",
    "name": "Ролл Калифорния спешл",
    "description": "Снежный краб, Тобико, Огурец",
    "price": 349,
    "weight": "250 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "tempura",
    "image": "/images/rolls/yaposhka-102980985.webp",
    "ingredients": [
      "Снежный краб",
      "Тобико",
      "Огурец"
    ],
    "allergens": []
  },
  {
    "id": "y102980986",
    "name": "Ролл Мони",
    "description": "Лосось, Снежный краб, Сливочный сыр, Огурец",
    "price": 749,
    "weight": "200 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "tempura",
    "image": "/images/rolls/yaposhka-102980986.webp",
    "ingredients": [
      "Лосось",
      "Снежный краб",
      "Сливочный сыр",
      "Огурец"
    ],
    "allergens": []
  },
  {
    "id": "y102980987",
    "name": "Ролл Клан",
    "description": "Креветки, Угорь, Сливочный сыр, Огурец",
    "price": 449,
    "weight": "250 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "tempura",
    "image": "/images/rolls/yaposhka-102980987.webp",
    "ingredients": [
      "Креветки",
      "Угорь",
      "Сливочный сыр",
      "Огурец"
    ],
    "allergens": []
  },
  {
    "id": "y102980988",
    "name": "Ролл Бамбино",
    "description": "Угорь, Лосось, Сливочный сыр, Авокадо, Огурец",
    "price": 499,
    "weight": "260 гр",
    "pieces": "",
    "category": "rolls",
    "subcategory": "tempura",
    "image": "/images/rolls/yaposhka-102980988.webp",
    "ingredients": [
      "Угорь",
      "Лосось",
      "Сливочный сыр",
      "Авокадо",
      "Огурец"
    ],
    "allergens": []
  },
  {
    "id": "y102981047",
    "name": "Маки сливочный с луком",
    "description": "Сливочный сыр, Зеленый лук",
    "price": 149,
    "weight": "140 гр",
    "pieces": "8 шт",
    "category": "rolls",
    "subcategory": "classic",
    "image": "/images/rolls/yaposhka-102981047.webp",
    "ingredients": [
      "Сливочный сыр",
      "Зеленый лук"
    ],
    "allergens": []
  },
  {
    "id": "y102981048",
    "name": "Маки сливочный с огурцом",
    "description": "Сливочный сыр, Огурец",
    "price": 149,
    "weight": "140 гр",
    "pieces": "8 шт",
    "category": "rolls",
    "subcategory": "classic",
    "image": "/images/rolls/yaposhka-102981048.webp",
    "ingredients": [
      "Сливочный сыр",
      "Огурец"
    ],
    "allergens": []
  },
  {
    "id": "y102981049",
    "name": "Маки сливочный с лососем",
    "description": "Сливочный сыр, Лосось",
    "price": 349,
    "weight": "140 гр",
    "pieces": "8 шт",
    "category": "rolls",
    "subcategory": "classic",
    "image": "/images/rolls/yaposhka-102981049.webp",
    "ingredients": [
      "Сливочный сыр",
      "Лосось"
    ],
    "allergens": []
  },
  {
    "id": "y102981050",
    "name": "Маки сливочный с креветкой",
    "description": "Сливочный сыр, Креветка",
    "price": 239,
    "weight": "140 гр",
    "pieces": "8 шт",
    "category": "rolls",
    "subcategory": "classic",
    "image": "/images/rolls/yaposhka-102981050.webp",
    "ingredients": [
      "Сливочный сыр",
      "Креветка"
    ],
    "allergens": []
  },
  {
    "id": "y102981051",
    "name": "Маки с лососем",
    "description": "",
    "price": 399,
    "weight": "140 гр",
    "pieces": "8 шт",
    "category": "rolls",
    "subcategory": "classic",
    "image": "/images/rolls/yaposhka-102981051.webp",
    "ingredients": [],
    "allergens": []
  },
  {
    "id": "y102981052",
    "name": "Маки с авокадо",
    "description": "",
    "price": 199,
    "weight": "140 гр",
    "pieces": "8 шт",
    "category": "rolls",
    "subcategory": "classic",
    "image": "/images/rolls/yaposhka-102981052.webp",
    "ingredients": [],
    "allergens": []
  },
  {
    "id": "y102981053",
    "name": "Маки  с огурцом",
    "description": "",
    "price": 149,
    "weight": "140 гр",
    "pieces": "8 шт",
    "category": "rolls",
    "subcategory": "classic",
    "image": "/images/rolls/yaposhka-102981053.webp",
    "ingredients": [],
    "allergens": []
  },
  {
    "id": "y102981054",
    "name": "Маки с креветками",
    "description": "",
    "price": 349,
    "weight": "140 гр",
    "pieces": "8 шт",
    "category": "rolls",
    "subcategory": "classic",
    "image": "/images/rolls/yaposhka-102981054.webp",
    "ingredients": [],
    "allergens": []
  },
  {
    "id": "y102981055",
    "name": "Маки с чука",
    "description": "",
    "price": 199,
    "weight": "140 гр",
    "pieces": "8 шт",
    "category": "rolls",
    "subcategory": "classic",
    "image": "/images/rolls/yaposhka-102981055.webp",
    "ingredients": [],
    "allergens": []
  },
  {
    "id": "y102981056",
    "name": "Маки с угрем",
    "description": "",
    "price": 349,
    "weight": "140 гр",
    "pieces": "8 шт",
    "category": "rolls",
    "subcategory": "classic",
    "image": "/images/rolls/yaposhka-102981056.webp",
    "ingredients": [],
    "allergens": []
  },
  {
    "id": "7",
    "name": "Суши с лососем",
    "description": "Нежнейший лосось на рисовой подушке",
    "price": 185,
    "weight": "40 г",
    "pieces": "2 шт",
    "calories": 95,
    "category": "sushi",
    "image": "sushi-salmon",
    "ingredients": [
      "рис",
      "лосось"
    ],
    "allergens": [
      "рыба"
    ]
  },
  {
    "id": "8",
    "name": "Суши с тунцом",
    "description": "Свежий тунец на рисе — вкус океана",
    "price": 210,
    "weight": "40 г",
    "pieces": "2 шт",
    "calories": 90,
    "category": "sushi",
    "image": "sushi-tuna",
    "ingredients": [
      "рис",
      "тунец"
    ],
    "allergens": [
      "рыба"
    ]
  },
  {
    "id": "9",
    "name": "Суши с угрём",
    "description": "Копчёный угорь с соусом унаги",
    "price": 250,
    "weight": "45 г",
    "pieces": "2 шт",
    "calories": 110,
    "category": "sushi",
    "image": "sushi-eel",
    "ingredients": [
      "рис",
      "угорь",
      "соус унаги",
      "кунжут"
    ],
    "allergens": [
      "рыба",
      "соя"
    ],
    "isNew": true
  },
  {
    "id": "34",
    "name": "Суши с креветкой",
    "description": "Сочная креветка эби на рисе",
    "price": 195,
    "weight": "42 г",
    "pieces": "2 шт",
    "calories": 85,
    "category": "sushi",
    "image": "sushi-shrimp",
    "ingredients": [
      "рис",
      "креветка"
    ],
    "allergens": [
      "ракообразные"
    ]
  },
  {
    "id": "35",
    "name": "Суши с осьминогом",
    "description": "Нежный осьминог тако на рисе",
    "price": 220,
    "weight": "45 г",
    "pieces": "2 шт",
    "calories": 80,
    "category": "sushi",
    "image": "sushi-octopus",
    "ingredients": [
      "рис",
      "осьминог"
    ],
    "allergens": [
      "моллюски"
    ],
    "isHit": true
  },
  {
    "id": "36",
    "name": "Суши Тамаго",
    "description": "Сладкий японский омлет на рисе",
    "price": 150,
    "weight": "45 г",
    "pieces": "2 шт",
    "calories": 100,
    "category": "sushi",
    "image": "sushi-tamago",
    "ingredients": [
      "рис",
      "яйцо",
      "сахар",
      "соевый соус"
    ],
    "allergens": [
      "яйца"
    ]
  },
  {
    "id": "46",
    "name": "Сет №1",
    "description": "Ролл Краб - 3, Ролл Лосось - 3, Ролл Эсколар - 3, Ролл Огурец - 3, Суши Лосось - 1, Суши Угорь - 1",
    "price": 430,
    "weight": "",
    "category": "sets",
    "image": "/images/goods/Good46-f02fb686c0-1.png",
    "ingredients": [],
    "allergens": [],
    "productUrl": "/good/sety-no1"
  },
  {
    "id": "66",
    "name": "Сет №6",
    "description": "Овощной - 6, Ролл Чука - 6, Ролл Такуан - 6, Ролл Огурец - 6",
    "price": 500,
    "weight": "",
    "category": "sets",
    "image": "/images/goods/Good66-6753a69892-1.jpg",
    "ingredients": [],
    "allergens": [],
    "productUrl": "/good/sety-no6"
  },
  {
    "id": "63",
    "name": "Сет №3",
    "description": "Ролл Креветка - 6, Суши Спайси Краб - 2, Ролл Филадельфия спешл - 8",
    "price": 540,
    "weight": "",
    "category": "sets",
    "image": "/images/goods/Good63-ae48bde4b8-1.jpg",
    "ingredients": [],
    "allergens": [],
    "productUrl": "/good/sety-no3"
  },
  {
    "id": "64",
    "name": "Сет №4",
    "description": "Ролл Лосось - 6, Ролл Огурец - 6, Ролл Краб - 6, Угорь - 6",
    "price": 540,
    "weight": "",
    "category": "sets",
    "image": "/images/goods/Good64-7554361877-1.jpg",
    "ingredients": [],
    "allergens": [],
    "productUrl": "/good/sety-no4"
  },
  {
    "id": "68",
    "name": "Сет №8",
    "description": "Суши Лосось - 1, Суши Угорь - 1, Суши Креветка - 1, Суши Чука - 1, Ролл Калифорния - 8",
    "price": 540,
    "weight": "",
    "category": "sets",
    "image": "/images/goods/Good68-385b7ee018-1.jpg",
    "ingredients": [],
    "allergens": [],
    "productUrl": "/good/sety-no8"
  },
  {
    "id": "297",
    "name": "Сет 1+1",
    "description": "ролл Сейшн 1/2 - 4, ролл калифорния 1/2 - 4, филадельфия спешл 1/2 - 4, Ролл лосось огурец 1/2 - 4",
    "price": 550,
    "weight": "",
    "category": "sets",
    "image": "/images/goods/Good297-09e658e4a9-1.jpg",
    "ingredients": [],
    "allergens": [],
    "productUrl": "/good/sety-set-11"
  },
  {
    "id": "67",
    "name": "Сет №7",
    "description": "Ролл Лосось - 6, Ролл Лосось-Огурец - 8, Суши Лосось - 2",
    "price": 550,
    "weight": "",
    "category": "sets",
    "image": "/images/goods/Good67-d53cc1deb6-1.jpg",
    "ingredients": [],
    "allergens": [],
    "productUrl": "/good/sety-no7"
  },
  {
    "id": "294",
    "name": "Сет Легкий",
    "description": "ролл лосось запеченный1/2 - 3, ролл креветка запеченный 1/2 - 3, ролл краб запеченный 1/2 - 3, суши с курицей запеченная - 2, Ролл с курицей запеченный классический (острый) - 3",
    "price": 550,
    "weight": "",
    "category": "sets",
    "image": "/images/goods/Good294-a137905fa3-1.jpg",
    "ingredients": [],
    "allergens": [],
    "productUrl": "/good/sety-set-lubimka-lajt"
  },
  {
    "id": "57",
    "name": "Сет №2",
    "description": "Ролл Калифорния - 4, Ролл Филадельфия спешл - 4, Ролл Лосось-Огурец - 4, Суши Спайси Краб - 1, Суши Чука - 1, Ролл За всё - 4",
    "price": 670,
    "weight": "",
    "category": "sets",
    "image": "/images/goods/Good57-5e6aa196ab-1.jpg",
    "ingredients": [],
    "allergens": [],
    "productUrl": "/good/sety-no2"
  },
  {
    "id": "288",
    "name": "Сет Краш",
    "description": "Ямайка - 8, Угорь - 6",
    "price": 700,
    "weight": "",
    "category": "sets",
    "image": "/images/goods/Good288-831a207659-1.jpg",
    "ingredients": [],
    "allergens": [],
    "productUrl": "/good/sety-set-kras"
  },
  {
    "id": "47",
    "name": "Сет №10",
    "description": "Острые с лососем - 6, Острые с крабом - 6, Острые с креветкой - 6, Суши Лосось - 1, Краб - 1, Суши Креветка - 1",
    "price": 770,
    "weight": "",
    "category": "sets",
    "image": "/images/goods/Good47-0a957cdd48-1.jpg",
    "ingredients": [],
    "allergens": [],
    "productUrl": "/good/sety-no10"
  },
  {
    "id": "69",
    "name": "Сет №9",
    "description": "Суши Лосось - 1, Суши Угорь - 1, Суши Икура - 1, Суши Чука - 1, Суши Креветка - 1, Суши Спайси Краб - 1, Суши Спайси Креветка - 1, Суши Сырный лосось - 1, Суши Сырная креветка - 1",
    "price": 770,
    "weight": "",
    "category": "sets",
    "image": "/images/goods/Good69-5117f00d39-1.jpg",
    "ingredients": [],
    "allergens": [],
    "productUrl": "/good/sety-no9"
  },
  {
    "id": "24",
    "name": "Пицца Пепперони",
    "description": "Классическая пицца с пикантной пепперони и сыром моцарелла",
    "price": 590,
    "weight": "450 г",
    "calories": 850,
    "category": "pizza",
    "image": "pizza-pepperoni",
    "ingredients": [
      "тесто",
      "томатный соус",
      "моцарелла",
      "пепперони"
    ],
    "allergens": [
      "глютен",
      "молоко"
    ],
    "isHit": true
  },
  {
    "id": "25",
    "name": "Пицца Маргарита",
    "description": "Нежная моцарелла, томатный соус и свежий базилик",
    "price": 490,
    "weight": "400 г",
    "calories": 680,
    "category": "pizza",
    "image": "pizza-margherita",
    "ingredients": [
      "тесто",
      "томатный соус",
      "моцарелла",
      "базилик"
    ],
    "allergens": [
      "глютен",
      "молоко"
    ]
  },
  {
    "id": "26",
    "name": "Пицца Четыре сыра",
    "description": "Моцарелла, горгонзола, пармезан и дорблю — сырное наслаждение",
    "price": 620,
    "weight": "420 г",
    "calories": 780,
    "category": "pizza",
    "image": "pizza-four-cheese",
    "ingredients": [
      "тесто",
      "моцарелла",
      "горгонзола",
      "пармезан",
      "дорблю"
    ],
    "allergens": [
      "глютен",
      "молоко"
    ],
    "isNew": true
  },
  {
    "id": "40",
    "name": "Пицца Гавайская",
    "description": "Ветчина и ананасы — тропический вкус",
    "price": 550,
    "weight": "430 г",
    "calories": 720,
    "category": "pizza",
    "image": "pizza-hawaiian",
    "ingredients": [
      "тесто",
      "томатный соус",
      "моцарелла",
      "ветчина",
      "ананас"
    ],
    "allergens": [
      "глютен",
      "молоко"
    ]
  },
  {
    "id": "41",
    "name": "Пицца BBQ с курицей",
    "description": "Курица в соусе барбекю с луком и зеленью",
    "price": 610,
    "weight": "440 г",
    "calories": 800,
    "category": "pizza",
    "image": "pizza-bbq",
    "ingredients": [
      "тесто",
      "соус BBQ",
      "моцарелла",
      "курица",
      "лук"
    ],
    "allergens": [
      "глютен",
      "молоко"
    ]
  },
  {
    "id": "42",
    "name": "Пицца с грибами",
    "description": "Ассорти грибов с сыром и травами",
    "price": 520,
    "weight": "410 г",
    "calories": 650,
    "category": "pizza",
    "image": "pizza-mushroom",
    "ingredients": [
      "тесто",
      "томатный соус",
      "моцарелла",
      "шампиньоны",
      "вешенки"
    ],
    "allergens": [
      "глютен",
      "молоко"
    ]
  },
  {
    "id": "333",
    "name": "Лапша WOK Лапша рисовая с курицей",
    "description": "Курица, Кунжут, Лапша рисовая, Овощной микс, Соус кисло сладкий",
    "price": 440,
    "weight": "450 гр",
    "category": "wok",
    "image": "/images/goods/Good333-0f0e28f891-1.jpg",
    "ingredients": [
      "Курица",
      "Кунжут",
      "Лапша рисовая",
      "Овощной микс",
      "Соус кисло сладкий"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/lapsa-wok-lapsa-risovaa-s-kuricej",
    "oldPrice": 490,
    "economy": 50
  },
  {
    "id": "334",
    "name": "Лапша WOK Лапша гречневая с курицей",
    "description": "Курица, Кунжут, Соевый соус, Овощной микс, Лапша гречневая",
    "price": 440,
    "weight": "450 гр",
    "category": "wok",
    "image": "/images/goods/Good334-ba48c20a44-1.jpg",
    "ingredients": [
      "Курица",
      "Кунжут",
      "Соевый соус",
      "Овощной микс",
      "Лапша гречневая"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/lapsa-wok-lapsa-vok-grecnevaa"
  },
  {
    "id": "335",
    "name": "Лапша WOK Лапша рисовая с морепродуктами",
    "description": "Кунжут, Лапша рисовая, Овощной микс, Морепродукты, Соус Терияки",
    "price": 440,
    "weight": "450 гр",
    "category": "wok",
    "image": "/images/goods/Good335-37b28ccb3f-1.jpg",
    "ingredients": [
      "Кунжут",
      "Лапша рисовая",
      "Овощной микс",
      "Морепродукты",
      "Соус Терияки"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/lapsa-wok-lapsa-risovaa",
    "oldPrice": 490,
    "economy": 50
  },
  {
    "id": "336",
    "name": "Лапша WOK Лапша рисовая со свининой",
    "description": "Кунжут, Лапша рисовая, Овощной микс, Свинина, Соус Кимчи",
    "price": 440,
    "weight": "450 гр",
    "category": "wok",
    "image": "/images/goods/Good336-472b99a551-1.jpg",
    "ingredients": [
      "Кунжут",
      "Лапша рисовая",
      "Овощной микс",
      "Свинина",
      "Соус Кимчи"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/lapsa-wok-lapsa-risovaa-so-svininoj",
    "oldPrice": 490,
    "economy": 50
  },
  {
    "id": "337",
    "name": "Лапша WOK Лапша гречневая со свининой",
    "description": "Кунжут, Овощной микс, Соус Терияки, Свинина, Лапша гречневая",
    "price": 440,
    "weight": "450 гр",
    "category": "wok",
    "image": "/images/goods/Good337-08012bc9ce-1_328.jpg",
    "ingredients": [
      "Кунжут",
      "Овощной микс",
      "Соус Терияки",
      "Свинина",
      "Лапша гречневая"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/lapsa-wok-lapsa-grecnevaa-so-svininoj",
    "oldPrice": 490,
    "economy": 50
  },
  {
    "id": "338",
    "name": "Лапша WOK Лапша пшеничная с курицей",
    "description": "Курица, Кунжут, Овощной микс, Соус Терияки, Лапша пшеничная",
    "price": 440,
    "weight": "450 гр",
    "category": "wok",
    "image": "/images/goods/Good338-67d560ebfc-1.jpg",
    "ingredients": [
      "Курица",
      "Кунжут",
      "Овощной микс",
      "Соус Терияки",
      "Лапша пшеничная"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/lapsa-wok-lapsa-psenicnaa-s-kuricej",
    "oldPrice": 490,
    "economy": 50
  },
  {
    "id": "339",
    "name": "Лапша WOK Лапша пшеничная со свининой",
    "description": "Кунжут, Овощной микс, Соус Терияки, Свинина, Лапша пшеничная",
    "price": 440,
    "weight": "450 гр",
    "category": "wok",
    "image": "/images/goods/Good339-a14af5d85a-1.jpg",
    "ingredients": [
      "Кунжут",
      "Овощной микс",
      "Соус Терияки",
      "Свинина",
      "Лапша пшеничная"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/lapsa-wok-lapsa-psenicnaa-so-svininoj",
    "oldPrice": 490,
    "economy": 50
  },
  {
    "id": "340",
    "name": "Лапша WOK Лапша яичная с курицей",
    "description": "Курица, Кунжут, Овощной микс, Соус кисло сладкий, Лапша яичная",
    "price": 440,
    "weight": "450 гр",
    "category": "wok",
    "image": "/images/goods/Good340-4cd5fa4a70-1.jpg",
    "ingredients": [
      "Курица",
      "Кунжут",
      "Овощной микс",
      "Соус кисло сладкий",
      "Лапша яичная"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/lapsa-wok-lapsa-aicnaa-s-kuricej",
    "oldPrice": 490,
    "economy": 50
  },
  {
    "id": "341",
    "name": "Лапша WOK Лапша яичная со свининой",
    "description": "Кунжут, Овощной микс, Свинина, Лапша яичная, Соус Кимчи",
    "price": 440,
    "weight": "450 гр",
    "category": "wok",
    "image": "/images/goods/Good341-af041b42e5-1_328.jpg",
    "ingredients": [
      "Кунжут",
      "Овощной микс",
      "Свинина",
      "Лапша яичная",
      "Соус Кимчи"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/lapsa-wok-lapsa-aicnaa-so-svininoj",
    "oldPrice": 490,
    "economy": 50
  },
  {
    "id": "342",
    "name": "Лапша WOK Рис Тяхан с курицей",
    "description": "Рис, Курица, Кунжут, Овощной микс, Соус Терияки",
    "price": 440,
    "weight": "450 гр",
    "category": "wok",
    "image": "/images/goods/Good342-206630114b-1.jpg",
    "ingredients": [
      "Рис",
      "Курица",
      "Кунжут",
      "Овощной микс",
      "Соус Терияки"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/lapsa-wok-ris-tahan",
    "oldPrice": 490,
    "economy": 50
  },
  {
    "id": "343",
    "name": "Лапша WOK Рис Тяхан с морепродуктами",
    "description": "Рис, Кунжут, Овощной микс, Морепродукты, Соус Терияки",
    "price": 440,
    "weight": "450 гр",
    "category": "wok",
    "image": "/images/goods/Good343-5c5de6f6a0-1.jpg",
    "ingredients": [
      "Рис",
      "Кунжут",
      "Овощной микс",
      "Морепродукты",
      "Соус Терияки"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/lapsa-wok-ris-tahan-more",
    "oldPrice": 490,
    "economy": 50
  },
  {
    "id": "344",
    "name": "Лапша WOK Рис Тяхан со свининой",
    "description": "Рис, Кунжут, Овощной микс, Соус Терияки, Свинина",
    "price": 440,
    "weight": "450 гр",
    "category": "wok",
    "image": "/images/goods/Good344-d5d50e8580-1.jpg",
    "ingredients": [
      "Рис",
      "Кунжут",
      "Овощной микс",
      "Соус Терияки",
      "Свинина"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/lapsa-wok-ris-tahan-svinina",
    "oldPrice": 490,
    "economy": 50
  },
  {
    "id": "29",
    "name": "Эдамаме",
    "description": "Молодые соевые бобы с морской солью",
    "price": 190,
    "weight": "150 г",
    "category": "snacks",
    "image": "edamame",
    "ingredients": [
      "эдамаме",
      "морская соль"
    ],
    "allergens": [
      "соя"
    ]
  },
  {
    "id": "30",
    "name": "Спринг-роллы",
    "description": "Хрустящие рисовые роллы с овощами",
    "price": 280,
    "weight": "160 г",
    "pieces": "4 шт",
    "category": "snacks",
    "image": "spring-rolls",
    "ingredients": [
      "рисовая бумага",
      "овощи",
      "вермишель"
    ],
    "allergens": []
  },
  {
    "id": "32",
    "name": "Гёдза с курицей",
    "description": "Японские пельмени с сочной куриной начинкой",
    "price": 350,
    "weight": "200 г",
    "pieces": "6 шт",
    "category": "snacks",
    "image": "gyoza",
    "ingredients": [
      "тесто",
      "курица",
      "капуста",
      "имбирь"
    ],
    "allergens": [
      "глютен"
    ],
    "isHit": true
  },
  {
    "id": "49",
    "name": "Темпура овощная",
    "description": "Хрустящие овощи в воздушном кляре",
    "price": 320,
    "weight": "180 г",
    "category": "snacks",
    "image": "tempura",
    "ingredients": [
      "кабачок",
      "баклажан",
      "перец",
      "кляр"
    ],
    "allergens": [
      "глютен"
    ]
  },
  {
    "id": "50",
    "name": "Такояки",
    "description": "Японские шарики с осьминогом",
    "price": 380,
    "weight": "200 г",
    "pieces": "6 шт",
    "category": "snacks",
    "image": "takoyaki",
    "ingredients": [
      "тесто",
      "осьминог",
      "соус",
      "бонито"
    ],
    "allergens": [
      "глютен",
      "моллюски"
    ],
    "isNew": true
  },
  {
    "id": "51",
    "name": "Карааге",
    "description": "Хрустящая курица по-японски",
    "price": 340,
    "weight": "200 г",
    "category": "snacks",
    "image": "karaage",
    "ingredients": [
      "курица",
      "соевый соус",
      "имбирь",
      "чеснок"
    ],
    "allergens": [
      "соя",
      "глютен"
    ]
  },
  {
    "id": "22",
    "name": "Соевый соус",
    "description": "Классический соус для суши",
    "price": 50,
    "weight": "50 мл",
    "category": "sauces",
    "image": "sauce-soy",
    "ingredients": [
      "соевые бобы",
      "пшеница",
      "соль"
    ],
    "allergens": [
      "соя",
      "глютен"
    ]
  },
  {
    "id": "23",
    "name": "Спайси майонез",
    "description": "Острый майонез для роллов",
    "price": 70,
    "weight": "50 мл",
    "category": "sauces",
    "image": "sauce-spicy-mayo",
    "ingredients": [
      "майонез",
      "соус чили",
      "специи"
    ],
    "allergens": [
      "яйца"
    ]
  },
  {
    "id": "33",
    "name": "Соус Унаги",
    "description": "Сладкий соус для угря и роллов",
    "price": 60,
    "weight": "50 мл",
    "category": "sauces",
    "image": "sauce-unagi",
    "ingredients": [
      "соевый соус",
      "мирин",
      "сахар"
    ],
    "allergens": [
      "соя"
    ]
  },
  {
    "id": "52",
    "name": "Соус Терияки",
    "description": "Сладко-солёный соус для мяса",
    "price": 70,
    "weight": "50 мл",
    "category": "sauces",
    "image": "sauce-teriyaki",
    "ingredients": [
      "соевый соус",
      "сахар",
      "мирин",
      "саке"
    ],
    "allergens": [
      "соя"
    ],
    "isHit": true
  },
  {
    "id": "53",
    "name": "Васаби",
    "description": "Острая японская горчица",
    "price": 40,
    "weight": "30 г",
    "category": "sauces",
    "image": "sauce-wasabi",
    "ingredients": [
      "хрен",
      "горчица",
      "краситель"
    ],
    "allergens": []
  },
  {
    "id": "54",
    "name": "Имбирь маринованный",
    "description": "Розовый имбирь гари для суши",
    "price": 40,
    "weight": "50 г",
    "category": "sauces",
    "image": "sauce-ginger",
    "ingredients": [
      "имбирь",
      "уксус",
      "сахар",
      "соль"
    ],
    "allergens": []
  },
  {
    "id": "10",
    "name": "Чука салат",
    "description": "Кунжут, Чука салат, Ореховый соус",
    "price": 250,
    "weight": "100 гр",
    "category": "salads",
    "image": "/images/goods/Good10-eae2c28e67-1.png",
    "ingredients": [
      "Кунжут",
      "Чука салат",
      "Ореховый соус"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/salaty-cuka-salat",
    "isNew": true
  },
  {
    "id": "248",
    "name": "Салат Цезарь с курицей",
    "description": "Курица, Помидор, Лист салата, сухари, соус",
    "price": 400,
    "weight": "",
    "category": "salads",
    "image": "/images/goods/Good248-11688459f2-1.jpg",
    "ingredients": [
      "Курица",
      "Помидор",
      "Лист салата",
      "сухари",
      "соус"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/salaty-i-napitki-salat-cezar-s-kuricej"
  },
  {
    "id": "249",
    "name": "Цезарь с лососем",
    "description": "Лосось, Помидор, Лист салата, сухари, соус",
    "price": 440,
    "weight": "",
    "category": "salads",
    "image": "/images/goods/Good249-914b3c1729-1.jpg",
    "ingredients": [
      "Лосось",
      "Помидор",
      "Лист салата",
      "сухари",
      "соус"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/salaty-i-napitki-cezar-s-lososem"
  },
  {
    "id": "263",
    "name": "Салат Цезарь с креветкой",
    "description": "Креветка, Помидор, Лист салата, сухари, соус",
    "price": 500,
    "weight": "",
    "category": "salads",
    "image": "/images/goods/Good263-2c90a35b0c-1.jpg",
    "ingredients": [
      "Креветка",
      "Помидор",
      "Лист салата",
      "сухари",
      "соус"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/salaty-i-napitki-salat-cezar-skrevetkoj",
    "isNew": true
  }
];

const setsRaw = setsCatalog as unknown as SetItem[];
export const setsProducts: Product[] = setsRaw.map((item) => ({
  id: String(item.id),
  name: String(item.name || ''),
  description: String(item.description || ''),
  price: Number(item.price || 0),
  weight: String(item.weight || ''),
  category: String(item.id) === '319' ? 'snacks' : 'sets',
  image: String(item.imageUrl || ''),
  ingredients: Array.isArray(item.ingredients) ? item.ingredients : (String(item.description || '').split(',').map(s => s.trim()).filter(Boolean)),
  allergens: [],
  pieces: item.pieces ? String(item.pieces) : undefined,
  calories: typeof item.calories === 'number' ? item.calories : undefined,
  productUrl: String(item.productUrl || ''),
  oldPrice: typeof item.oldPrice === 'number' ? item.oldPrice : undefined,
  economy: typeof item.economy === 'number' ? item.economy : undefined,
  setItems: item.setItems,
}));

type SushiItem = {
  id: string | number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  productUrl: string;
  weight?: string;
  calories?: number;
  pieces?: string;
  ingredients?: string[];
  oldPrice?: number;
  economy?: number;
};
const sushiRaw = sushiCatalog as unknown as SushiItem[];
export const sushiProducts: Product[] = sushiRaw.map((item) => ({
  id: String(item.id),
  name: String(item.name || ''),
  description: String(item.description || ''),
  price: Number(item.price || 0),
  weight: String(item.weight || ''),
  category: 'sushi',
  image: String(item.imageUrl || ''),
  ingredients: Array.isArray(item.ingredients) ? item.ingredients : (String(item.description || '').split(',').map(s => s.trim()).filter(Boolean)),
  allergens: [],
  pieces: item.pieces ? String(item.pieces) : undefined,
  calories: typeof item.calories === 'number' ? item.calories : undefined,
  productUrl: String(item.productUrl || ''),
  oldPrice: typeof item.oldPrice === 'number' ? item.oldPrice : undefined,
  economy: typeof item.economy === 'number' ? item.economy : undefined,
}));

type PizzaItem = {
  id: string | number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  productUrl: string;
  weight?: string;
  size?: string;
  calories?: number;
  ingredients?: string[];
  oldPrice?: number;
  economy?: number;
};
const pizzaRaw = pizzaCatalog as unknown as PizzaItem[];
export const pizzaProducts: Product[] = pizzaRaw.map((item) => ({
  id: String(item.id),
  name: String(item.name || ''),
  description: String(item.description || ''),
  price: Number(item.price || 0),
  weight: String(item.weight || ''),
  size: String(item.size || '36 см'),
  category: 'pizza',
  image: String(item.imageUrl || ''),
  ingredients: Array.isArray(item.ingredients) ? item.ingredients : (String(item.description || '').split(',').map(s => s.trim()).filter(Boolean)),
  allergens: [],
  calories: typeof item.calories === 'number' ? item.calories : undefined,
  productUrl: String(item.productUrl || ''),
  oldPrice: typeof item.oldPrice === 'number' ? item.oldPrice : undefined,
  economy: typeof item.economy === 'number' ? item.economy : undefined,
}));

type SnackItem = {
  id: string | number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  productUrl: string;
  weight?: string;
  calories?: number;
  pieces?: string;
  ingredients?: string[];
  oldPrice?: number;
  economy?: number;
};
const snacksRaw = snacksCatalog as unknown as SnackItem[];
export const snacksProducts: Product[] = snacksRaw.map((item) => ({
  id: String(item.id),
  name: String(item.name || ''),
  description: String(item.description || ''),
  price: Number(item.price || 0),
  weight: String(item.weight || ''),
  category: 'snacks',
  image: String(item.imageUrl || ''),
  ingredients: Array.isArray(item.ingredients) ? item.ingredients : (String(item.description || '').split(',').map(s => s.trim()).filter(Boolean)),
  allergens: [],
  pieces: item.pieces ? String(item.pieces) : undefined,
  calories: typeof item.calories === 'number' ? item.calories : undefined,
  productUrl: String(item.productUrl || ''),
  oldPrice: typeof item.oldPrice === 'number' ? item.oldPrice : undefined,
  economy: typeof item.economy === 'number' ? item.economy : undefined,
}));

const isBakedProduct = (p: Product) => {
  if (p.subcategory) return p.subcategory === 'baked';
  const lower = `${p.name} ${p.description} ${(p.ingredients || []).join(' ')}`.toLowerCase();
  return /запеч|печен/i.test(lower);
};
const isTempuraProduct = (p: Product) => {
  if (p.subcategory) return p.subcategory === 'tempura';
  const lower = `${p.name} ${p.description} ${(p.ingredients || []).join(' ')}`.toLowerCase();
  if (p.id === '104') return false;
  if (isBakedProduct(p)) return false;
  return /темпур|жарен|горяч/i.test(lower);
};

// Демо «в стиле MyBox»: роллы и сеты, которые подставляются вместо текущих по кнопке
type MyboxItem = {
  id: string;
  group: 'classic' | 'baked' | 'tempura' | 'set';
  name: string;
  description: string;
  price: number;
  weight: string;
  pieces: string;
  calories: number;
  image: string;
  ingredients: string[];
  setItems?: SetComponent[];
};
export const myboxProducts: Product[] = (myboxCatalog as MyboxItem[]).map((item) => ({
  id: item.id,
  name: item.name,
  description: item.description,
  price: item.price,
  weight: item.weight,
  pieces: item.pieces,
  calories: item.calories,
  category: item.group === 'set' ? 'sets' : 'rolls',
  subcategory: item.group === 'set' ? undefined : item.group,
  image: item.image,
  ingredients: item.ingredients,
  allergens: [],
  setItems: item.setItems,
}));

const getMyboxProductsByCategory = (categoryId: string): Product[] | null => {
  if (categoryId === 'sets') return myboxProducts.filter((p) => p.category === 'sets');
  const sub =
    categoryId === 'rolls' ? 'classic'
    : categoryId === 'rolls-baked' ? 'baked'
    : categoryId === 'rolls-tempura' ? 'tempura'
    : null;
  if (!sub) return null;
  return myboxProducts.filter((p) => p.category === 'rolls' && p.subcategory === sub);
};

export const getProductsByCategory = (categoryId: string, menuDemo: 'default' | 'mybox' = 'default') => {
  if (menuDemo === 'mybox') {
    const demo = getMyboxProductsByCategory(categoryId);
    if (demo) return demo;
  }
  if (categoryId === 'sets') return setsProducts.filter((p) => p.category === 'sets');
  if (categoryId === 'sushi') return sushiProducts;
  if (categoryId === 'pizza') return pizzaProducts;
  if (categoryId === 'snacks') return snacksProducts.concat(setsProducts.filter((p) => p.category === 'snacks'));
  if (categoryId === 'rolls-baked') return products.filter((p) => p.category === 'rolls' && isBakedProduct(p));
  if (categoryId === 'rolls-tempura') return products.filter((p) => p.category === 'rolls' && isTempuraProduct(p));
  if (categoryId === 'rolls') return products.filter((p) => p.category === 'rolls' && !isBakedProduct(p) && !isTempuraProduct(p));
  return products.filter((product) => product.category === categoryId);
};

export const getProduct = (id: string) => {
  return (
    products.find((product) => product.id === id) ||
    setsProducts.find((p) => p.id === id) ||
    sushiProducts.find((p) => p.id === id) ||
    pizzaProducts.find((p) => p.id === id) ||
    snacksProducts.find((p) => p.id === id) ||
    myboxProducts.find((p) => p.id === id)
  );
};
