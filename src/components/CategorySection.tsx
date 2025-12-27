import { Product } from '@/data/products';
import ProductCard from './ProductCard';

interface CategorySectionProps {
  id: string;
  name: string;
  products: Product[];
}

const CategorySection = ({ id, name, products }: CategorySectionProps) => {
  if (products.length === 0) return null;

  const list = products;

  return (
    <section id={id} className="py-6 md:py-8 scroll-mt-24">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">{name}</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {list.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
