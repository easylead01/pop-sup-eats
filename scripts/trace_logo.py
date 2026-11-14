"""
Точная векторизация логотипа: обводит исходный PNG послойно и сохраняет SVG 1:1.

Слои (снизу вверх): оранжевые детали → тёмные детали → светлые прожилки/блики
на них → белые рисинки. Каждая деталь получает свой цвет из исходника
(медиана её пикселей), прозрачные места остаются прозрачными, как в PNG.

Запуск (нужны numpy, scikit-image, Pillow):
  python scripts/trace_logo.py "src/assets/logo (1).png" src/assets/logo.svg
"""
import sys
import numpy as np
from PIL import Image
from skimage import measure, transform, morphology

SRC, DST = sys.argv[1], sys.argv[2]
UP = 6            # во сколько раз увеличиваем перед обводкой (гладкие края)
TOL = 0.35        # допуск упрощения контура, в увеличенных пикселях

img = np.asarray(Image.open(SRC).convert('RGBA')).astype(np.float64)
H, W = img.shape[:2]
R, G, B, A = img[..., 0], img[..., 1], img[..., 2], img[..., 3] / 255.0
LUM = 0.299 * R + 0.587 * G + 0.114 * B

orange_t = np.clip((R - G - 60) / 80.0, 0, 1)
light_t = np.clip((LUM - 170) / 40.0, 0, 1) * (1 - orange_t)
dark_t = (1 - orange_t) * (1 - light_t)

cov = {
    'orange': A * orange_t,
    'dark': A * dark_t,
    'light': A * light_t,
}

def hexc(rgb):
    return '#%02X%02X%02X' % tuple(int(round(v)) for v in rgb)

def trace(mask_f, level=0.5):
    """Контуры карты покрытия (0..1) -> строка пути SVG в координатах исходника."""
    padded = np.pad(mask_f, 2)
    big = transform.rescale(padded, UP, order=3, mode='edge', anti_aliasing=False)
    out = []
    for c in measure.find_contours(big, level):
        c = measure.approximate_polygon(c, TOL)
        if len(c) < 4:
            continue
        # (row, col) увеличенного -> (x, y) исходника
        pts = [((col + 0.5) / UP - 2, (row + 0.5) / UP - 2) for row, col in c]
        out.append('M' + 'L'.join(f'{x:.2f} {y:.2f}' for x, y in pts[:-1]) + 'Z')
    return ''.join(out)

def components(cov_map, thr=0.5, min_px=3):
    lab = measure.label(cov_map > thr, connectivity=2)
    res = []
    for k in range(1, lab.max() + 1):
        m = lab == k
        if m.sum() < min_px:
            continue
        res.append(m)
    return res

layers = []

def add_layer(name, cov_map, sub_layer=True, grow=0.0):
    """Каждая связная деталь — свой цвет. Внутри детали — светлые прожилки отдельным слоем."""
    subs = []
    for m in components(cov_map):
        region = morphology.binary_dilation(m, morphology.disk(2))
        local = cov_map * region
        body_px = m & (A > 0.95)
        if body_px.sum() == 0:
            body_px = m
        body_lum = np.median(LUM[body_px])
        core = body_px & (LUM <= body_lum + 6)
        color = [np.median(ch[core if core.sum() else body_px]) for ch in (R, G, B)]
        d = trace(local, level=0.5 - grow)
        if d:
            layers.append((name, hexc(color), d))
        if sub_layer:
            # прожилки/блики: заметно светлее основного цвета детали
            hl = np.clip((LUM - body_lum - 8) / 12.0, 0, 1) * local
            hl_px = (hl > 0.5) & m
            if hl_px.sum() >= 3:
                hcol = [np.median(ch[hl_px]) for ch in (R, G, B)]
                dh = trace(hl * region)
                if dh:
                    subs.append((name + '-hl', hexc(hcol), dh))
    return subs

# оранжевый снизу и чуть «с запасом», чтобы на стыке с тёмным не было щели
orange_subs = add_layer('orange', cov['orange'], grow=0.15)
dark_subs = add_layer('dark', cov['dark'])
layers.extend(orange_subs)
layers.extend(dark_subs)
for m in components(cov['light'], min_px=1):
    region = morphology.binary_dilation(m, morphology.disk(1))
    color = [np.median(ch[m]) for ch in (R, G, B)]
    d = trace(cov['light'] * region)
    if d:
        layers.append(('light', hexc(color), d))

# прожилки на тёмном рисуем поверх тёмного, блики оранжевого — поверх оранжевого,
# поэтому порядок: оранжевый, блики оранжевого, тёмный, прожилки, светлое
order = {'orange': 0, 'orange-hl': 1, 'dark': 2, 'dark-hl': 3, 'light': 4}
layers.sort(key=lambda l: order[l[0]])

svg = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" role="img" aria-label="ОКИАНАВА">',
       '<title>ОКИАНАВА</title>']
for name, color, d in layers:
    svg.append(f'<path fill="{color}" fill-rule="evenodd" d="{d}"/>')
svg.append('</svg>')
open(DST, 'w').write('\n'.join(svg))
from collections import Counter
print('слоёв:', len(layers), dict(Counter(l[0] for l in layers)), 'размер, КБ:', round(len('\n'.join(svg)) / 1024, 1))
