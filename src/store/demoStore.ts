import { create } from 'zustand';

/**
 * Демо-режим прототипа: какое меню показывать в разделах роллов и сетов.
 * 'default' — текущее меню сайта, 'mybox' — роллы и сеты в стиле MyBox.
 * Режим можно открыть ссылкой ?demo=mybox, выбор запоминается в браузере.
 */
export type MenuDemo = 'default' | 'mybox';

const STORAGE_KEY = 'menu-demo';

const readInitial = (): MenuDemo => {
  if (typeof window === 'undefined') return 'default';
  const fromUrl = new URLSearchParams(window.location.search).get('demo');
  if (fromUrl === 'mybox') return 'mybox';
  if (fromUrl === 'default') return 'default';
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'mybox' ? 'mybox' : 'default';
  } catch {
    return 'default';
  }
};

interface DemoStore {
  menuDemo: MenuDemo;
  setMenuDemo: (demo: MenuDemo) => void;
  toggleMenuDemo: () => void;
}

export const useDemoStore = create<DemoStore>((set, get) => ({
  menuDemo: readInitial(),
  setMenuDemo: (menuDemo) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, menuDemo);
    } catch {
      // браузер может запрещать localStorage — тогда просто не запоминаем
    }
    set({ menuDemo });
  },
  toggleMenuDemo: () => get().setMenuDemo(get().menuDemo === 'mybox' ? 'default' : 'mybox'),
}));
