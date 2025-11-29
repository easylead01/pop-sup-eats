-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true);

-- Create policy for public read access
CREATE POLICY "Public read access for product images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

-- Create policy for authenticated upload (admin)
CREATE POLICY "Authenticated users can upload product images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'product-images');

-- Create policy for authenticated update
CREATE POLICY "Authenticated users can update product images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'product-images');

-- Create policy for authenticated delete
CREATE POLICY "Authenticated users can delete product images"
ON storage.objects FOR DELETE
USING (bucket_id = 'product-images');

-- Create table to store product image mappings
CREATE TABLE public.product_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_key TEXT NOT NULL UNIQUE,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;

-- Public read access for product images
CREATE POLICY "Anyone can view product images"
ON public.product_images FOR SELECT
USING (true);

-- Authenticated users can manage product images
CREATE POLICY "Authenticated users can insert product images"
ON public.product_images FOR INSERT
WITH CHECK (true);

CREATE POLICY "Authenticated users can update product images"
ON public.product_images FOR UPDATE
USING (true);

CREATE POLICY "Authenticated users can delete product images"
ON public.product_images FOR DELETE
USING (true);