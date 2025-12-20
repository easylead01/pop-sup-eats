import fs from 'fs';
import path from 'path';

const mhtmlPath = path.resolve('Сеты.mhtml');
const htmlPath = path.resolve('Сеты.html');
const argInput = process.argv[2];
const inputPath = argInput ? path.resolve(argInput) : (fs.existsSync(mhtmlPath) ? mhtmlPath : htmlPath);
const basename = path.basename(inputPath);
const isSushi = /суши|sushi/i.test(basename);
const isPizza = /пицца|pizza/i.test(basename);
const isSnacks = /закус|snack/i.test(basename);
const jsonPath = path.resolve(
  isSushi ? 'src/data/sushi.catalog.json' :
  isPizza ? 'src/data/pizza.catalog.json' :
  isSnacks ? 'src/data/snacks.catalog.json' :
  'src/data/sets.catalog.json'
);

const sourcePath = inputPath;
const rawContent = fs.readFileSync(sourcePath, 'utf-8');
const decodeQuotedPrintable = (str) =>
  str
    .replace(/=\r?\n/g, '')
    .replace(/=([A-Fa-f0-9]{2})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
const htmlContent = sourcePath.toLowerCase().endsWith('.mhtml')
  ? Buffer.from(decodeQuotedPrintable(rawContent), 'binary').toString('utf-8')
  : rawContent;

const chunks = htmlContent.split('<div class="cards__column"');
const items = [];

for (let i = 1; i < chunks.length; i++) {
  const chunk = chunks[i];

  const idMatch = chunk.match(/data-good_id="(\d+)"/);
  if (!idMatch) continue;
  const id = idMatch[1].trim();

  const urlMatch = chunk.match(/class="cards__item-links" href="([^"]+)"/);
  const productUrl = urlMatch ? urlMatch[1].trim() : '';

  const bodyMatch = chunk.match(/class="cards__item-body"[\s\S]*?<b>([\s\S]*?)<\/b>[\s\S]*?(?:<p>([\s\S]*?)<\/p>)/);
  let name = bodyMatch ? bodyMatch[1] : '';
  let description = bodyMatch ? bodyMatch[2] : '';
  name = name.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  description = description.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();

  const priceMatch = chunk.match(/class="rub cards__item-price">([\d\s]+)<\/p>/);
  const priceText = priceMatch ? priceMatch[1] : '';
  const price = priceText ? parseInt(priceText.replace(/\D/g, ''), 10) : 0;
  const oldPriceMatch = chunk.match(/class="rub cards__item-priceOld">([\d\s]+)<\/p>/);
  const oldPriceText = oldPriceMatch ? oldPriceMatch[1] : '';
  const oldPrice = oldPriceText ? parseInt(oldPriceText.replace(/\D/g, ''), 10) : undefined;

  let imageUrl = '';
  const sources = [...chunk.matchAll(/<source[^>]*srcset="([^"]+)"[^>]*>/g)].map(m => m[1]);
  if (sources.length > 0) {
    imageUrl = sources[sources.length - 1].trim();
  } else {
    const imgMatch = chunk.match(/<img[^>]*src="([^"]+)"[^>]*>/);
    imageUrl = imgMatch ? imgMatch[1].trim() : '';
  }
  imageUrl = imageUrl.replace(/^(\.\.\/)+/, '/').replace(/^\.\//, '/');

  const weightMatch = chunk.match(/title="Вес"[\s\S]*?<span>\s*([\d\s]+)\s*гр/i);
  const weight = weightMatch ? `${weightMatch[1].trim()} гр` : '';
  const caloriesMatch = chunk.match(/title="Калории"[\s\S]*?<span>\s*([\d]+)/i);
  const calories = caloriesMatch ? parseInt(caloriesMatch[1], 10) : undefined;
  const piecesMatch = chunk.match(/title="Количество"[\s\S]*?<span>\s*([\d\s]+)\s*шт/i);
  const pieces = piecesMatch ? `${piecesMatch[1].trim()} шт` : undefined;
  const sizeMatch = chunk.match(/title="Размер"[\s\S]*?<span>\s*([\d\s]+)\s*см/i);
  const size = sizeMatch ? `${sizeMatch[1].trim()} см` : undefined;
  const economyMatch = chunk.match(/Экономия:\s*<span>\s*([\d\s]+)/i);
  const economy = economyMatch ? parseInt(economyMatch[1].replace(/\D/g, ''), 10) : undefined;
  const ingredients = description
    ? description.split(',').map(s => s.trim()).filter(Boolean)
    : [];

  items.push({
    id,
    name,
    description,
    price,
    imageUrl,
    productUrl,
    weight,
    calories,
    pieces,
    size,
    oldPrice,
    economy,
    ingredients,
  });
}

fs.writeFileSync(jsonPath, JSON.stringify(items, null, 2), 'utf-8');
console.log(`Extracted ${items.length} ${isSushi ? 'sushi' : (isPizza ? 'pizza' : (isSnacks ? 'snacks' : 'sets'))} from ${path.basename(sourcePath)} to ${jsonPath}`);
