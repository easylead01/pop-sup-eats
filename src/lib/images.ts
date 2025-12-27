import rollPhiladelphia from '@/assets/roll-philadelphia.png';
import { Product } from '@/data/products';
import rollDragon from '@/assets/roll-dragon.png';
import rollCalifornia from '@/assets/roll-california.png';
import rollSpicyTuna from '@/assets/roll-spicy-tuna.png';
import rollCheeseSalmon from '@/assets/roll-cheese-salmon.png';
import rollAtlantic from '@/assets/roll-atlantic.png';
import sushiSalmon from '@/assets/sushi-salmon.png';
import sushiTuna from '@/assets/sushi-tuna.png';
import sushiEel from '@/assets/sushi-eel.png';
import sushiShrimp from '@/assets/sushi-shrimp.png';
import sushiOctopus from '@/assets/sushi-octopus.png';
import sushiTamago from '@/assets/sushi-tamago.png';
import sushiSet from '@/assets/sushi-set.png';
import sushiSetDuo from '@/assets/sushi-set-duo.png';
import sushiSetClassic from '@/assets/sushi-set-classic.png';
import sushiSetParty from '@/assets/sushi-set-party.png';
import sushiSetSampler from '@/assets/sushi-set-sampler.png';
import sushiSetMini from '@/assets/sushi-set-mini.png';
import wokNoodles from '@/assets/wok-noodles.png';
import wokShrimp from '@/assets/wok-shrimp.png';
import wokBeef from '@/assets/wok-beef.png';
import wokTofu from '@/assets/wok-tofu.png';
import wokPadThai from '@/assets/wok-pad-thai.png';
import wokSingapore from '@/assets/wok-singapore.png';
import soupMiso from '@/assets/soup-miso.png';
import pizzaPepperoni from '@/assets/pizza-pepperoni.png';
import pizzaMargherita from '@/assets/pizza-margherita.png';
import pizzaFourCheese from '@/assets/pizza-four-cheese.png';
import pizzaHawaiian from '@/assets/pizza-hawaiian.png';
import pizzaBbq from '@/assets/pizza-bbq.png';
import pizzaMushroom from '@/assets/pizza-mushroom.png';
import gyoza from '@/assets/gyoza.png';
import mochi from '@/assets/mochi.png';
import pokeBowl from '@/assets/poke-bowl.png';
import pokeTuna from '@/assets/poke-tuna.png';
import pokeShrimp from '@/assets/poke-shrimp.png';
import saladChuka from '@/assets/salad-chuka.png';
import saladChicken from '@/assets/salad-chicken.png';
import saladGlassNoodle from '@/assets/salad-glass-noodle.png';
import edamame from '@/assets/edamame.png';
import springRolls from '@/assets/spring-rolls.png';
import tempura from '@/assets/tempura.png';
import takoyaki from '@/assets/takoyaki.png';
import karaage from '@/assets/karaage.png';
import sauceSoy from '@/assets/sauce-soy.png';
import sauceSpicyMayo from '@/assets/sauce-spicy-mayo.png';
import sauceUnagi from '@/assets/sauce-unagi.png';
import sauceTeriyaki from '@/assets/sauce-teriyaki.png';
import sauceWasabi from '@/assets/sauce-wasabi.png';
import sauceGinger from '@/assets/sauce-ginger.png';

// Category images
import catRolls from '@/assets/cat-rolls.png';
import catSets from '@/assets/cat-sets.png';
import catSushi from '@/assets/cat-sushi.png';
import catPizza from '@/assets/cat-pizza.png';
import catHot from '@/assets/cat-hot.png';
import catSalads from '@/assets/cat-salads.png';
import catWok from '@/assets/cat-wok.png';
import catDrinks from '@/assets/cat-drinks.png';
import catSnacks from '@/assets/cat-snacks.png';
import catSoups from '@/assets/cat-soups.png';
import catDesserts from '@/assets/cat-desserts.png';
import catSauces from '@/assets/cat-sauces.png';

export const productImages: Record<string, string> = {
  'roll-philadelphia': rollPhiladelphia,
  'roll-dragon': rollDragon,
  'roll-california': rollCalifornia,
  'roll-spicy-tuna': rollSpicyTuna,
  'roll-cheese-salmon': rollCheeseSalmon,
  'roll-atlantic': rollAtlantic,
  'sushi-salmon': sushiSalmon,
  'sushi-tuna': sushiTuna,
  'sushi-eel': sushiEel,
  'sushi-shrimp': sushiShrimp,
  'sushi-octopus': sushiOctopus,
  'sushi-tamago': sushiTamago,
  'sushi-set': sushiSet,
  'sushi-set-duo': sushiSetDuo,
  'sushi-set-classic': sushiSetClassic,
  'sushi-set-party': sushiSetParty,
  'sushi-set-sampler': sushiSetSampler,
  'sushi-set-mini': sushiSetMini,
  'wok-noodles': wokNoodles,
  'wok-shrimp': wokShrimp,
  'wok-beef': wokBeef,
  'wok-tofu': wokTofu,
  'wok-pad-thai': wokPadThai,
  'wok-singapore': wokSingapore,
  'soup-miso': soupMiso,
  'pizza-pepperoni': pizzaPepperoni,
  'pizza-margherita': pizzaMargherita,
  'pizza-four-cheese': pizzaFourCheese,
  'pizza-hawaiian': pizzaHawaiian,
  'pizza-bbq': pizzaBbq,
  'pizza-mushroom': pizzaMushroom,
  'gyoza': gyoza,
  'mochi': mochi,
  'poke-bowl': pokeBowl,
  'poke-tuna': pokeTuna,
  'poke-shrimp': pokeShrimp,
  'salad-chuka': saladChuka,
  'salad-chicken': saladChicken,
  'salad-glass-noodle': saladGlassNoodle,
  'edamame': edamame,
  'spring-rolls': springRolls,
  'tempura': tempura,
  'takoyaki': takoyaki,
  'karaage': karaage,
  'sauce-soy': sauceSoy,
  'sauce-spicy-mayo': sauceSpicyMayo,
  'sauce-unagi': sauceUnagi,
  'sauce-teriyaki': sauceTeriyaki,
  'sauce-wasabi': sauceWasabi,
  'sauce-ginger': sauceGinger,
};

export const categoryImages: Record<string, string> = {
  'cat-rolls': catRolls,
  'cat-rolls-baked': catRolls,
  'cat-rolls-tempura': catHot,
  'cat-sets': catSets,
  'cat-sushi': catSushi,
  'cat-pizza': catPizza,
  'cat-hot': catHot,
  'cat-salads': catSalads,
  'cat-wok': catWok,
  'cat-drinks': catDrinks,
  'cat-snacks': catSnacks,
  'cat-soups': catSoups,
  'cat-desserts': catDesserts,
  'cat-sauces': catSauces,
};

export const getProductImage = (imageKey: string): string => {
  if (!imageKey) return rollPhiladelphia;
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
  return productImages[imageKey] || rollPhiladelphia;
};

export const getProductImageForProduct = (product: Product): string => {
  const imageKey = product.image;
  if (!imageKey) return rollPhiladelphia;
  if (imageKey.startsWith('http')) return imageKey;
  if (imageKey.startsWith('/Роллы-все_files/')) {
    const name = imageKey.split('/').pop() || '';
    const upgraded = name.replace('_184', '_328');
    return `https://xn--36-6kcaj8anzg.xn--p1ai/files/images/cache/Goods/Good${product.id}/${upgraded}`;
  }
  if (imageKey.startsWith('/files/images/cache/')) {
    return `https://xn--36-6kcaj8anzg.xn--p1ai${imageKey}`;
  }
  if (imageKey.startsWith('/')) {
    const base = import.meta.env.BASE_URL || '/';
    return `${base.replace(/\/$/, '')}/${imageKey.replace(/^\//, '')}`;
  }
  if (imageKey.startsWith('.')) return imageKey;
  return productImages[imageKey] || rollPhiladelphia;
};

export const getCategoryImage = (imageKey: string): string => {
  return categoryImages[imageKey] || catRolls;
};
