import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface ProductImage {
  id: string;
  product_key: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export const useProductImages = () => {
  return useQuery({
    queryKey: ['product-images'],
    queryFn: async () => {
      console.log("Skipping Supabase fetch on GitHub Pages");
      return [] as ProductImage[];
      
      /* 
      // Original code commented out for GitHub Pages deployment without env vars
      const { data, error } = await supabase
        .from('product_images')
        .select('*');
      
      if (error) throw error;
      return data as ProductImage[];
      */
    },
  });
};

export const useUploadProductImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productKey, file }: { productKey: string; file: File }) => {
      const fileExt = file.name.split('.').pop();
      const fileName = `${productKey}.${fileExt}`;
      const filePath = `products/${fileName}`;

      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      // Upsert to product_images table
      const { error: dbError } = await supabase
        .from('product_images')
        .upsert({
          product_key: productKey,
          image_url: publicUrl,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'product_key',
        });

      if (dbError) throw dbError;

      return { productKey, imageUrl: publicUrl };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-images'] });
    },
  });
};

export const useDeleteProductImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productKey: string) => {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('product-images')
        .remove([`products/${productKey}.png`, `products/${productKey}.jpg`, `products/${productKey}.jpeg`, `products/${productKey}.webp`]);

      // Delete from database
      const { error: dbError } = await supabase
        .from('product_images')
        .delete()
        .eq('product_key', productKey);

      if (dbError) throw dbError;

      return productKey;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-images'] });
    },
  });
};
