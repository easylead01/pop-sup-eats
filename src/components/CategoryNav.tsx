import { useRef, useState, useEffect } from 'react';
import { categories } from '@/data/products';

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
    <nav className="sticky top-16 md:top-20 z-30 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide py-3 -mx-4 px-4"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => scrollToCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                activeCategory === category.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80 text-foreground'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default CategoryNav;
