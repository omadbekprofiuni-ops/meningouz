Yaxshi reference. Ikki rasmni chuqur tahlil qildim. Endi custom prompt yozaman.

**Worldometers tahlili:**
- Kuchli tomoni: raqamlar dominant, chart va jadval bir sahifada, tab navigatsiya
- Zaif tomoni: eskirgan dizayn, reklamalar, rang sxemasi 2012 yildan, mobil emas
- Jadval (2-rasm): mazmunli lekin vizual jihatdan og'ir, rangsiz, o'qish qiyin

MeningoUz uchun shu funksionallikni olib, zamonaviy qilamiz.

---

**FIGMA PROMPT — MeningoUz Custom Design**

---

**Dizayn falsafasi:**
Worldometers funksionalligini olib, Linear.app/Vercel estetikasini qo'sh. Raqamlar gapirsin, dizayn jimgina ishlayversin. Har bir piksel ma'lumot uchun. Reklama yo'q, shovqin yo'q.

---

**Rang palitasi:**
```
Primary green:    #10B981  (asosiy accent — meningokokk monitoring)
Dark green:       #059669  (hover, active states)
Light green bg:   #ECFDF5  (highlight cards)

Danger red:       #EF4444  (yuqori xavf, o'lim holatlari)
Warning amber:    #F59E0B  (o'rta xavf, ogohlantirish)
Info blue:        #3B82F6  (vaksinatsiya, ma'lumot)

Page bg:          #FAFAFA
Card bg:          #FFFFFF
Sidebar bg:       #0F172A
Border:           #E5E7EB  (0.5px)
Text primary:     #111827
Text secondary:   #6B7280
Text muted:       #9CA3AF
```

**Typography: Inter (Google Fonts)**
```
Hero raqam:    Inter 600, 56px  (jami holat soni)
H1 sarlavha:   Inter 600, 24px
H2:            Inter 600, 18px
Body:          Inter 400, 14px, line-height 1.6
Label:         Inter 500, 12px, letter-spacing 0.04em
Mono (raqam):  Inter 600, tabular-nums
```

---

**EKRAN 1 — Bosh sahifa (Dashboard)**

Layout: Left sidebar (64px, qora) + Top header (56px) + Content area

**Sidebar:**
- Logo: "M" harfi yashil kvadratda, 36px
- Nav ikonkalar: Dashboard / Monitoring / Xarita / Risk / Vaksinatsiya / Kabinet
- Pastda: Sozlamalar + Profil avatar
- Active state: ikonka yashil, yupqa yashil chiziq chapda

**Top header:**
- Chap: "Dashboard" — Inter 600 18px + "O'zbekiston · Real vaqt" muted
- O'rta: search bar ("Viloyat yoki bemor qidirish...")
- O'ng: Bell ikonka (badge bilan) + "Dr. Aliyev" avatar + dropdown

**Hero stats (header ostida, 4 ta karta):**
```
┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│  Jami holat │ │  Faol holat │ │  Tuzalgan   │ │  Vafot      │
│   12,847    │ │    1,247    │ │   11,340    │ │     260     │
│  ↑ 84 bugun │ │  ↑ 12 yangi │ │  ↑ 67 bugun │ │  ↓ 2 bugun  │
└─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘
```
Har karta: oq bg, 1px border, radius-12, chapda 4px colored accent line.
Yuqori qismdagi delta: ko'k yoki qizil badge, strelka bilan.

**Asosiy content (2 ustun, 60/40 split):**

Chap (60%):
- **"Kunlik yangi holatlар"** — Worldometers grafiga o'xshash lekin zamonaviy
- Tab: Kunlik / Haftalik / Oylik / Yillik
- Chart: Area chart, fill #10B981 at 15% opacity, line #10B981 2px
- X-axis: Oylar (Jan 2024 → May 2025)
- Y-axis: 0, 50, 100, 150, 200
- Hover tooltip: qora bg, oq matn, sana + son
- Past: "7 kunlik o'rtacha" toggle — yashil punktir chiziq

O'ng (40%):
- **O'zbekiston xaritasi** — SVG choropleth
- 14 viloyat, har biri holat zichligiga qarab ranglanadi:
  - 0–50 holat: #D1FAE5 (och yashil)
  - 51–200: #6EE7B7
  - 201–500: #10B981
  - 501–1000: #F59E0B
  - 1000+: #EF4444
- Hover: viloyat ismi + holat soni tooltip
- Pastda: rang legendasi

**Viloyatlar jadvali (full width, pastda):**
Worldometers country table analogiyasi — lekin yaxshilangan:

```
Rank  Viloyat        Jami  Faol   Tuzalgan  Vafot  100k ga  Vaksin%
 1    Toshkent sh.   3,241  312    2,890      39    67.2     72%
 2    Samarqand      2,180  218    1,930      32    45.1     61%
 3    Farg'ona       1,670  167    1,478      25    38.9     58%
...
```
- Header: yupqa, muted, harflar uppercase 11px
- Row hover: #F9FAFB background
- Rank: doira ichida raqam, top 3 uchun yashil/amber/coral
- Holat soni: bold, tabular-nums
- Vaksinatsiya %: inline progress bar (kichik, 60px kenglik)
- Pagination: past o'ngda, minimal

---

**EKRAN 2 — Interaktiv xarita (to'liq sahifa)**

- Xarita to'liq content area ni egallaydi
- Yuqorida: filter panel (viloyat multi-select, sana range picker, xavf darajasi toggle)
- Xarita ustida floating cards: hover qilganda viloyat statistikasi
- O'ng tomonda: collapsible panel — viloyat ro'yxati + mini bar chartlar
- Zoom in/out tugmalari (+ / −), pastda legend

---

**EKRAN 3 — Risk skrining**

- Chap: Simptom kartalar (checkbox style)
  - Har karta: ikonka + simptom nomi + qisqa tavsif
  - Tanlangan: yashil border + yashil bg
  - 12 ta simptom: isitma, bosh og'riq, bo'yin qotishi, toshmalar va h.k.
- O'ng: Real-time risk kalkulyator
  - Katta doira progress indicator: 0–100 risk score
  - Rang: yashil (0–30) → amber (31–60) → qizil (61–100)
  - Ostida: tavsiyalar ro'yxati
  - "Shoshilinch murojaat" tugmasi — faqat 60+ da ko'rinadi, qizil, pulse animation

---

**EKRAN 4 — Login**

- Markazda: Logo + "MeningoUz" + "Sog'liqni saqlash monitoring tizimi"
- Rol tanlash: 3 ta karta (SuperAdmin / Shifokor / Epidemiolog) — tanlangani yashil border
- Email + Parol inputlar
- "Tizimga kirish" — to'liq kenglik, yashil
- Footer: "O'zbekiston SSV tasdiqlagan tizim"

---

**Komponent kutubxonasi (Figma Components):**

1. `StatHero` — katta raqam + label + delta
2. `AreaChart` — parametrli (color, data, tabs)
3. `UzbekMap` — viloyat highlight bilan
4. `RegionTableRow` — rank + viloyat + statslar + progress
5. `RiskMeter` — doira + ball + rang
6. `SymptomCard` — checkbox card
7. `SidebarNav` — item + active state
8. `FilterBar` — dropdown + date range + toggle
9. `AlertBadge` — Yuqori/O'rta/Past
10. `PatientRow` — ism + holat + amallar

---

**Responsive:**
- Desktop 1440px: asosiy ekranlar
- Tablet 768px: sidebar collapsed, 1 ustun layout
- Mobile 375px: faqat Login + Risk skrining + Xarita

---

**Deliver etish:**
- Figma file: 1 page per screen, auto layout
- Design tokens: rang + spacing alohida
- Prototype: Login → Dashboard → Xarita → Risk skrining flow