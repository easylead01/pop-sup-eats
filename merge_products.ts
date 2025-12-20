
import { products } from './src/data/products';
import fs from 'fs';

// Read JSON
const rolls = JSON.parse(fs.readFileSync('./src/data/rolls.catalog.json', 'utf-8'));

interface RollInput {
    id: string;
    name: string;
    description: string;
    price: number;
    weight?: string;
    pieces?: string;
    calories?: number;
    imageUrl: string;
    ingredients?: string[];
    allergens?: string[];
    productUrl?: string;
}

// Transform rolls to match Product interface
const newRolls = rolls.map((r: RollInput) => ({
    id: r.id,
    name: r.name,
    description: r.description,
    price: r.price,
    weight: r.weight || '',
    pieces: r.pieces,
    calories: r.calories,
    category: 'rolls',
    image: r.imageUrl, // Map imageUrl to image
    ingredients: r.ingredients || [],
    allergens: r.allergens || [],
    productUrl: r.productUrl, // Keep this, but need to update interface
    isNew: false,
    isHit: false
}));

// Filter old rolls
const otherProducts = products.filter(p => p.category !== 'rolls');

// Combine
// We put newRolls first or last? The user said "Replace ... rolls".
// Existing order was Rolls first. So we put newRolls first.
const allProducts = [...newRolls, ...otherProducts];

// Read file text
let content = fs.readFileSync('./src/data/products.ts', 'utf-8');

// Update Interface to include productUrl if not present
if (!content.includes('productUrl?: string;')) {
    content = content.replace('image: string;', 'image: string;\n  productUrl?: string;');
}

// Replace products array
// We look for 'export const products: Product[] =' and replace everything after it.
const marker = 'export const products: Product[] =';
const parts = content.split(marker);

if (parts.length < 2) {
    console.error("Could not find products array marker");
    process.exit(1);
}

const helpers = `

export const getProductsByCategory = (categoryId: string) => {
  return products.filter((product) => product.category === categoryId);
};

export const getProduct = (id: string) => {
  return products.find((product) => product.id === id);
};
`;

const newFileContent = `${parts[0]}${marker} ${JSON.stringify(allProducts, null, 2)};${helpers}`;

fs.writeFileSync('./src/data/products.ts', newFileContent, 'utf-8');
console.log("Merged products and updated interface.");
