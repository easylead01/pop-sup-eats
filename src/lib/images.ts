import { Product } from '@/data/products';
import rollsCategoryImage from '@/assets/Роллы.jpg';
import rollsBakedCategoryImage from '@/assets/Запеченные роллы.jpg';
import tempuraRollsCategoryImage from '@/assets/Темпура Роллы.jpg';
import setsCategoryImage from '@/assets/Сеты.jpg';
import sushiCategoryImage from '@/assets/Суши.jpg';
import pizzaCategoryImage from '@/assets/Пицца.jpg';
import saladsCategoryImage from '@/assets/Салаты.jpg';
import wokCategoryImage from '@/assets/Лапша WOK.jpg';
import snacksCategoryImage from '@/assets/Закуски.jpg';
import saucesCategoryImage from '@/assets/Соусы.jpg';

const defaultProductImage = rollsCategoryImage;

export const productImages: Record<string, string> = {
  'sushi-salmon': sushiCategoryImage,
  'sushi-tuna': sushiCategoryImage,
};

export const categoryImages: Record<string, string> = {
  'cat-rolls': rollsCategoryImage,
  'cat-rolls-baked': rollsBakedCategoryImage,
  'cat-rolls-tempura': tempuraRollsCategoryImage,
  'cat-sets': setsCategoryImage,
  'cat-sushi': sushiCategoryImage,
  'cat-pizza': pizzaCategoryImage,
  'cat-salads': saladsCategoryImage,
  'cat-wok': wokCategoryImage,
  'cat-snacks': snacksCategoryImage,
  'cat-sauces': saucesCategoryImage,
};

export const getProductImage = (imageKey: string): string => {
  if (!imageKey) return defaultProductImage;
  if (imageKey.startsWith('http')) {
    return imageKey;
  }
  if (imageKey.startsWith('/')) {
    const base = import.meta.env.BASE_URL || '/';
    const url = `${base.replace(/\/$/, '')}/${imageKey.replace(/^\//, '')}`;
    return url;
  }
  if (imageKey.startsWith('.')) {
    return imageKey;
  }
  return productImages[imageKey] || defaultProductImage;
};

export const getProductImageForProduct = (product: Product): string => {
  const imageKey = product.image;
  if (!imageKey) return defaultProductImage;
  if (imageKey.startsWith('http')) return imageKey;
  if (imageKey.startsWith('/Роллы-все_files/')) {
    // Картинки роллов скачаны в public/Роллы-все_files — берём их из репозитория,
    // а не с окинава36.рф (там ссылки поменялись и часть фото перестала грузиться).
    const base = import.meta.env.BASE_URL || '/';
    return `${base.replace(/\/$/, '')}/${imageKey.replace(/^\//, '')}`;
  }
  if (imageKey.startsWith('/files/images/cache/')) {
    return `https://xn--36-6kcaj8anzg.xn--p1ai${imageKey}`;
  }
  if (imageKey.startsWith('/')) {
    const base = import.meta.env.BASE_URL || '/';
    return `${base.replace(/\/$/, '')}/${imageKey.replace(/^\//, '')}`;
  }
  if (imageKey.startsWith('.')) return imageKey;
  return productImages[imageKey] || defaultProductImage;
};

export const getCategoryImage = (imageKey: string): string => {
  return categoryImages[imageKey] || rollsCategoryImage;
};
