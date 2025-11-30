import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { supabase } from '@/integrations/supabase/client'; // Disabled for static demo

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
      console.log("Mock Mode: Returning empty product images list");
      return [] as ProductImage[];
    },
  });
};

export const useUploadProductImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productKey, file }: { productKey: string; file: File }) => {
      // Mock upload
      console.log("Mock Mode: Upload simulated for", productKey);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { productKey, imageUrl: URL.createObjectURL(file) };
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
      // Mock delete
      console.log("Mock Mode: Delete simulated for", productKey);
      await new Promise(resolve => setTimeout(resolve, 500));
      return productKey;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-images'] });
    },
  });
};
