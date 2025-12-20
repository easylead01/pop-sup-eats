
import fs from 'fs';
import path from 'path';

const htmlPath = path.resolve('Роллы-все.html');
const jsonPath = path.resolve('src/data/rolls.catalog.json');

const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

// Regex to find cards
// We look for <div class="cards__column" ... > ... </div>
// Since HTML is nested, regex is fragile, but assuming the structure from the snippet:
// The card starts with <div class="cards__column" data-good_id="..."
// And ends ... well, we can just split by <div class="cards__column"
// and process each chunk.

const chunks = htmlContent.split('<div class="cards__column"');
const rolls = [];

// Skip the first chunk as it's before the first card
for (let i = 1; i < chunks.length; i++) {
    const chunk = chunks[i];
    
    // 1. ID
    const idMatch = chunk.match(/data-good_id="(\d+)"/);
    if (!idMatch) continue; // Not a valid card chunk?
    const id = idMatch[1];

    // 2. Name
    // Look for <b> Name </b> inside cards__item-body
    // We can look for class="cards__item-body".*?<b>(.*?)<\/b>
    // utilizing dotAll (s flag)
    const nameMatch = chunk.match(/class="cards__item-body".*?<b>(.*?)<\/b>/s);
    let name = nameMatch ? nameMatch[1].trim() : '';

    // 3. Description
    // Inside cards__item-body, look for <p>...</p>
    // We can look for class="cards__item-body".*?<p>(.*?)<\/p>
    const descMatch = chunk.match(/class="cards__item-body".*?<p>(.*?)<\/p>/s);
    let description = descMatch ? descMatch[1].trim() : '';
    
    // Cleanup description (remove HTML tags if any, though regex above captures content inside p)
    description = description.replace(/<[^>]*>/g, '');

    // 4. Price
    // class="rub cards__item-price">110</p>
    const priceMatch = chunk.match(/class="rub cards__item-price">(\d+)<\/p>/);
    let price = priceMatch ? parseInt(priceMatch[1], 10) : 0;

    // 5. Product URL
    // <a class="cards__item-links" href="...">
    const urlMatch = chunk.match(/class="cards__item-links" href="([^"]+)"/);
    let productUrl = urlMatch ? urlMatch[1] : '';

    // 6. Image URL
    // Priority: <img src="..."> (Local file)
    // Fallback: <source srcset="..."> (Remote file structure)
    let imageUrl = '';
    const imgMatch = chunk.match(/<img[^>]+src="([^"]+)"/);
    if (imgMatch) {
        imageUrl = imgMatch[1];
    }
    
    // If no img src or it doesn't look like the local folder, try srcset
    // But actually, for "Save As Complete", the img src usually points to the local _files folder.
    // The snippet shows: src="./Роллы-все_files/..."
    
    if (!imageUrl || !imageUrl.includes('Роллы-все_files')) {
         const sourceMatch = chunk.match(/<source srcset="([^"]+)"/);
         if (sourceMatch) {
             imageUrl = sourceMatch[1];
         }
    }
    
    // Normalize path
    // If it starts with ./, remove it
    if (imageUrl.startsWith('./')) {
        imageUrl = imageUrl.substring(1);
    }
    // Ensure it starts with /
    if (!imageUrl.startsWith('/')) {
        imageUrl = '/' + imageUrl;
    }

    // 7. Extra fields (Weight, Calories, Pieces)
    // Weight: <div class="cards__item-info-el" title="Вес">...<span> 115 гр</span>
    // Calories: <div class="cards__item-info-el" title="Калории">...<span> 112 кКал</span>
    // Pieces: <div class="cards__item-info-el" title="Количество">...<span> 6 шт</span>

    // We can use regex to find div with title="Вес" and then capture span content
    const weightMatch = chunk.match(/title="Вес".*?<span>(.*?)<\/span>/s);
    let weight = weightMatch ? weightMatch[1].trim() : '';

    const caloriesMatch = chunk.match(/title="Калории".*?<span>(.*?)<\/span>/s);
    let caloriesStr = caloriesMatch ? caloriesMatch[1].trim() : '';
    // Extract number from calories (e.g. "112 кКал" -> 112)
    let calories = parseInt(caloriesStr.replace(/\D/g, ''), 10) || undefined;

    const piecesMatch = chunk.match(/title="Количество".*?<span>(.*?)<\/span>/s);
    let pieces = piecesMatch ? piecesMatch[1].trim() : '';

    // 8. Ingredients (parse from description if needed, or leave as is)
    // The description we extracted earlier contains ingredients (e.g. "Рис, Нори, Огурец...").
    // We can split by comma.
    let ingredients = description.split(',').map(i => i.trim()).filter(Boolean);

    // Normalization
    name = name.replace(/\s+/g, ' ').trim();
    
    rolls.push({
        id,
        name,
        description,
        price,
        imageUrl,
        productUrl,
        weight,
        pieces,
        calories,
        category: 'rolls', // Add category explicitly
        ingredients,
        allergens: [] // Placeholder
    });
}

console.log(`Extracted ${rolls.length} rolls.`);

// Save to JSON
fs.writeFileSync(jsonPath, JSON.stringify(rolls, null, 2), 'utf-8');
console.log(`Saved to ${jsonPath}`);
