import setsCatalog from '@/data/sets.catalog.json';
import sushiCatalog from '@/data/sushi.catalog.json';
import pizzaCatalog from '@/data/pizza.catalog.json';
import snacksCatalog from '@/data/snacks.catalog.json';
type SetItem = {
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
  image: string;
  productUrl?: string;
  ingredients: string[];
  allergens: string[];
  isNew?: boolean;
  isHit?: boolean;
  oldPrice?: number;
  economy?: number;
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
    "id": "98",
    "name": "Ролл Огурец",
    "description": "Рис, Нори, Огурец, Кунжут",
    "price": 110,
    "weight": "115 гр",
    "pieces": "6 шт",
    "calories": 112,
    "category": "rolls",
    "image": "/Роллы-все_files/4f9626b346-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Огурец",
      "Кунжут"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-ogurec",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "111",
    "name": "Ролл Такуан",
    "description": "Рис, Нори, Маринованная редька",
    "price": 120,
    "weight": "110 гр",
    "pieces": "6 шт",
    "calories": 98,
    "category": "rolls",
    "image": "/Роллы-все_files/836a2867b1-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Маринованная редька"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-takuan",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "87",
    "name": "Ролл Краб",
    "description": "Рис, Нори, Имитация краба",
    "price": 150,
    "weight": "110 гр",
    "pieces": "6 шт",
    "calories": 113,
    "category": "rolls",
    "image": "/Роллы-все_files/1d63db59f9-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Имитация краба"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-krab",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "188",
    "name": "Ролл Копченая курица",
    "description": "Рис, Нори, Спайси соус, Копченая курица",
    "price": 160,
    "weight": "115 гр",
    "pieces": "6 шт",
    "category": "rolls",
    "image": "/Роллы-все_files/dca5ea4c65-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Спайси соус",
      "Копченая курица"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-kopcenaa-kurica",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "266",
    "name": "ролл Копченая курица",
    "description": "Рис, Нори, Спайси, Копченая курица",
    "price": 160,
    "weight": "110 гр",
    "pieces": "6 шт",
    "category": "rolls",
    "image": "/Роллы-все_files/635f9b23c9-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Спайси",
      "Копченая курица"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-roll-kopcenaa-kurica",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "108",
    "name": "Ролл Сыр",
    "description": "Рис, Нори, Сыр Буко",
    "price": 170,
    "weight": "110 гр",
    "pieces": "6 шт",
    "calories": 145,
    "category": "rolls",
    "image": "/Роллы-все_files/e8c91b556d-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Сыр Буко"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-syr",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "120",
    "name": "Ролл Чука",
    "description": "Рис, Нори, Чука салат",
    "price": 200,
    "weight": "115 гр",
    "pieces": "6 шт",
    "calories": 117,
    "category": "rolls",
    "image": "/Роллы-все_files/9109fe48d3-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Чука салат"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-cuka",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "124",
    "name": "Ролл Эсколар",
    "description": "Рис, Нори, Масляная рыба",
    "price": 200,
    "weight": "110 гр",
    "pieces": "6 шт",
    "calories": 137,
    "category": "rolls",
    "image": "/Роллы-все_files/b5af013c8a-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Масляная рыба"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-eskolar",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "88",
    "name": "Ролл Красная Тобико",
    "description": "Рис, Нори, Тобико красная",
    "price": 220,
    "weight": "110 гр",
    "pieces": "6 шт",
    "calories": 105,
    "category": "rolls",
    "image": "/Роллы-все_files/8a8560c161-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Тобико красная"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-krasnaa-tobiko",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "89",
    "name": "Ролл Креветка",
    "description": "Рис, Нори, Креветка",
    "price": 220,
    "weight": "110 гр",
    "pieces": "6 шт",
    "calories": 115,
    "category": "rolls",
    "image": "/Роллы-все_files/ed85a7c0cc-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Креветка"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-krevetka",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "90",
    "name": "Ролл Лосось",
    "description": "Рис, Нори, Лосось",
    "price": 220,
    "weight": "110 гр",
    "pieces": "6 шт",
    "calories": 115,
    "category": "rolls",
    "image": "/Роллы-все_files/0ccfc9b689-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Лосось"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-losos",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "100",
    "name": "Ролл Острые с креветкой",
    "description": "Рис, Нори, Креветка, Спайси соус",
    "price": 250,
    "weight": "110 гр",
    "pieces": "6 шт",
    "calories": 115,
    "category": "rolls",
    "image": "/Роллы-все_files/a3e0d7d0ec-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Креветка",
      "Спайси соус"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-ostrye-s-krevetkoj",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "109",
    "name": "Ролл Сыр + Лосось",
    "description": "Рис, Нори, Сыр Буко, Лосось",
    "price": 250,
    "weight": "110 гр",
    "pieces": "6 шт",
    "calories": 152,
    "category": "rolls",
    "image": "/Роллы-все_files/fc40cbc5d6-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Сыр Буко",
      "Лосось"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-syr-losos",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "186",
    "name": "Ролл Острые с лососем",
    "description": "Рис, Нори, Лосось, Спайси соус",
    "price": 250,
    "weight": "110 гр",
    "pieces": "6 шт",
    "category": "rolls",
    "image": "/Роллы-все_files/991bece293-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Лосось",
      "Спайси соус"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-ostrye-s-lososem",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "187",
    "name": "Ролл Острые с крабом",
    "description": "Рис, Нори, Спайси соус, Имитация краба",
    "price": 250,
    "weight": "110 гр",
    "pieces": "6 шт",
    "category": "rolls",
    "image": "/Роллы-все_files/85bcbe98b0-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Спайси соус",
      "Имитация краба"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-ostrye-s-krabom",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "203",
    "name": "Ролл Острые с угрем",
    "description": "Рис, Нори, Угорь, Спайси соус",
    "price": 250,
    "weight": "",
    "pieces": "6 шт",
    "category": "rolls",
    "image": "/Роллы-все_files/41d99cd1ea-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Угорь",
      "Спайси соус"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-ostrye-s-ugrem",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "97",
    "name": "Ролл Овощной",
    "description": "Рис, Нори, Огурец, Кунжут, Паприка, Помидор",
    "price": 270,
    "weight": "205 гр",
    "pieces": "8 шт",
    "calories": 261,
    "category": "rolls",
    "image": "/Роллы-все_files/15d1ddcc8c-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Огурец",
      "Кунжут",
      "Паприка",
      "Помидор"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-ovosnoj",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "112",
    "name": "Ролл Угорь",
    "description": "Рис, Нори, Угорь, Кунжут",
    "price": 270,
    "weight": "115 гр",
    "pieces": "6 шт",
    "calories": 191,
    "category": "rolls",
    "image": "/Роллы-все_files/21759e0593-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Угорь",
      "Кунжут"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-ugor",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "204",
    "name": "Ролл Шиитаке с сыром",
    "description": "Рис, Нори, Огурец, Сыр Буко, Грибы Шиитаке",
    "price": 290,
    "weight": "200 гр",
    "pieces": "8 шт",
    "category": "rolls",
    "image": "/Роллы-все_files/c023880984-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Огурец",
      "Сыр Буко",
      "Грибы Шиитаке"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-siitake-s-syrom",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "70",
    "name": "Ролл CHINA",
    "description": "Рис, Нори, Огурец, Масляная рыба, Кунжут, Перец болгарский",
    "price": 320,
    "weight": "185 гр",
    "pieces": "8 шт",
    "calories": 196,
    "category": "rolls",
    "image": "/Роллы-все_files/01ef702bc5-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Огурец",
      "Масляная рыба",
      "Кунжут",
      "Перец болгарский"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-china",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "91",
    "name": "Ролл Лосось-Огурец",
    "description": "Рис, Нори, Огурец, Лосось, Кунжут",
    "price": 330,
    "weight": "190 гр",
    "pieces": "8 шт",
    "calories": 226,
    "category": "rolls",
    "image": "/Роллы-все_files/08ef6f4699-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Огурец",
      "Лосось",
      "Кунжут"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-losos-ogurec",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "119",
    "name": "Ролл Чикен",
    "description": "Рис, Нори, Огурец, Курица, Спайси соус",
    "price": 330,
    "weight": "200 гр",
    "pieces": "8 шт",
    "calories": 257,
    "category": "rolls",
    "image": "/Роллы-все_files/a17dd93e12-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Огурец",
      "Курица",
      "Спайси соус"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-ciken",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "116",
    "name": "Ролл Фреш",
    "description": "Рис, Нори, Огурец, Сыр Буко, Лосось, Паприка",
    "price": 340,
    "weight": "220 гр",
    "pieces": "8 шт",
    "calories": 240,
    "category": "rolls",
    "image": "/Роллы-все_files/070d2fd4fb-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Огурец",
      "Сыр Буко",
      "Лосось",
      "Паприка"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-fres",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "257",
    "name": "Ролл Тортилья с копченой курицей",
    "description": "Помидор, Сыр, Копченая курица, Соленые огурцы, Тортилья",
    "price": 340,
    "weight": "175 гр",
    "pieces": "8 шт",
    "category": "rolls",
    "image": "/Роллы-все_files/52b4fb5a91-1_184.jpg",
    "ingredients": [
      "Помидор",
      "Сыр",
      "Копченая курица",
      "Соленые огурцы",
      "Тортилья"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-tortila-s-kopcenoj-kuricej",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "258",
    "name": "Ролл Тортилья с крабом",
    "description": "Помидор, Сыр, Тортилья, салат асберг, Имитация краба",
    "price": 340,
    "weight": "175 гр",
    "pieces": "8 шт",
    "category": "rolls",
    "image": "/Роллы-все_files/a380725a31-1_184.jpg",
    "ingredients": [
      "Помидор",
      "Сыр",
      "Тортилья",
      "салат асберг",
      "Имитация краба"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-tortila-s-krabom",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "20",
    "name": "Ролл Сейшн",
    "description": "Рис, Нори, Огурец, Масаго, Сыр Буко, Масляная рыба",
    "price": 350,
    "weight": "205 гр",
    "pieces": "8 шт",
    "category": "rolls",
    "image": "/Роллы-все_files/ad91c6649b-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Огурец",
      "Масаго",
      "Сыр Буко",
      "Масляная рыба"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-sejsn",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "73",
    "name": "Ролл Татами",
    "description": "Рис, Нори, Тобико красная, Огурец, Масляная рыба, Спайси соус",
    "price": 350,
    "weight": "210 гр",
    "pieces": "8 шт",
    "category": "rolls",
    "image": "/Роллы-все_files/46e7c04c21-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Тобико красная",
      "Огурец",
      "Масляная рыба",
      "Спайси соус"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-tatami",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "80",
    "name": "Ролл За всё",
    "description": "Рис, Нори, Тобико красная, Огурец, Курица, Спайси соус",
    "price": 350,
    "weight": "205 гр",
    "pieces": "8 шт",
    "calories": 186,
    "category": "rolls",
    "image": "/Роллы-все_files/691cc4aa35-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Тобико красная",
      "Огурец",
      "Курица",
      "Спайси соус"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-za-vse",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "82",
    "name": "Ролл Калифорния",
    "description": "Рис, Нори, Огурец, Масаго, Майонез, Имитация краба",
    "price": 350,
    "weight": "225 гр",
    "pieces": "8 шт",
    "calories": 256,
    "category": "rolls",
    "image": "/Роллы-все_files/dc2f3fe7fe-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Огурец",
      "Масаго",
      "Майонез",
      "Имитация краба"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-kalifornia",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "94",
    "name": "Ролл Нежный",
    "description": "Рис, Нори, Тобико красная, Яблоко, Сыр",
    "price": 350,
    "weight": "205 гр",
    "pieces": "8 шт",
    "calories": 196,
    "category": "rolls",
    "image": "/Роллы-все_files/e72f6a0b9d-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Тобико красная",
      "Яблоко",
      "Сыр"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-neznyj",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "115",
    "name": "Ролл Филадельфия спешл",
    "description": "Рис, Нори, Огурец, Сыр Буко, Лосось, Кунжут",
    "price": 350,
    "weight": "195 гр",
    "pieces": "8 шт",
    "calories": 245,
    "category": "rolls",
    "image": "/Роллы-все_files/9a90da4e4c-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Огурец",
      "Сыр Буко",
      "Лосось",
      "Кунжут"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-filadelfia-spesl",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "307",
    "name": "Ролл Снежинка",
    "description": "Рис, Нори, Кунжут, Сыр моцарелла, Сыр, такуан",
    "price": 350,
    "weight": "250 гр",
    "pieces": "8 шт",
    "category": "rolls",
    "image": "/Роллы-все_files/3b1d54bba1-1_184.jpg",
    "ingredients": [
      "Рис",
      "Нори",
      "Кунжут",
      "Сыр моцарелла",
      "Сыр",
      "такуан"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-roll-snezinka",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "77",
    "name": "Ролл Гейша",
    "description": "Рис, Нори, Тобико красная, Огурец, Сыр Буко, Лосось",
    "price": 360,
    "weight": "145 гр",
    "pieces": "4 шт",
    "calories": 219,
    "category": "rolls",
    "image": "/Роллы-все_files/b9eee64cde-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Тобико красная",
      "Огурец",
      "Сыр Буко",
      "Лосось"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-gejsa",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "161",
    "name": "Ролл Шиитаке с сыром (Запеченный)",
    "description": "Рис, Нори, Сыр Буко, Грибы Шиитаке, Сыр моцарелла",
    "price": 360,
    "weight": "250 гр",
    "pieces": "8 шт",
    "category": "rolls",
    "image": "/Роллы-все_files/d2868ef556-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Сыр Буко",
      "Грибы Шиитаке",
      "Сыр моцарелла"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-siitake-s-syrom-zapecennyj",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "252",
    "name": "Ролл Тортилья с крабом (горячие)",
    "description": "Помидор, Сыр, Тортилья, салат асберг, Имитация краба",
    "price": 360,
    "weight": "200 гр",
    "pieces": "8 шт",
    "category": "rolls",
    "image": "/Роллы-все_files/8b35129fe5-1_184.jpg",
    "ingredients": [
      "Помидор",
      "Сыр",
      "Тортилья",
      "салат асберг",
      "Имитация краба"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-tortila-s-krabom-goracie",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "253",
    "name": "Ролл Тортилья с копченой курицей (горячие)",
    "description": "Помидор, Сыр, Копченая курица, Соленые огурцы, Тортилья",
    "price": 360,
    "weight": "200 гр",
    "pieces": "8 шт",
    "category": "rolls",
    "image": "/Роллы-все_files/efb6249d25-1_184.jpg",
    "ingredients": [
      "Помидор",
      "Сыр",
      "Копченая курица",
      "Соленые огурцы",
      "Тортилья"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-tortila-s-kopcenoj-kuricej-goracie",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "162",
    "name": "Ролл Чикен (Запеченный)",
    "description": "Рис, Нори, Курица, Спайси соус, Сыр моцарелла",
    "price": 370,
    "weight": "250 гр",
    "pieces": "8 шт",
    "category": "rolls",
    "image": "/Роллы-все_files/c105a27fb9-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Курица",
      "Спайси соус",
      "Сыр моцарелла"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-ciken-zapecennyj",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "255",
    "name": "Ролл Тортилья с креветкой",
    "description": "Креветка, Помидор, Сыр, Тортилья, салат асберг",
    "price": 370,
    "weight": "175 гр",
    "pieces": "8 шт",
    "category": "rolls",
    "image": "/Роллы-все_files/f20450b27a-1_184.jpg",
    "ingredients": [
      "Креветка",
      "Помидор",
      "Сыр",
      "Тортилья",
      "салат асберг"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-tortila-s-krevetkoj",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "104",
    "name": "Ролл Овара",
    "description": "Рис, Нори, Огурец, Масаго, Кунжут, Майонез, Жаренный лосось",
    "price": 380,
    "weight": "200 гр",
    "pieces": "8 шт",
    "calories": 266,
    "category": "rolls",
    "image": "/Роллы-все_files/6e5f4d34ad-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Огурец",
      "Масаго",
      "Кунжут",
      "Майонез",
      "Жаренный лосось"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-ovara",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "156",
    "name": "Ролл Сыр-лосось (Запеченный)",
    "description": "Рис, Нори, Сыр Буко, Лосось, Сыр моцарелла",
    "price": 380,
    "weight": "",
    "pieces": "8 шт",
    "category": "rolls",
    "image": "/Роллы-все_files/ca64cfe309-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Сыр Буко",
      "Лосось",
      "Сыр моцарелла"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-syr-losos-zapecennyj",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "256",
    "name": "Ролл Тортилья с лососем",
    "description": "Лосось, Помидор, Сыр, Тортилья, салат асберг",
    "price": 370,
    "weight": "175 гр",
    "pieces": "8 шт",
    "category": "rolls",
    "image": "/Роллы-все_files/87cfaeec78-1_184.jpg",
    "ingredients": [
      "Лосось",
      "Помидор",
      "Сыр",
      "Тортилья",
      "салат асберг"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-tortila-s-lososem",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "213",
    "name": "Ролл С Копченой курицей (Горячие)",
    "description": "Рис, Нори, Сыр Буко, Копченая курица",
    "price": 390,
    "weight": "250 гр",
    "pieces": "8 шт",
    "category": "rolls",
    "image": "/Роллы-все_files/8380a34006-1_184.jpg",
    "ingredients": [
      "Рис",
      "Нори",
      "Сыр Буко",
      "Копченая курица"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-s-kopcenoj-kuricej-goracie",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "230",
    "name": "Ролл Запеченный с беконом",
    "description": "Рис, Нори, Сыр Буко, Бекон, Сыр моцарелла",
    "price": 390,
    "weight": "250 гр",
    "pieces": "8 шт",
    "category": "rolls",
    "image": "/Роллы-все_files/6c9ea6c01b-1_184.jpg",
    "ingredients": [
      "Рис",
      "Нори",
      "Сыр Буко",
      "Бекон",
      "Сыр моцарелла"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-zapecennyj-s-bekonom",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "250",
    "name": "Ролл Овара (запеченный)",
    "description": "Рис, Нори, Огурец, Сыр Буко, Кунжут, Жаренный лосось, Сыр",
    "price": 390,
    "weight": "250 гр",
    "pieces": "8 шт",
    "category": "rolls",
    "image": "/Роллы-все_files/03f32f77b5-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Огурец",
      "Сыр Буко",
      "Кунжут",
      "Жаренный лосось",
      "Сыр"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-ovara-zapecennyj",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "95",
    "name": "Ролл Норвежский",
    "description": "Рис, Нори, Огурец, Сыр Буко, Лосось, Стружка тунца",
    "price": 410,
    "weight": "200 гр",
    "pieces": "8 шт",
    "calories": 235,
    "category": "rolls",
    "image": "/Роллы-все_files/ea9572bfea-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Огурец",
      "Сыр Буко",
      "Лосось",
      "Стружка тунца"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-norvezskij",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "84",
    "name": "Ролл Калифорния с лососем",
    "description": "Рис, Нори, Тобико красная, Лосось, Майонез",
    "price": 420,
    "weight": "205 гр",
    "pieces": "8 шт",
    "calories": 257,
    "category": "rolls",
    "image": "/Роллы-все_files/ece989bc8e-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Тобико красная",
      "Лосось",
      "Майонез"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-kalifornia-s-lososem",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "101",
    "name": "Ролл По-русски",
    "description": "Рис, Нори, Огурец, Паприка, Майонез, Бекон, Помидор",
    "price": 420,
    "weight": "235 гр",
    "pieces": "8 шт",
    "calories": 401,
    "category": "rolls",
    "image": "/Роллы-все_files/9a3a9587b2-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Огурец",
      "Паприка",
      "Майонез",
      "Бекон",
      "Помидор"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-po-russki",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "154",
    "name": "Ролл Калифорния(Запеченный)",
    "description": "Рис, Нори, Огурец, Масаго, Майонез, Сыр моцарелла, Имитация краба",
    "price": 420,
    "weight": "250 гр",
    "pieces": "8 шт",
    "category": "rolls",
    "image": "/Роллы-все_files/90bac5b303-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Огурец",
      "Масаго",
      "Майонез",
      "Сыр моцарелла",
      "Имитация краба"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-kaliforniazapecennyj",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "228",
    "name": "Ролл Запеченный с креветкой",
    "description": "Рис, Нори, Огурец, Креветка, Сыр Буко, Сыр моцарелла",
    "price": 420,
    "weight": "250 гр",
    "pieces": "8 шт",
    "category": "rolls",
    "image": "/Роллы-все_files/fd6fec7c70-1_184.jpg",
    "ingredients": [
      "Рис",
      "Нори",
      "Огурец",
      "Креветка",
      "Сыр Буко",
      "Сыр моцарелла"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-zapecennyj-s-krevetkoj",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "93",
    "name": "Ролл Мексиканский",
    "description": "Рис, Нори, Огурец, Креветка, Масаго, Спайси соус",
    "price": 430,
    "weight": "210 гр",
    "pieces": "8 шт",
    "calories": 250,
    "category": "rolls",
    "image": "/Роллы-все_files/9602fd0853-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Огурец",
      "Креветка",
      "Масаго",
      "Спайси соус"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-meksikanskij",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "160",
    "name": "Ролл Филадельфия спешл (Запеченный)",
    "description": "Рис, Нори, Огурец, Сыр Буко, Лосось, Кунжут, Сыр моцарелла",
    "price": 430,
    "weight": "250 гр",
    "pieces": "8 шт",
    "category": "rolls",
    "image": "/Роллы-все_files/a71a30c060-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Огурец",
      "Сыр Буко",
      "Лосось",
      "Кунжут",
      "Сыр моцарелла"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-filadelfia-spesl-zapecennyj",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "251",
    "name": "Ролл Тортилья с креветкой (горячий)",
    "description": "Креветка, Помидор, Сыр, Тортилья, салат асберг",
    "price": 430,
    "weight": "200 гр",
    "pieces": "8 шт",
    "category": "rolls",
    "image": "/Роллы-все_files/53fa9f7b0b-1_184.jpg",
    "ingredients": [
      "Креветка",
      "Помидор",
      "Сыр",
      "Тортилья",
      "салат асберг"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-tortila-s-krevetkoj-goracij",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "254",
    "name": "Ролл Тортилья с лососем (горячий)",
    "description": "Лосось, Помидор, Сыр, Тортилья, салат асберг",
    "price": 430,
    "weight": "200 гр",
    "pieces": "8 шт",
    "category": "rolls",
    "image": "/Роллы-все_files/b0f5a6f373-1_184.jpg",
    "ingredients": [
      "Лосось",
      "Помидор",
      "Сыр",
      "Тортилья",
      "салат асберг"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-tortila-s-lososem-goracij",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "75",
    "name": "Ролл Бонито",
    "description": "Рис, Нори, Угорь, Огурец, Стружка тунца, Спайси соус",
    "price": 440,
    "weight": "195 гр",
    "pieces": "8 шт",
    "calories": 277,
    "category": "rolls",
    "image": "/Роллы-все_files/c08b87413e-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Угорь",
      "Огурец",
      "Стружка тунца",
      "Спайси соус"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-bonito",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "79",
    "name": "Ролл Евразия",
    "description": "Рис, Нори, Тобико красная, Креветка, Сыр Буко, Паприка",
    "price": 440,
    "weight": "215 гр",
    "pieces": "8 шт",
    "calories": 198,
    "category": "rolls",
    "image": "/Роллы-все_files/db05d7cd08-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Тобико красная",
      "Креветка",
      "Сыр Буко",
      "Паприка"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-evrazia",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "83",
    "name": "Ролл Калифорния с креветкой",
    "description": "Рис, Нори, Тобико красная, Огурец, Креветка, Майонез",
    "price": 440,
    "weight": "205 гр",
    "pieces": "8 шт",
    "calories": 221,
    "category": "rolls",
    "image": "/Роллы-все_files/6731bbffe3-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Тобико красная",
      "Огурец",
      "Креветка",
      "Майонез"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-kalifornia-s-krevetkoj",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "99",
    "name": "Ролл Окинава",
    "description": "Рис, Нори, Огурец, Креветка, Масаго, Сыр Буко",
    "price": 440,
    "weight": "200 гр",
    "pieces": "8 шт",
    "calories": 200,
    "category": "rolls",
    "image": "/Роллы-все_files/34a22dba35-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Огурец",
      "Креветка",
      "Масаго",
      "Сыр Буко"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-okinava",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "146",
    "name": "Ролл Острый лосось (Горячие)",
    "description": "Рис, Нори, Огурец, Лосось, Спайси соус, Паприка, Сыр",
    "price": 440,
    "weight": "210 гр",
    "pieces": "8 шт",
    "category": "rolls",
    "image": "/Роллы-все_files/a0cd1afb49-1_184.jpg",
    "ingredients": [
      "Рис",
      "Нори",
      "Огурец",
      "Лосось",
      "Спайси соус",
      "Паприка",
      "Сыр"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-ostryj-losos-goracie",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "147",
    "name": "Ролл С беконом (Горячие)",
    "description": "Рис, Нори, Сыр Буко, Бекон, Перец",
    "price": 440,
    "weight": "250 гр",
    "pieces": "8 шт",
    "category": "rolls",
    "image": "/Роллы-все_files/a20d5175e7-1_184.jpg",
    "ingredients": [
      "Рис",
      "Нори",
      "Сыр Буко",
      "Бекон",
      "Перец"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-s-bekonom-goracie",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "229",
    "name": "Ролл Вулкан запеченный",
    "description": "Рис, Нори, Огурец, Креветка, Сыр Буко, Кунжут, Сыр моцарелла",
    "price": 440,
    "weight": "250 гр",
    "pieces": "8 шт",
    "category": "rolls",
    "image": "/Роллы-все_files/7248b2117e-1_184.jpg",
    "ingredients": [
      "Рис",
      "Нори",
      "Огурец",
      "Креветка",
      "Сыр Буко",
      "Кунжут",
      "Сыр моцарелла"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-vulkan-zapecennyj",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "231",
    "name": "Ролл Запеченный в стружке тунца",
    "description": "Рис, Нори, Огурец, Сыр Буко, Лосось, Стружка тунца, Спайси соус, Сыр моцарелла",
    "price": 440,
    "weight": "250 гр",
    "pieces": "8 шт",
    "category": "rolls",
    "image": "/Роллы-все_files/3d1ecfbd8e-1_184.jpg",
    "ingredients": [
      "Рис",
      "Нори",
      "Огурец",
      "Сыр Буко",
      "Лосось",
      "Стружка тунца",
      "Спайси соус",
      "Сыр моцарелла"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-zapecennyj-v-struzke-tunca",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "92",
    "name": "Ролл Майами",
    "description": "Рис, Нори, Угорь, Тобико красная, Сыр Буко, Яблоко",
    "price": 450,
    "weight": "220 гр",
    "pieces": "8 шт",
    "calories": 330,
    "category": "rolls",
    "image": "/Роллы-все_files/6d66b17f82-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Угорь",
      "Тобико красная",
      "Сыр Буко",
      "Яблоко"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-majami",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "85",
    "name": "Ролл Калифорния с угрем",
    "description": "Рис, Нори, Угорь, Тобико красная, Огурец, Майонез",
    "price": 470,
    "weight": "205 гр",
    "pieces": "8 шт",
    "calories": 267,
    "category": "rolls",
    "image": "/Роллы-все_files/7a5e250749-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Угорь",
      "Тобико красная",
      "Огурец",
      "Майонез"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-kalifornia-s-ugrem",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "150",
    "name": "Ролл С креветкой (Горячие)",
    "description": "Рис, Нори, Огурец, Креветка, Паприка, Сыр",
    "price": 470,
    "weight": "250 гр",
    "pieces": "8 шт",
    "category": "rolls",
    "image": "/Роллы-все_files/c2ece74eb5-1_184.jpg",
    "ingredients": [
      "Рис",
      "Нори",
      "Огурец",
      "Креветка",
      "Паприка",
      "Сыр"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-s-krevetkoj-goracie",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "145",
    "name": "Ролл Нептун (Горячие)",
    "description": "Рис, Нори, Угорь, Огурец, Креветка, Паприка, Сыр",
    "price": 490,
    "weight": "250 гр",
    "pieces": "",
    "category": "rolls",
    "image": "/Роллы-все_files/23e4565b32-1_184.jpg",
    "ingredients": [
      "Рис",
      "Нори",
      "Угорь",
      "Огурец",
      "Креветка",
      "Паприка",
      "Сыр"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-neptun-goracie",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "148",
    "name": "Ролл Лосось с сыром (Горячие)",
    "description": "Рис, Нори, Огурец, Лосось, Паприка, Сыр",
    "price": 490,
    "weight": "250 гр",
    "pieces": "8 шт",
    "category": "rolls",
    "image": "/Роллы-все_files/b5f5bdd9df-1_184.jpg",
    "ingredients": [
      "Рис",
      "Нори",
      "Огурец",
      "Лосось",
      "Паприка",
      "Сыр"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-losos-s-syrom-goracie",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "155",
    "name": "Ролл Окинава (Запеченный)",
    "description": "Рис, Нори, Огурец, Креветка, Масаго, Сыр Буко, Сыр моцарелла",
    "price": 490,
    "weight": "250 гр",
    "pieces": "8 шт",
    "category": "rolls",
    "image": "/Роллы-все_files/a877c5e61d-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Огурец",
      "Креветка",
      "Масаго",
      "Сыр Буко",
      "Сыр моцарелла"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-okinava-zapecennyj",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "227",
    "name": "Ролл Мексиканский запеченный",
    "description": "Нори, Огурец, Креветка, Масаго, Спайси соус, Сыр моцарелла",
    "price": 490,
    "weight": "250 гр",
    "pieces": "8 шт",
    "category": "rolls",
    "image": "/Роллы-все_files/9d51d6381d-1_184.jpg",
    "ingredients": [
      "Нори",
      "Огурец",
      "Креветка",
      "Масаго",
      "Спайси соус",
      "Сыр моцарелла"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-meksikanskij-zapecennyj",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "103",
    "name": "Ролл Рок-н-Ролл",
    "description": "Рис, Нори, Угорь, Тобико красная, Сыр Буко, Лосось",
    "price": 499,
    "weight": "235 гр",
    "pieces": "8 шт",
    "calories": 274,
    "category": "rolls",
    "image": "/Роллы-все_files/0539a588bf-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Угорь",
      "Тобико красная",
      "Сыр Буко",
      "Лосось"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-rok-n-roll",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "106",
    "name": "Ролл Самурай",
    "description": "Рис, Нори, Огурец, Сыр Буко, Лосось",
    "price": 499,
    "weight": "215 гр",
    "pieces": "8 шт",
    "calories": 289,
    "category": "rolls",
    "image": "/Роллы-все_files/fef1e5e04e-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Огурец",
      "Сыр Буко",
      "Лосось"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-samuraj",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "114",
    "name": "Ролл Филадельфия с угрем",
    "description": "Рис, Нори, Угорь, Огурец, Сыр Буко, Кунжут",
    "price": 499,
    "weight": "195 гр",
    "pieces": "8 шт",
    "calories": 253,
    "category": "rolls",
    "image": "/Роллы-все_files/6775392f1b-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Угорь",
      "Огурец",
      "Сыр Буко",
      "Кунжут"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-filadelfia-s-ugrem",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "125",
    "name": "Ролл Ямайка",
    "description": "Рис, Нори, Огурец, Масаго, Сыр Буко, Лосось",
    "price": 499,
    "weight": "220 гр",
    "pieces": "8 шт",
    "calories": 248,
    "category": "rolls",
    "image": "/Роллы-все_files/330d382bbf-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Огурец",
      "Масаго",
      "Сыр Буко",
      "Лосось"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-amajka",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "117",
    "name": "Ролл Чиз лосось",
    "description": "Рис, Нори, Сыр Буко, Лосось",
    "price": 500,
    "weight": "220 гр",
    "pieces": "8 шт",
    "calories": 303,
    "category": "rolls",
    "image": "/Роллы-все_files/2c49d4dae1-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Сыр Буко",
      "Лосось"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-ciz-losos",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "149",
    "name": "Ролл С угрем (Горячие)",
    "description": "Рис, Нори, Угорь, Огурец, Паприка, Сыр, Соус унаги",
    "price": 500,
    "weight": "250 гр",
    "pieces": "8 шт",
    "category": "rolls",
    "image": "/Роллы-все_files/1687d6e26d-1_184.jpg",
    "ingredients": [
      "Рис",
      "Нори",
      "Угорь",
      "Огурец",
      "Паприка",
      "Сыр",
      "Соус унаги"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-s-ugrem-goracie",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "157",
    "name": "Ролл Сливочный (Запеченный)",
    "description": "Рис, Нори, Огурец, Масаго, Сыр Буко, Лосось, Спайси соус, Сыр моцарелла",
    "price": 490,
    "weight": "250 гр",
    "pieces": "8 шт",
    "category": "rolls",
    "image": "/Роллы-все_files/2e9c034c7d-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Огурец",
      "Масаго",
      "Сыр Буко",
      "Лосось",
      "Спайси соус",
      "Сыр моцарелла"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-slivocnyj-zapecennyj",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "74",
    "name": "Ролл Атлантический",
    "description": "Рис, Нори, Угорь, Масаго, Сыр Буко, Лосось, Кунжут",
    "price": 530,
    "weight": "210 гр",
    "pieces": "8 шт",
    "calories": 310,
    "category": "rolls",
    "image": "/Роллы-все_files/b98e125595-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Угорь",
      "Масаго",
      "Сыр Буко",
      "Лосось",
      "Кунжут"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-atlanticeskij",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "72",
    "name": "Ролл Romantic",
    "description": "Рис, Нори, Тобико красная, Огурец, Сыр Буко, Икра лосося",
    "price": 540,
    "weight": "230 гр",
    "pieces": "8 шт",
    "calories": 258,
    "category": "rolls",
    "image": "/Роллы-все_files/ab5f733975-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Тобико красная",
      "Огурец",
      "Сыр Буко",
      "Икра лосося"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-romantic",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "105",
    "name": "Ролл Люкс",
    "description": "Рис, Нори, Огурец, Лосось, Лосось спайси",
    "price": 540,
    "weight": "220 гр",
    "pieces": "8 шт",
    "calories": 338,
    "category": "rolls",
    "image": "/Роллы-все_files/56c03064e3-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Огурец",
      "Лосось",
      "Лосось спайси"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-luks",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "153",
    "name": "Ролл Rock-n-Roll (запеченный)",
    "description": "Рис, Угорь, Тобико красная, Огурец, Лосось, Сыр моцарелла, Сыр",
    "price": 540,
    "weight": "250 гр",
    "pieces": "8 шт",
    "category": "rolls",
    "image": "/Роллы-все_files/4dce028797-1_184.png",
    "ingredients": [
      "Рис",
      "Угорь",
      "Тобико красная",
      "Огурец",
      "Лосось",
      "Сыр моцарелла",
      "Сыр"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-rock-n-roll-zapecennyj",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "71",
    "name": "Ролл Prado Roll",
    "description": "Рис, Нори, Огурец, Сыр Буко, Лосось, Икра лосося",
    "price": 550,
    "weight": "240 гр",
    "pieces": "8 шт",
    "category": "rolls",
    "image": "/Роллы-все_files/e0ee5eccd4-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Огурец",
      "Сыр Буко",
      "Лосось",
      "Икра лосося"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-prado-roll",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "96",
    "name": "Ролл Нью-Йорк",
    "description": "Рис, Нори, Лосось, Икра лосося, Сыр",
    "price": 550,
    "weight": "210 гр",
    "pieces": "8 шт",
    "calories": 235,
    "category": "rolls",
    "image": "/Роллы-все_files/61fdfb8f32-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Лосось",
      "Икра лосося",
      "Сыр"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-nu-jork",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "159",
    "name": "Ролл Филадельфия с угрем (Запеченный)",
    "description": "Рис, Нори, Угорь, Огурец, Сыр Буко, Кунжут, Сыр моцарелла",
    "price": 550,
    "weight": "250 гр",
    "pieces": "8 шт",
    "category": "rolls",
    "image": "/Роллы-все_files/bfb830b536-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Угорь",
      "Огурец",
      "Сыр Буко",
      "Кунжут",
      "Сыр моцарелла"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-filadelfia-s-ugrem-zapecennyj",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "163",
    "name": "Ролл Ямайка (Запеченный)",
    "description": "Рис, Нори, Огурец, Масаго, Сыр Буко, Лосось, Сыр моцарелла",
    "price": 550,
    "weight": "250 гр",
    "pieces": "8 шт",
    "category": "rolls",
    "image": "/Роллы-все_files/83c2113c0f-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Огурец",
      "Масаго",
      "Сыр Буко",
      "Лосось",
      "Сыр моцарелла"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-amajka-zapecennyj",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "131",
    "name": "Ролл Филадельфия с креветкой",
    "description": "Рис, Нори, Огурец, Креветка, Сыр Буко, Лосось",
    "price": 600,
    "weight": "230 гр",
    "pieces": "8 шт",
    "category": "rolls",
    "image": "/Роллы-все_files/8537649d06-1_184.jpg",
    "ingredients": [
      "Рис",
      "Нори",
      "Огурец",
      "Креветка",
      "Сыр Буко",
      "Лосось"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-filadelfia-s-krevetkoj",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "118",
    "name": "Ролл Чиз угорь",
    "description": "Рис, Нори, Угорь, Сыр Буко, Кунжут",
    "price": 600,
    "weight": "225 гр",
    "pieces": "8 шт",
    "calories": 341,
    "category": "rolls",
    "image": "/Роллы-все_files/37adac474f-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Угорь",
      "Сыр Буко",
      "Кунжут"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-ciz-ugor",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "78",
    "name": "Ролл Дракон",
    "description": "Рис, Нори, Угорь, Огурец, Сыр Буко, Лосось, Кунжут",
    "price": 660,
    "weight": "240 гр",
    "pieces": "8 шт",
    "calories": 266,
    "category": "rolls",
    "image": "/Роллы-все_files/5d4524dd35-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Угорь",
      "Огурец",
      "Сыр Буко",
      "Лосось",
      "Кунжут"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-drakon",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "113",
    "name": "Ролл Филадельфия",
    "description": "Рис, Угорь, Огурец, Сыр Буко, Лосось",
    "price": 660,
    "weight": "230 гр",
    "pieces": "8 шт",
    "calories": 339,
    "category": "rolls",
    "image": "/Роллы-все_files/fcf7bd041a-1_184.png",
    "ingredients": [
      "Рис",
      "Угорь",
      "Огурец",
      "Сыр Буко",
      "Лосось"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-filadelfia",
    "isNew": false,
    "isHit": false
  },
  {
    "id": "158",
    "name": "Ролл Филадельфия с креветкой (Запеченный)",
    "description": "Рис, Нори, Огурец, Креветка, Сыр Буко, Лосось, Кунжут, Сыр моцарелла",
    "price": 660,
    "weight": "250 гр",
    "pieces": "8 шт",
    "category": "rolls",
    "image": "/Роллы-все_files/21f3a7545c-1_184.png",
    "ingredients": [
      "Рис",
      "Нори",
      "Огурец",
      "Креветка",
      "Сыр Буко",
      "Лосось",
      "Кунжут",
      "Сыр моцарелла"
    ],
    "allergens": [],
    "productUrl": "https://xn--36-6kcaj8anzg.xn--p1ai/good/rolly-filadelfia-s-krevetkoj-zapecennyj",
    "isNew": false,
    "isHit": false
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
  const lower = `${p.name} ${p.description} ${(p.ingredients || []).join(' ')}`.toLowerCase();
  return /запеч|печен/i.test(lower);
};
const isTempuraProduct = (p: Product) => {
  const lower = `${p.name} ${p.description} ${(p.ingredients || []).join(' ')}`.toLowerCase();
  if (p.id === '104') return false;
  if (isBakedProduct(p)) return false;
  return /темпур|жарен|горяч/i.test(lower);
};

export const getProductsByCategory = (categoryId: string) => {
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
    snacksProducts.find((p) => p.id === id)
  );
};
