"""Генератор векторного логотипа «ОКИАНАВА» (координаты как у исходного PNG 600×210)."""
import math, sys

DARK = '#30363C'      # графит букв, кольца и палочек
ORANGE = '#F25C22'    # лосось
WAVE = '#FFFFFF'      # светлые прожилки на тёмных буквах (с прозрачностью)
SW = 18               # толщина штриха букв
H = SW / 2
TOP, BOT = 95, 163    # верх и низ букв
Y0, Y1 = TOP + H, BOT - H  # осевые линии
YM = (TOP + BOT) / 2

def f(v):
    return f'{v:.2f}'.rstrip('0').rstrip('.')

out = []
add = out.append

# ---------- буквы как осевые линии (толщина задаётся штрихом) ----------
def A_paths(x):  # x — левый край буквы, ширина 66
    w = 66
    ax = x + w / 2
    l = (x + H, Y1)
    r = (x + w - H, Y1)
    apex = (ax, Y0)
    return l, apex, r

APEX_HALF = 5.5  # половина ширины плоской вершины А
def A_d(l, apex, r):
    return (f'M{f(l[0])} {f(l[1])}L{f(apex[0]-APEX_HALF)} {f(apex[1])}'
            f'H{f(apex[0]+APEX_HALF)}L{f(r[0])} {f(r[1])}')

dark_strokes = []   # пути тёмных букв (для маски и заливки)

# К
kx = 123
dark_strokes.append(f'M{f(kx+H)} {f(Y0)}V{f(Y1)}')
dark_strokes.append(f'M{f(kx+48-H)} {f(Y0)}L{f(kx+H+5)} {f(YM)}L{f(kx+48-H)} {f(Y1)}')

# А1
a1 = 227
l, apex, r = A_paths(a1)
dark_strokes.append(A_d(l, apex, r))
cross_y = 141
def leg_x(p0, p1, y):
    top = (p1[0] - APEX_HALF if p0[0] < p1[0] else p1[0] + APEX_HALF, p1[1])
    return p0[0] + (top[0] - p0[0]) * (y - p0[1]) / (top[1] - p0[1])
a1_cross = (leg_x(l, apex, cross_y), leg_x(r, apex, cross_y))

# Н
hx = 307
hw = 62
dark_strokes.append(f'M{f(hx+H)} {f(Y0)}V{f(Y1)}M{f(hx+hw-H)} {f(Y0)}V{f(Y1)}M{f(hx+H)} {f(YM)}H{f(hx+hw-H)}')

# А2
a2 = 381
l2, apex2, r2 = A_paths(a2)
dark_strokes.append(A_d(l2, apex2, r2))
a2_cross = (leg_x(l2, apex2, cross_y), leg_x(r2, apex2, cross_y))

# В
bx = 459
sx = bx + H
top_r = (YM + 1 - Y0) / 2
bot_r = (Y1 - (YM + 1)) / 2
dark_strokes.append(
    f'M{f(sx)} {f(Y1)}V{f(Y0)}H{f(bx+50-H-top_r)}'
    f'A{f(top_r)} {f(top_r)} 0 0 1 {f(bx+50-H-top_r)} {f(YM+1)}H{f(sx)}'
    f'M{f(bx+54-H-bot_r)} {f(YM+1)}'
    f'A{f(bot_r)} {f(bot_r)} 0 0 1 {f(bx+54-H-bot_r)} {f(Y1)}H{f(sx)}'
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
add('</g></mask>')
# маска правой ножки А3 (лосось)
add('<mask id="okv-a3leg" maskUnits="userSpaceOnUse" x="0" y="0" width="600" height="210">')
add(f'<path d="M{f(split[0])} {f(split[1])}L{f(r3[0])} {f(r3[1])}" stroke="#fff" stroke-width="{SW}" stroke-linecap="round" fill="none"/>')
add('</mask>')
# круг ролла
add('<clipPath id="okv-roll"><circle cx="61" cy="122" r="34.5"/></clipPath>')
# кусок лосося «И»
add('<clipPath id="okv-i"><rect x="183" y="95" width="33" height="68" rx="16.5"/></clipPath>')
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
add(f'<path d="M24 124C30 122 36 116 44 110C52 104 60 101 70 101C80 101 88 103 99 99V140C93 142 88 145 85 150C78 156 58 157 44 151C36 148 30 144 24 140Z" fill="{ORANGE}"/>')
add('<g fill="none" stroke="#fff" stroke-linecap="round">')
add('<path d="M22 137C32 136 40 132 48 126C56 120 64 115 74 114C84 113 92 115 100 113" stroke-width="3.6"/>')
add('<path d="M81 150.5c2-7 8-11 15-9.5" stroke-width="2.6"/>')
add('</g>')
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
    add(f'<rect x="{f(xa)}" y="{cross_y-7.5}" width="{f(xb-xa)}" height="15" fill="{ORANGE}"/>')
    add(f'<path d="M{f(xa+4)} {cross_y-6}l{f(xb-xa-6)} 11" stroke="#fff" stroke-opacity=".45" stroke-width="2.2" fill="none"/>')

# тёмные буквы с прожилками
add(f'<g mask="url(#okv-letters)">')
add(f'<rect x="100" y="80" width="500" height="100" fill="{DARK}"/>')
add(f'<g fill="none" stroke="{WAVE}" stroke-opacity=".17" stroke-width="1.7" transform="rotate(16 350 129)">')
for d in waves:
    add(f'<path d="{d}"/>')
add('</g></g>')

# «И» — кусок лосося
add(f'<g clip-path="url(#okv-i)"><rect x="183" y="95" width="33" height="68" fill="{ORANGE}"/>')
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
