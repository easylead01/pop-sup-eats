import { useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useUIStore } from '@/store/uiStore';
import { findProductBySlug, productPath } from '@/lib/productLinks';
import type { Product } from '@/data/products';

/**
 * Связывает окно товара с адресом страницы:
 *  — открыли товар → адрес меняется на /<категория>/<товар> (окно остаётся поп-апом поверх меню);
 *  — закрыли окно или нажали «Назад» → снова главная;
 *  — зашли по ссылке на товар → открывается меню и сразу окно этого товара.
 */

type NavState = { productDepth?: number } | null;

const BASE_TITLE = document.title;

export const useProductRoute = () => {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const selectedProduct = useUIStore((s) => s.selectedProduct);
  const setSelectedProduct = useUIStore((s) => s.setSelectedProduct);
  // Последний товар, который уже совпадает с адресом, — чтобы адрес и окно не гоняли друг друга
  const synced = useRef<Product | null>(selectedProduct);

  // Адрес → окно
  useEffect(() => {
    const fromUrl = slug ? findProductBySlug(slug) : undefined;
    const current = useUIStore.getState().selectedProduct;

    if (fromUrl) {
      synced.current = fromUrl;
      if (current !== fromUrl) setSelectedProduct(fromUrl);
      const canonical = productPath(fromUrl);
      if (location.pathname !== canonical) {
        navigate({ pathname: canonical, search: location.search }, { replace: true, state: location.state });
      }
      return;
    }

    synced.current = null;
    if (current) setSelectedProduct(null);
    // Неизвестный товар — просто показываем меню
    if (slug) navigate({ pathname: '/', search: location.search }, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Окно → адрес (только когда окно действительно сменилось, а не при первом запуске)
  const prevSelected = useRef<Product | null>(selectedProduct);
  useEffect(() => {
    if (prevSelected.current === selectedProduct) return;
    prevSelected.current = selectedProduct;
    if (synced.current === selectedProduct) return;
    synced.current = selectedProduct;
    const depth = (location.state as NavState)?.productDepth ?? 0;

    if (selectedProduct) {
      const path = productPath(selectedProduct);
      if (location.pathname !== path) {
        navigate({ pathname: path, search: location.search }, { state: { productDepth: depth + 1 } });
      }
    } else if (slug) {
      // Закрыли окно: возвращаемся на запись меню в истории, чтобы «Назад» не открывал товар снова
      if (depth > 0) navigate(-depth);
      else navigate({ pathname: '/', search: location.search }, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProduct]);

  // Заголовок вкладки — название товара
  useEffect(() => {
    document.title = selectedProduct ? `${selectedProduct.name} — заказать с доставкой` : BASE_TITLE;
  }, [selectedProduct]);
};
