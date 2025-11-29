import { useEffect, createContext, useContext, ReactNode } from 'react';
import { useProductImages } from '@/hooks/useProductImages';
import { setCustomProductImages } from '@/lib/imageUtils';

interface ProductImageContextValue {
  isLoading: boolean;
  customImages: Record<string, string>;
}

const ProductImageContext = createContext<ProductImageContextValue>({
  isLoading: true,
  customImages: {},
});

export const useProductImageContext = () => useContext(ProductImageContext);

export const ProductImageProvider = ({ children }: { children: ReactNode }) => {
  const { data: images, isLoading } = useProductImages();

  useEffect(() => {
    if (images) {
      const imageMap = images.reduce((acc, img) => {
        acc[img.product_key] = img.image_url;
        return acc;
      }, {} as Record<string, string>);
      
      setCustomProductImages(imageMap);
    }
  }, [images]);

  const customImages = images?.reduce((acc, img) => {
    acc[img.product_key] = img.image_url;
    return acc;
  }, {} as Record<string, string>) || {};

  return (
    <ProductImageContext.Provider value={{ isLoading, customImages }}>
      {children}
    </ProductImageContext.Provider>
  );
};
