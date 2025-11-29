import { useState, useEffect } from 'react';
import { categories } from '@/data/products';
import { getCategoryImage } from '@/lib/images';
const CategorySidebar = () => {
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
        behavior: 'smooth'
      });
    }
  };
  return <aside className="hidden lg:block w-1/4 flex-shrink-0">
      <div className="sticky top-24 pl-5 pr-4 mx-[47px] my-[19px] px-[7px] py-[78px]">
        <nav className="flex flex-col gap-2">
          {categories.map(category => <button key={category.id} onClick={() => scrollToCategory(category.id)} className={`flex items-center gap-3 p-3 rounded-xl transition-all text-left ${activeCategory === category.id ? 'bg-primary/10 text-primary' : 'hover:bg-muted text-foreground/70 hover:text-foreground'}`}>
              {/* Image */}
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                <img src={getCategoryImage(category.image)} alt={category.name} className="w-full h-full object-cover" />
              </div>
              
              {/* Text */}
              <span className="text-sm font-medium">
                {category.name}
              </span>
            </button>)}
        </nav>
      </div>
    </aside>;
};
export default CategorySidebar;