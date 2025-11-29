import { useRef, useState, useEffect } from 'react';
import { categories } from '@/data/products';
import { getCategoryImage } from '@/lib/images';

const CategoryNav = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('rolls');

  useEffect(() => {
    const handleScroll = () => {
      const sections = categories.map(cat => document.getElementById(cat.id));
      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveCategory(categories[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToCategory = (categoryId: string) => {
    const element = document.getElementById(categoryId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav className="sticky top-16 md:top-20 z-30 bg-background border-b border-border">
      <div className="container mx-auto px-4">
        <div
          ref={scrollRef}
          className="flex gap-6 md:gap-8 overflow-x-auto scrollbar-hide py-4 -mx-4 px-4"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => scrollToCategory(category.id)}
              className="flex flex-col items-center gap-2 flex-shrink-0 group"
            >
              {/* Text */}
              <span className={`text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === category.id
                  ? 'text-primary'
                  : 'text-foreground/70 group-hover:text-foreground'
              }`}>
                {category.name}
              </span>
              
              {/* Image */}
              <div className={`w-16 h-10 md:w-20 md:h-12 rounded-xl overflow-hidden transition-transform ${
                activeCategory === category.id
                  ? 'scale-110'
                  : 'group-hover:scale-105'
              }`}>
                <img
                  src={getCategoryImage(category.image)}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default CategoryNav;
