import { Sparkles } from 'lucide-react';
import { useDemoStore } from '@/store/demoStore';

/** Плавающая кнопка прототипа: подменяет роллы и сеты на меню в стиле MyBox */
const DemoMenuToggle = ({ hidden = false }: { hidden?: boolean }) => {
  const { menuDemo, toggleMenuDemo } = useDemoStore();
  const isOn = menuDemo === 'mybox';

  const handleClick = () => {
    toggleMenuDemo();
    const target = document.getElementById('rolls');
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={isOn}
      title={isOn ? 'Вернуть текущее меню' : 'Показать роллы и сеты в стиле MyBox'}
      className={`fixed z-50 bottom-24 left-4 lg:bottom-8 lg:left-8 flex items-center gap-2.5 rounded-full pl-3 pr-4 py-2.5 text-sm font-semibold shadow-lg transition-all duration-200 active:scale-95
        ${isOn ? 'bg-black text-white' : 'bg-white text-black border border-black/10 hover:border-black/30'}
        ${hidden ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      <Sparkles className="w-4 h-4" />
      <span>Стиль MyBox</span>
      <span
        className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${
          isOn ? 'bg-primary' : 'bg-black/15'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${
            isOn ? 'translate-x-[18px]' : 'translate-x-0.5'
          }`}
        />
      </span>
    </button>
  );
};

export default DemoMenuToggle;
