import { useState } from 'react';
import { Upload, Trash2, ArrowLeft, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products, categories } from '@/data/products';
import { getProductImage } from '@/lib/images';
import { useProductImages, useUploadProductImage, useDeleteProductImage } from '@/hooks/useProductImages';
import { toast } from 'sonner';

const Admin = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { data: customImages, isLoading } = useProductImages();
  const uploadMutation = useUploadProductImage();
  const deleteMutation = useDeleteProductImage();

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const getImageUrl = (productKey: string) => {
    const customImage = customImages?.find(img => img.product_key === productKey);
    return customImage?.image_url || getProductImage(productKey);
  };

  const hasCustomImage = (productKey: string) => {
    return customImages?.some(img => img.product_key === productKey);
  };

  const handleFileUpload = async (productKey: string, file: File) => {
    try {
      await uploadMutation.mutateAsync({ productKey, file });
      toast.success('Изображение загружено');
    } catch (error) {
      toast.error('Ошибка загрузки');
      console.error(error);
    }
  };

  const handleDelete = async (productKey: string) => {
    try {
      await deleteMutation.mutateAsync(productKey);
      toast.success('Изображение удалено');
    } catch (error) {
      toast.error('Ошибка удаления');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="p-2 hover:bg-secondary rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-bold">Управление изображениями</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Category Filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              selectedCategory === 'all' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-secondary text-foreground hover:bg-secondary/80'
            }`}
          >
            Все
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                selectedCategory === cat.id 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary text-foreground hover:bg-secondary/80'
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">Загрузка...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="relative aspect-square bg-secondary/30">
                  <img
                    src={getImageUrl(product.image)}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {hasCustomImage(product.image) && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                
                <div className="p-3">
                  <h3 className="font-medium text-sm mb-2 line-clamp-2">{product.name}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{product.image}</p>
                  
                  <div className="flex gap-2">
                    <label className="flex-1 cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(product.image, file);
                        }}
                        disabled={uploadMutation.isPending}
                      />
                      <div className="flex items-center justify-center gap-1 px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors">
                        <Upload className="w-4 h-4" />
                        <span>Загрузить</span>
                      </div>
                    </label>
                    
                    {hasCustomImage(product.image) && (
                      <button
                        onClick={() => handleDelete(product.image)}
                        disabled={deleteMutation.isPending}
                        className="px-3 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
