import rollPhiladelphia from '@/assets/roll-philadelphia.png';
import rollDragon from '@/assets/roll-dragon.png';
import rollCalifornia from '@/assets/roll-california.png';
import rollSpicyTuna from '@/assets/roll-spicy-tuna.png';
import sushiSalmon from '@/assets/sushi-salmon.png';
import sushiSet from '@/assets/sushi-set.png';
import wokNoodles from '@/assets/wok-noodles.png';
import soupMiso from '@/assets/soup-miso.png';
import pizzaPepperoni from '@/assets/pizza-pepperoni.png';
import gyoza from '@/assets/gyoza.png';
import mochi from '@/assets/mochi.png';
import pokeBowl from '@/assets/poke-bowl.png';

export const productImages: Record<string, string> = {
  'roll-philadelphia': rollPhiladelphia,
  'roll-dragon': rollDragon,
  'roll-california': rollCalifornia,
  'roll-spicy-tuna': rollSpicyTuna,
  'sushi-salmon': sushiSalmon,
  'sushi-set': sushiSet,
  'wok-noodles': wokNoodles,
  'soup-miso': soupMiso,
  'pizza-pepperoni': pizzaPepperoni,
  'gyoza': gyoza,
  'mochi': mochi,
  'poke-bowl': pokeBowl,
};

export const getProductImage = (imageKey: string): string => {
  return productImages[imageKey] || rollPhiladelphia;
};
