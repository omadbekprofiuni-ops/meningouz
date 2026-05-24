# MeningoUz — Meningokokk infeksiyasi monitoringi

O'zbekistonda (Toshkent shahri) meningokokk infeksiyasi epidemiologik
monitoringi, erta diagnostika va profilaktika platformasi. React + Vite + Tailwind
asosidagi **bir sahifali ilova (SPA)**.

## Ishga tushirish

```bash
npm i          # bog'lamlarni o'rnatish

npm run dev     # development server — http://localhost:5173
npm run build   # ishlab chiqarish uchun yig'ish (dist/)
npm start       # dist/ ni xizmat qiluvchi SPA server — http://localhost:3000
```

`npm start` — `server.mjs` (tashqi bog'lamsiz Node server). Barcha yo'llarni
`index.html` ga yo'naltiradi, shuning uchun sahifani yangilaganda ham SPA ishlaydi.

## Sahifalar (SPA, client-side routing)

| Yo'l            | Sahifa        | Tarkibi                                                       |
| --------------- | ------------- | ------------------------------------------------------------- |
| `/`             | Dashboard     | Gigant hisoblagichlar, CFR, Highlights, dinamika, klinik radar |
| `/tahlil`       | Tahlil        | Tuman reytingi, yosh/ijtimoiy, lab, yakun-funnel, 2025↔2026   |
| `/map`          | Xarita        | O'zbekiston choropleth (real GeoJSON), filtr, interaktiv      |
| `/risk`         | Risk skrining | Simptom kalkulyatori + profil solishtirish radari             |
| `/vaksinatsiya` | Vaksinatsiya  | ACYW135 vaksina ma'lumotlari, ko'rsatma/qarshi ko'rsatma      |
| `/choralar`     | Choralar      | Profilaktika tadbirlari, ogohlantirish kampaniyasi, tavsiyalar |
| `/kabinet`      | Kabinet       | Vafot reestri, laboratoriya statistikasi                      |
| `/login`        | Login         | Rol tanlash va kirish                                         |

Dizayn g'oyalari Worldometer, Our World in Data va ECDC Surveillance Atlas
kabi epidemiologik monitoring saytlaridan moslashtirilgan (gigant hisoblagich,
epi-egri, choropleth, CFR, age distribution, highlights).

## Ma'lumot manbalari (real data)

Barcha raqamlar quyidagi rasmiy hujjatlardan olingan (`src/app/data/`):

- **`stats.ts`** — Hokimiyatga ma'lumotnoma (14.04.2026), MKI ro'yxati (17.04.2026),
  ССВ respublika ma'lumotnomasi (28.03.2026). Lab, profilaktika, ogohlantirish,
  yuqish manbalari, yakunlar, taqqoslash.
- **`districts.ts`** — 2026 tumanlar jadvali: 12 tuman × (holat, intensivlik,
  vafot, yosh guruhi, ijtimoiy guruh, aholi). Jami 277 holat.
- **`uzbekistan-geo.ts`** — O'zbekiston ADM1 chegaralari (geoBoundaries/OSM, ODbL),
  SVG path'larga proyeksiya qilingan.
- **`deaths.ts`** — "Вафот этганлар" varaqasi (23 ta holat; F.I.Sh. faqat bosh
  harflar bilan, maxfiylik uchun).
- **`vaccine.ts`** — "Менингококковая полисахаридная вакцина ACYW135" yo'riqnomasi.

### Sana izohi (muhim)

- Dashboard sarlavhasi: **Toshkent sh. = 277** (17.04.2026 — eng so'nggi ro'yxat).
- Hududlar jadvali va xarita: **ССВ 28.03.2026 kesimi** (respublika 235, shu jumladan
  Toshkent sh. 173). Ikki raqam ham haqiqiy — turli sanalarga oid, har joyda sana
  ko'rsatilgan.
