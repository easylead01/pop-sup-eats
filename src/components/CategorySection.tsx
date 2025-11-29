import { Product } from '@/data/products';
import ProductCard from './ProductCard';

interface CategorySectionProps {
  id: string;
  name: string;
  products: Product[];
}

const CategorySection = ({ id, name, products }: CategorySectionProps) => {
  if (products.length === 0) return null;

  return (
    <section id={id} className="py-6 md:py-8 scroll-mt-20">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">{name}</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
