import rollPhiladelphia from '@/assets/roll-philadelphia.png';
import rollDragon from '@/assets/roll-dragon.png';
import rollCalifornia from '@/assets/roll-california.png';
import rollSpicyTuna from '@/assets/roll-spicy-tuna.png';
import rollCheeseSalmon from '@/assets/roll-cheese-salmon.png';
import rollAtlantic from '@/assets/roll-atlantic.png';
import sushiSalmon from '@/assets/sushi-salmon.png';
import sushiTuna from '@/assets/sushi-tuna.png';
import sushiEel from '@/assets/sushi-eel.png';
import sushiSet from '@/assets/sushi-set.png';
import sushiSetDuo from '@/assets/sushi-set-duo.png';
import sushiSetClassic from '@/assets/sushi-set-classic.png';
import wokNoodles from '@/assets/wok-noodles.png';
import wokShrimp from '@/assets/wok-shrimp.png';
import wokBeef from '@/assets/wok-beef.png';
import soupMiso from '@/assets/soup-miso.png';
import pizzaPepperoni from '@/assets/pizza-pepperoni.png';
import pizzaMargherita from '@/assets/pizza-margherita.png';
import pizzaFourCheese from '@/assets/pizza-four-cheese.png';
import gyoza from '@/assets/gyoza.png';
import mochi from '@/assets/mochi.png';
import pokeBowl from '@/assets/poke-bowl.png';
import pokeTuna from '@/assets/poke-tuna.png';
import saladChuka from '@/assets/salad-chuka.png';
import edamame from '@/assets/edamame.png';
import springRolls from '@/assets/spring-rolls.png';
import sauceSoy from '@/assets/sauce-soy.png';
import sauceSpicyMayo from '@/assets/sauce-spicy-mayo.png';
import sauceUnagi from '@/assets/sauce-unagi.png';

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
  'sushi-set': sushiSet,
  'sushi-set-duo': sushiSetDuo,
  'sushi-set-classic': sushiSetClassic,
  'wok-noodles': wokNoodles,
  'wok-shrimp': wokShrimp,
  'wok-beef': wokBeef,
  'soup-miso': soupMiso,
  'pizza-pepperoni': pizzaPepperoni,
  'pizza-margherita': pizzaMargherita,
  'pizza-four-cheese': pizzaFourCheese,
  'gyoza': gyoza,
  'mochi': mochi,
  'poke-bowl': pokeBowl,
  'poke-tuna': pokeTuna,
  'salad-chuka': saladChuka,
  'edamame': edamame,
  'spring-rolls': springRolls,
  'sauce-soy': sauceSoy,
  'sauce-spicy-mayo': sauceSpicyMayo,
  'sauce-unagi': sauceUnagi,
};

export const categoryImages: Record<string, string> = {
  'cat-rolls': catRolls,
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
  return productImages[imageKey] || rollPhiladelphia;
};

export const getCategoryImage = (imageKey: string): string => {
  return categoryImages[imageKey] || catRolls;
};
