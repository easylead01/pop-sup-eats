"""Генератор векторного логотипа «ОКИАНАВА» (координаты как у исходного PNG 600×210)."""
import math, sys

DARK = '#33383C'      # графит букв, кольца и палочек
ORANGE = '#F25C22'    # лосось
WAVE = '#FFFFFF'      # светлые прожилки на тёмных буквах (с прозрачностью)
SW = 17               # толщина штриха букв
H = SW / 2
TOP, BOT = 94, 163    # верх и низ букв
Y0, Y1 = TOP + H, BOT - H  # осевые линии
YM = (TOP + BOT) / 2

def f(v):
    return f'{v:.2f}'.rstrip('0').rstrip('.')

out = []
add = out.append

# ---------- буквы как осевые линии (толщина задаётся штрихом) ----------
def A_paths(x):  # x — левый край буквы, ширина 68 (как у оригинала)
    ax = x + 34
    l = (ax - 25.5, Y1)
    r = (ax + 25.5, Y1)
    apex = (ax, Y0)
    return l, apex, r

APEX_HALF = 2  # половина ширины плоской вершины А
def A_d(l, apex, r):
    return (f'M{f(l[0])} {f(l[1])}L{f(apex[0]-APEX_HALF)} {f(apex[1])}'
            f'H{f(apex[0]+APEX_HALF)}L{f(r[0])} {f(r[1])}')

dark_strokes = []   # пути тёмных букв (для маски и заливки)

# К
dark_strokes.append(f'M131.5 {f(Y0)}V{f(Y1)}')
dark_strokes.append(f'M162.5 {f(Y0)}L143.5 {f(YM)}L162.5 {f(Y1)}')

# А1
a1 = 226.5
l, apex, r = A_paths(a1)
dark_strokes.append(A_d(l, apex, r))
cross_y = 140.5
def leg_x(p0, p1, y):
    top = (p1[0] - APEX_HALF if p0[0] < p1[0] else p1[0] + APEX_HALF, p1[1])
    return p0[0] + (top[0] - p0[0]) * (y - p0[1]) / (top[1] - p0[1])
a1_cross = (leg_x(l, apex, cross_y), leg_x(r, apex, cross_y))

# Н
dark_strokes.append(f'M315.5 {f(Y0)}V{f(Y1)}M360.5 {f(Y0)}V{f(Y1)}')
h_bar = f'M315.5 {f(YM)}H360.5'

# А2
a2 = 380.5
l2, apex2, r2 = A_paths(a2)
dark_strokes.append(A_d(l2, apex2, r2))
a2_cross = (leg_x(l2, apex2, cross_y), leg_x(r2, apex2, cross_y))

# В
b_fill = (
    # контур: ножка 461–478 с почти прямыми углами, чаши со скруглёнными углами (по замерам оригинала)
    'M464 94H496Q509.5 94 509.5 107.5V115Q509.5 124 503 126.5'
    'Q512.5 130 512.5 140V147Q512.5 163 496 163H464'
    'Q461 163 461 160V97Q461 94 464 94Z'
    # просветы
    'M478 105.5H486.5A7.5 7.5 0 0 1 486.5 120.5H478Z'
    'M478 133H489A8.5 8.5 0 0 1 489 150H478Z'
)

# А3: левая ножка и перекладина тёмные, правая — лосось
a3 = 525
l3, apex3, r3 = A_paths(a3)
split_t = 0.2  # где начинается лосось на правой ножке (доля от вершины)
rtop = (apex3[0] + APEX_HALF, apex3[1])
split = (rtop[0] + (r3[0] - rtop[0]) * split_t, rtop[1] + (r3[1] - rtop[1]) * split_t)
dark_strokes.append(f'M{f(l3[0])} {f(l3[1])}L{f(apex3[0]-APEX_HALF)} {f(apex3[1])}H{f(rtop[0])}L{f(split[0])} {f(split[1])}')
a3_cross = (leg_x(l3, apex3, cross_y), leg_x(r3, apex3, cross_y))
dark_strokes.append(f'M{f(a3_cross[0])} {f(cross_y)}H{f(a3_cross[1])}')

# ---------- волнистые прожилки ----------
def wave_lines():
    lines = []
    for k in range(-6, 9):
        y = 60 + k * 18
        d = f'M100 {y}'
        x = 100
        seg = 0
        while x < 640:
            amp = 6 if seg % 2 == 0 else -6
            d += f'q11 {amp} 22 0'
            x += 22
            seg += 1
        lines.append(d)
    return lines

waves = wave_lines()

# ---------- SVG ----------
add('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 210" role="img" aria-label="ОКИАНАВА">')
add('<title>ОКИАНАВА</title>')
add('<defs>')
# маска тёмных букв
add('<mask id="okv-letters" maskUnits="userSpaceOnUse" x="0" y="0" width="600" height="210">')
add(f'<g fill="none" stroke="#fff" stroke-width="{SW}" stroke-linecap="round" stroke-linejoin="round">')
for d in dark_strokes:
    add(f'<path d="{d}"/>')
add(f'<path d="{h_bar}" stroke-width="12" stroke-linecap="butt"/>')
add('</g>')
add(f'<path d="{b_fill}" fill="#fff" fill-rule="evenodd"/>')
add('</mask>')
# маска правой ножки А3 (лосось)
add('<mask id="okv-a3leg" maskUnits="userSpaceOnUse" x="0" y="0" width="600" height="210">')
add(f'<path d="M{f(split[0])} {f(split[1])}L{f(r3[0])} {f(r3[1])}" stroke="#fff" stroke-width="{SW}" stroke-linecap="round" fill="none"/>')
add('</mask>')
# круг ролла
add('<clipPath id="okv-roll"><circle cx="61" cy="122" r="34.5"/></clipPath>')
# кусок лосося «И»
add('<clipPath id="okv-i"><rect x="183" y="94" width="33.5" height="69" rx="16.75"/></clipPath>')
add('</defs>')

# палочки (под кругом)
def stick(x0, y0, x1, y1, band_at):
    L = math.hypot(x1 - x0, y1 - y0)
    ux, uy = (x1 - x0) / L, (y1 - y0) / L
    b0 = (x1 - ux * band_at, y1 - uy * band_at)
    b1 = (x1 - ux * (band_at - 7), y1 - uy * (band_at - 7))
    s = f'<path d="M{f(x0)} {f(y0)}L{f(x1)} {f(y1)}" stroke="{DARK}" stroke-width="6.2" stroke-linecap="round"/>'
    s += f'<path d="M{f(b0[0])} {f(b0[1])}L{f(b1[0])} {f(b1[1])}" stroke="{ORANGE}" stroke-width="6.2"/>'
    return s
add(stick(16, 152, 137, 17, 16))
add(stick(39, 175, 168, 40, 16))

# ролл: белая середина, лосось, рис, кольцо
add('<circle cx="61" cy="122" r="35" fill="#fff"/>')
add('<g clip-path="url(#okv-roll)">')
# три полосы лосося — обведены с оригинала и сглажены
SALMON = 'M76.47 102.06L77.66 102.06L78.84 102.12L80.01 102.25L81.17 102.44L82.33 102.69L83.45 102.99L84.52 103.35L85.56 103.77L86.56 104.23L87.33 104.65L87.86 105.01L88.16 105.31L88.22 105.56L87.59 105.76L86.28 105.90L84.28 105.98L81.59 106.02L79.24 106.17L77.23 106.45L75.55 106.86L74.20 107.39L72.81 108.06L71.38 108.88L69.89 109.83L68.36 110.92L66.49 112.57L64.29 114.77L61.75 117.53L58.88 120.84L56.45 123.55L54.48 125.66L52.97 127.17L51.91 128.08L50.72 128.97L49.41 129.84L47.97 130.70L46.41 131.55L44.94 132.21L43.56 132.70L42.28 133.00L41.09 133.12L39.90 133.20L38.70 133.21L37.48 133.17L36.27 133.08L35.17 132.94L34.20 132.75L33.36 132.52L32.64 132.23L31.97 131.91L31.34 131.55L30.77 131.16L30.23 130.72L29.75 130.03L29.31 129.09L28.92 127.91L28.58 126.47L28.32 125.23L28.15 124.18L28.06 123.33L28.06 122.67L28.09 122.12L28.16 121.69L28.25 121.36L28.38 121.14L28.52 120.96L28.70 120.82L28.89 120.72L29.11 120.66L29.63 120.70L30.46 120.84L31.59 121.08L33.03 121.42L34.34 121.67L35.51 121.83L36.55 121.89L37.45 121.86L38.30 121.78L39.10 121.66L39.84 121.48L40.53 121.27L41.30 120.95L42.14 120.55L43.06 120.05L44.06 119.45L45.48 118.42L47.33 116.95L49.59 115.05L52.28 112.70L54.60 110.76L56.55 109.21L58.14 108.06L59.36 107.31L60.77 106.55L62.36 105.79L64.14 105.02L66.11 104.23L67.94 103.59L69.62 103.07L71.17 102.69L72.58 102.44L73.93 102.25L75.23 102.12ZM84.44 108.52L86.19 108.73L87.62 108.97L88.75 109.22L89.56 109.48L90.06 109.77L90.50 110.05L90.88 110.33L91.19 110.61L91.44 110.89L91.69 111.27L91.94 111.73L92.19 112.30L92.44 112.95L92.65 113.73L92.82 114.64L92.95 115.67L93.05 116.83L93.02 117.73L92.88 118.37L92.62 118.75L92.25 118.88L91.73 118.91L91.08 118.84L90.28 118.69L89.34 118.44L88.39 118.25L87.42 118.12L86.44 118.06L85.44 118.06L84.35 118.19L83.18 118.44L81.92 118.81L80.58 119.31L79.18 120.02L77.73 120.95L76.22 122.08L74.66 123.42L73.00 125.09L71.25 127.07L69.41 129.38L67.47 132.00L65.62 134.38L63.85 136.50L62.17 138.38L60.58 140.00L58.93 141.49L57.23 142.85L55.47 144.08L53.66 145.17L51.96 146.05L50.38 146.73L48.92 147.19L47.58 147.44L46.30 147.57L45.10 147.59L43.97 147.48L42.91 147.27L41.90 146.95L40.95 146.55L40.05 146.05L39.20 145.45L38.38 144.80L37.56 144.08L36.77 143.30L35.98 142.45L35.23 141.55L34.49 140.60L33.78 139.59L33.09 138.53L32.55 137.64L32.16 136.92L31.92 136.38L31.83 136.00L31.84 135.70L31.95 135.48L32.16 135.34L32.47 135.28L32.95 135.29L33.61 135.37L34.44 135.52L35.44 135.73L36.56 135.89L37.81 135.98L39.19 136.02L40.69 135.98L42.24 135.80L43.85 135.45L45.52 134.95L47.23 134.30L48.81 133.60L50.25 132.87L51.55 132.09L52.70 131.28L54.59 129.59L57.20 127.03L60.53 123.59L64.59 119.28L68.05 115.82L70.91 113.21L73.17 111.45L74.83 110.55L76.35 109.80L77.74 109.23L79.00 108.81L80.12 108.56L81.41 108.43L82.84 108.41ZM86.25 120.98L87.12 121.02L87.95 121.10L88.73 121.24L89.47 121.44L90.16 121.69L90.77 121.95L91.30 122.21L91.75 122.48L92.12 122.77L92.45 123.06L92.71 123.38L92.92 123.70L93.08 124.05L93.16 124.62L93.18 125.41L93.12 126.44L93.00 127.69L92.66 129.18L92.12 130.91L91.36 132.89L90.39 135.11L89.62 136.80L89.04 137.98L88.66 138.62L88.47 138.75L88.27 138.83L88.07 138.86L87.86 138.84L87.64 138.78L87.29 138.57L86.80 138.21L86.19 137.70L85.44 137.05L84.71 136.58L84.01 136.30L83.33 136.20L82.67 136.30L82.05 136.48L81.48 136.74L80.94 137.09L80.44 137.53L79.77 138.30L78.95 139.41L77.95 140.86L76.80 142.64L75.68 144.24L74.60 145.66L73.56 146.91L72.56 147.97L71.48 148.97L70.33 149.91L69.09 150.78L67.78 151.59L66.52 152.27L65.30 152.82L64.12 153.23L63.00 153.52L61.84 153.73L60.66 153.87L59.44 153.94L58.19 153.94L56.98 153.88L55.83 153.75L54.72 153.56L53.66 153.31L52.66 153.05L51.74 152.77L50.89 152.47L50.11 152.16L49.49 151.85L49.04 151.55L48.75 151.27L48.62 150.98L48.98 150.60L49.80 150.12L51.11 149.53L52.89 148.84L54.55 148.10L56.10 147.30L57.53 146.45L58.84 145.55L60.13 144.56L61.40 143.50L62.64 142.36L63.86 141.14L65.31 139.49L67.00 137.41L68.92 134.91L71.08 131.97L72.86 129.59L74.27 127.78L75.30 126.53L75.95 125.84L76.71 125.16L77.57 124.47L78.53 123.78L79.59 123.09L80.62 122.51L81.62 122.02L82.59 121.64L83.53 121.36L84.45 121.16L85.36 121.03Z'
add(f'<path d="{SALMON}" fill="{ORANGE}"/>')
add('<g fill="#C9CDD1">')
for i, a in enumerate(range(205, 320, 16)):
    rad = math.radians(a)
    cx, cy = 61 + 27 * math.cos(rad), 122 + 27 * math.sin(rad)
    add(f'<ellipse cx="{f(cx)}" cy="{f(cy)}" rx="1.8" ry="1.2" transform="rotate({a+90} {f(cx)} {f(cy)})"/>')
for (cx, cy) in [(90, 152), (93, 146)]:
    add(f'<ellipse cx="{cx}" cy="{cy}" rx="2" ry="1.3"/>')
add('</g></g>')
add(f'<circle cx="61" cy="122" r="37.5" fill="none" stroke="{DARK}" stroke-width="7"/>')

# оранжевые перекладины А1 и А2 (под ножками)
for (xa, xb) in (a1_cross, a2_cross):
    add(f'<rect x="{f(xa)}" y="{cross_y-6.5}" width="{f(xb-xa)}" height="13" fill="{ORANGE}"/>')
    add(f'<path d="M{f(xa+4)} {cross_y-5}l{f(xb-xa-6)} 9" stroke="#fff" stroke-opacity=".45" stroke-width="2" fill="none"/>')

# тёмные буквы с прожилками
add(f'<g mask="url(#okv-letters)">')
add(f'<rect x="100" y="80" width="500" height="100" fill="{DARK}"/>')
add(f'<g fill="none" stroke="{WAVE}" stroke-opacity=".17" stroke-width="1.7" transform="rotate(16 350 129)">')
for d in waves:
    add(f'<path d="{d}"/>')
add('</g></g>')

# «И» — кусок лосося
add(f'<g clip-path="url(#okv-i)"><rect x="183" y="94" width="34" height="69" fill="{ORANGE}"/>')
add('<g fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round">')
for y in (104, 125, 146):
    add(f'<path d="M180 {y}c8-3 14 0 20 5s12 6 20 2"/>')
add('</g></g>')

# правая ножка последней А — лосось
add('<g mask="url(#okv-a3leg)">')
add(f'<rect x="540" y="90" width="60" height="80" fill="{ORANGE}"/>')
add('<g fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round">')
for t in (0.42, 0.66, 0.9):
    px = split[0] + (r3[0] - split[0]) * t
    py = split[1] + (r3[1] - split[1]) * t
    add(f'<path d="M{f(px-14)} {f(py-4)}q14 -2 28 6"/>')
add('</g></g>')
# светлый стык тёмной и лососёвой частей
nx, ny = r3[0] - split[0], r3[1] - split[1]
Ln = math.hypot(nx, ny); nx, ny = nx / Ln, ny / Ln
px, py = -ny, nx
add(f'<path d="M{f(split[0]-px*H)} {f(split[1]-py*H)}L{f(split[0]+px*H)} {f(split[1]+py*H)}" stroke="#fff" stroke-width="2" stroke-linecap="round"/>')

add('</svg>')
open(sys.argv[1], 'w').write('\n'.join(out))
print('ok', sys.argv[1])
