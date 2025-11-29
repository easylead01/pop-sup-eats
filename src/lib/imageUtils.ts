import { productImages } from './images';

// This will be populated from the database
let customProductImages: Record<string, string> = {};

export const setCustomProductImages = (images: Record<string, string>) => {
  customProductImages = images;
};

export const getProductImageUrl = (imageKey: string): string => {
  // First check if there's a custom image from the database
  if (customProductImages[imageKey]) {
    return customProductImages[imageKey];
  }
  
  // Fall back to static images
  return productImages[imageKey] || productImages['roll-philadelphia'];
};
