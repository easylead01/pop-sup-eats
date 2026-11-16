import {
  Product,
  categories,
  getProductsByCategory,
  products,
  setsProducts,
  sushiProducts,
  pizzaProducts,
  snacksProducts,
  myboxProducts,
} from '@/data/products';

/**
 * Своя ссылка у каждого товара: /<категория>/<название-латиницей>,
 * например /sets/set-filadelfiya. По ссылке открывается обычное окно товара поверх меню.
 */

const TRANSLIT: Record<string, string> = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z', и: 'i', й: 'y',
  к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f',
  х: 'h', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sch', ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya',
};

export const slugify = (text: string) =>
  text
    .toLowerCase()
    .split('')
    .map((ch) => TRANSLIT[ch] ?? ch)
    .join('')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

let slugByProduct: Map<Product, string> | null = null;
let slugById: Map<string, string> | null = null;
let productBySlug: Map<string, Product> | null = null;

const buildIndex = () => {
  slugByProduct = new Map();
  slugById = new Map();
  productBySlug = new Map();
  // Сначала то, что реально показано в меню, — им достаются адреса без номера
  const shown = categories.flatMap((c) => getProductsByCategory(c.id, 'default'));
  const all = [...shown, ...myboxProducts, ...products, ...setsProducts, ...sushiProducts, ...pizzaProducts, ...snacksProducts];
  for (const p of all) {
    if (slugByProduct.has(p)) continue;
    const base = slugify(p.name) || slugify(p.id) || 'tovar';
    let slug = base;
    if (productBySlug.has(slug)) slug = `${base}-${slugify(p.id)}`;
    for (let n = 2; productBySlug.has(slug); n++) slug = `${base}-${n}`;
    slugByProduct.set(p, slug);
    productBySlug.set(slug, p);
    if (!slugById.has(p.id)) slugById.set(p.id, slug);
  }
};

const ensureIndex = () => {
  if (!productBySlug) buildIndex();
};

export const getProductSlug = (product: Product) => {
  ensureIndex();
  return slugByProduct!.get(product) ?? slugById!.get(product.id) ?? slugify(product.name);
};

export const productPath = (product: Product) => `/${product.category}/${getProductSlug(product)}`;

export const findProductBySlug = (slug: string) => {
  ensureIndex();
  return productBySlug!.get(slug);
};
