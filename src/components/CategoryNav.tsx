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
              className="relative flex-shrink-0 h-14 px-6 rounded-[10px] overflow-hidden transition-all"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={getCategoryImage(category.image)}
                  alt=""
                  className="w-full h-full object-cover"
                />
                {/* Overlay */}
                <div className={`absolute inset-0 ${
                  activeCategory === category.id
                    ? 'bg-primary/80'
                    : 'bg-foreground/20 hover:bg-foreground/30'
                } transition-colors`} />
              </div>
              
              {/* Text */}
              <span className="relative z-10 text-base font-medium text-white whitespace-nowrap">
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default CategoryNav;