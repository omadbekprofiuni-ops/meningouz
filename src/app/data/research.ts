// ============================================================================
// Dissertatsiya metama'lumotlari va akademik ramka.
// Muallif tomonidan berilgan rasmiy ma'lumotlar bilan to'ldirilgan.
// [KVADRAT QAVS] ichidagi joylar — hali noma'lum faktlar (himoya yili, etika
// bayonnomasi), real qiymatlar bilan to'ldiriladi.
// ============================================================================

export const RESEARCH = {
  // --- Rasmiy identifikatsiya ---
  title:
    "Tashkillashtirilgan turli ta'lim tashkilotlarida meningokokk infeksiyasining " +
    "tarqalishini gigiyenik va epidemiologik baholash hamda profilaktikasini takomillashtirish",
  author: {
    name: "Mustanov Azamat Yunusovich",
    role: "Tadqiqotchi · epidemiolog",
  },
  advisors: [
    "D.Sh. Alimuxamedov — 14.00.07 «Gigiyena» yo'nalishi bo'yicha ilmiy rahbar",
    "N.O. Komilov — 14.00.30 «Epidemiologiya» yo'nalishi bo'yicha ilmiy rahbar",
  ],
  institution:
    "Toshkent davlat tibbiyot universiteti · Bolalar, o'smirlar va ovqatlanish gigiyenasi kafedrasi",
  specialties: ["14.00.07 — Gigiyena", "14.00.30 — Epidemiologiya"],
  defenseYear: "[Himoya yili]",
  ethicsApproval: "[Etika komissiyasi bayonnomasi № __, sana]",

  // --- Tadqiqot ramkasi ---
  period: "2016–2026-yillar (retrospektiv va operativ epidemiologik tahlil)",
  setting:
    "Toshkent shahri · Toshkent viloyati · Qoraqalpog'iston Respublikasi · O'zbekiston Respublikasi · " +
    "turli tashkillashtirilgan ta'lim tashkilotlari (MTT, maktab, internat)",
  design:
    "Gigiyenik-epidemiologik, retrospektiv va operativ tahlil; vaqtli qatorlarni TBATS " +
    "eksponensial model bilan башоратлаш; molekulyar-biologik (16S rRNK) diagnostikani baholash",
  software: "R (forecast/TBATS, epiR), Microsoft Excel",

  // --- Kirish ---
  intro: [
    "Meningokokk infeksiyasi (MI) — Neisseria meningitidis qo'zg'atadigan, havo-tomchi yo'li bilan " +
      "yuqadigan, yashin tezligida kechib, yuqori o'lim va nogironlik bilan xavfli antroponoz infeksiya. " +
      "Kasallikning asosiy zaif guruhi — bolalar va o'smirlar bo'lib, og'ir generalizatsiyalangan " +
      "shakllar (meningit, meningokokksemiya) aynan shu yoshda ko'p uchraydi.",
    "Tashkillashtirilgan ta'lim tashkilotlari (bog'cha, maktab, internat) — bolalar uzoq vaqt yopiq, " +
      "gavjum sharoitda birga bo'ladigan muhit. Aholi zichligi, havo almashinuvining yetishmasligi, " +
      "shaxsiy gigiyenaga rioya darajasi va sog'lom tashuvchanlik MIning tarqalishini belgilovchi asosiy " +
      "gigiyenik omillardir. Shu bois MI epidemiologiyasini aynan ta'lim muhiti kesimida o'rganish " +
      "profilaktikaning samaradorligini oshirishda hal qiluvchi ahamiyatga ega.",
    "O'zbekistonda so'nggi o'n yillikda MI bilan kasallanish past, sporadik darajada kechgan bo'lsa-da, " +
      "2019-yilda va 2026-yilgi Toshkent o'chog'ida kuzatilgan keskin ko'tarilishlar kasallikning " +
      "davriy epidemik salohiyatini ko'rsatadi. Bu esa kasallanishning ko'p yillik dinamikasini tahlil " +
      "qilish va kelajakdagi epidemik ko'tarilishlarni oldindan башоратлашни taqozo etadi.",
    "Ushbu tadqiqot turli ta'lim tashkilotlaridagi bolalar orasida MI tarqalishiga ta'sir qiluvchi " +
      "gigiyenik va epidemiologik omillarni 2016–2026-yillar kesimida kompleks baholaydi, vaqtli " +
      "qatorlarni TBATS eksponensial model bilan башоратлайди hamda 16S rRNK asosidagi molekulyar-biologik " +
      "diagnostikaning samaradorligini taqdim etadi.",
  ],

  aim:
    "Bolalar va o'smirlar orasida meningokokk infeksiyasining tarqalish sabablarini gigiyenik va " +
    "epidemiologik baholash orqali profilaktik chora-tadbirlarni takomillashtirish.",

  objectives: [
    "Tashkillashtirilgan turli ta'lim tashkilotlarida meningokokk infeksiyasining tarqalishiga ta'sir " +
      "qiluvchi omillarni gigiyenik va epidemiologik tahlil qilish.",
    "Ta'lim muassasalarida sanitar-gigiyenik hamda epidemiologik holat, havo almashinuvi, aholi zichligi, " +
      "shaxsiy gigiyenaga rioya qilish darajasi va profilaktik chora-tadbirlarning samaradorligini baholash.",
    "Turli ta'lim tashkilotlaridagi bolalar orasida meningokokk infeksiyasi tarqalishini 2016–2026-yillar " +
      "orasida operativ va retrospektiv tahlillar orqali gigiyenik baholash.",
    "Tashkillashtirilgan turli ta'lim tashkilotlari va jamoalarda meningokokk infeksiyasining oldini " +
      "olishning profilaktik chora-tadbirlari samaradorligini baholash algoritmini ishlab chiqish.",
    "Meningokokk infeksiyasini aniqlashda zamonaviy laborator usullar — 16S rRNK (kichik ribosomal RNK) " +
      "asosidagi molekulyar-biologik tekshiruvlarning diagnostik ahamiyati va samaradorligini baholash.",
  ],

  hypothesis:
    "Tashkillashtirilgan ta'lim tashkilotlarida aholi zichligi, havo almashinuvining yetishmasligi va " +
    "shaxsiy gigiyena darajasi meningokokk infeksiyasi tarqalishining asosiy boshqariladigan gigiyenik " +
    "xavf omillaridir; 16S rRNK asosidagi molekulyar-biologik diagnostika aniqlash sezgirligini oshirib, " +
    "epidemik o'choqni erta nazorat qilish imkonini beradi.",

  inclusion: [
    "2016–2026-yillarda ta'lim tashkilotlari va jamoalarda ro'yxatga olingan meningokokk infeksiyasi holatlari.",
    "Klinik va/yoki laboratoriya (shu jumladan 16S rRNK) mezonlari bo'yicha tasdiqlangan yoki ehtimoliy holatlar.",
  ],
  exclusion: [
    "Boshqa etiologiyali meningit/sepsis holatlari.",
    "Ma'lumotlari to'liq bo'lmagan, tasniflab bo'lmaydigan yozuvlar.",
  ],

  methods: [
    "Ko'p yillik kasallanish dinamikasini retrospektiv va operativ epidemiologik tahlil (2016–2026).",
    "Kasallanish intensivligi 100 000 aholiga normallashtirilgan (hududiy taqqoslash uchun).",
    "Vaqtli qatorlarni TBATS eksponensial model bilan башоратлаш (R, forecast paketi).",
    "Nisbatlar va kasallanish nisbatlari uchun 95% ishonch oralig'i (Wilson / Poisson).",
    "16S rRNK asosidagi molekulyar-biologik diagnostikaning sezgirlik va xosligini baholash.",
    "Ta'lim muassasalarida sanitar-gigiyenik holat va havo almashinuvini gigiyenik baholash.",
  ],

  novelty:
    "O'zbekistonda turli ta'lim tashkilotlari kesimida meningokokk infeksiyasi epidemiologiyasini gigiyenik " +
    "omillar bilan bog'lab tahlil qilgan, TBATS modeli asosida 25 yillik башоратни taqdim etgan va 16S rRNK " +
    "molekulyar diagnostikasi samaradorligini baholagan birinchi interaktiv, manba-shaffof raqamli platforma.",

  ethicsNote:
    "Tadqiqot Xelsinki deklaratsiyasi va O'zbekiston «Shaxsiy ma'lumotlar to'g'risida»gi qonuniga " +
    "muvofiq olib borilgan. Bemor identifikatorlari niqoblangan (R.M.S.); shaxsni aniqlovchi " +
    "ma'lumotlar ommaviy ko'rinishdan chiqarilgan.",

  // --- 1-rasm: ko'p yillik dinamika (2012–2021) ---
  dynamics: {
    image: "/research/dynamics-2012-2021.jpg",
    figNo: "1-rasm",
    caption:
      "Toshkent shahri, Toshkent viloyati, Qoraqalpog'iston va O'zbekiston Respublikasida meningokokk " +
      "infeksiyasi bilan kasallanishning ko'p yillik dinamikasi, 2012–2021-yy. (100 000 aholiga nisbatan)",
    source: "O'zR SSV Sanepidqo'm forma-1 yillik hisobotlari (2012–2021)",
    peak: { year: 2019, republic: 6.0, city: 4.6 },
    points: [
      "2012–2018-yillarda kasallanish past, sporadik darajada kechgan (respublika bo'yicha 100 ming aholiga 0,5 dan past).",
      "2019-yilda keskin epidemik ko'tarilish kuzatilgan: respublika bo'yicha ~6,0 va Toshkent shahrida ~4,6/100 000 — kuzatilgan davrning eng yuqori cho'qqisi.",
      "2020–2021-yillarda COVID-19 cheklovlari, masofaviy ta'lim va aholi harakatining qisqarishi natijasida kasallanish keskin pasaygan (~0).",
      "Toshkent shahri ko'rsatkichi respublika o'rtachasiga eng yaqin yetakchi bo'lib qolmoqda — bu urbanizatsiya, aholi zichligi va ta'lim tashkilotlaridagi gavjumlik bilan izohlanadi.",
    ],
  },

  // --- 2-rasm: TBATS eksponensial model bilan башоратлаш ---
  forecast: {
    image: "/research/tbats-forecast.jpg",
    figNo: "2-rasm",
    caption: "TBATS eksponensial model asosida kasallanishni башоратлаш natijalari",
    model: "TBATS(0.015, {1,0}, 0.973, {<18,4>})",
    legend:
      "T — Trigonometrik mavsumiylik · B — Boks-Koks o'zgarishi · A — ARIMA xatolari · " +
      "T — Trend · S — mavsumiy komponentlar",
    horizonYears: 25,
    peaks: [
      { year: "2024", cases: "≈31" },
      { year: "2037", cases: "≈29" },
      { year: "2042", cases: "≈25" },
      { year: "2054–2057", cases: "21–52" },
    ],
    points: [
      "TBATS modeli eksponensial silliqlashni qo'llagan holda murakkab, ko'p sonli mavsumiy komponentli vaqtli qatorlarni башоратлайди.",
      "Tarixiy qator yuqori bazadan bosqichma-bosqich pasayishni va 2001 hamda 2019-yillardagi davriy cho'qqilarni ko'rsatadi.",
      "25 yillik башорат epidemik ko'tarilishlarni 2024 (≈31 holat), 2037 (≈29), 2042 (≈25) va 2054–2057 (≈21–52 holat) yillarda башоратламоқда — taxminan 13–18 yillik davriylik.",
      "Modelning amaliy ahamiyati: башорат қилинган cho'qqilardan oldin vaksina zaxirasini yaratish va ta'lim tashkilotlarida profilaktikani kuchaytirish zarur.",
      "Cheklov: башорат ishonch oralig'i kelajakka qarab kengayadi, ya'ni uzoq muddatli baholarning noaniqligi ortadi.",
    ],
  },

  // --- Serologik diagnostika: ELISA (IgM/IgG) ---
  // Antimeningokokk zardob antitanalarini (IgM/IgG) ELISA orqali miqdoriy aniqlash bo'yicha
  // adabiyot abstrakti. Matn 3 tilda (uz/ru/en) — tarjimalar i18n.tsx dagi RU/EN lug'atida.
  serology: {
    title: "Serologik diagnostika — ELISA (IgM/IgG)",
    abstract:
      "Antimeningokokk zardob IgM va IgG antitanalarini miqdoriy o'lchash uchun ferment bilan " +
      "bog'langan immunosorbent tahlil (ELISA) ishlab chiqildi. Antigen qoplamasi sifatida B:15 " +
      "meningokokk shtammi qo'llanildi; klass-spetsifik antitanalar ishqoriy fosfataza bilan " +
      "markerlangan quyon anti-inson IgM yoki IgG konyugati yordamida aniqlandi.",
    method: [
      "Antigen qoplamasi: B:15 meningokokk shtammi (butun bakterial hujayrali ELISA).",
      "Konyugat: ishqoriy fosfataza bilan markerlangan quyon anti-inson IgM yoki IgG.",
      "Maqsad: zardobdagi spetsifik IgM va IgG antitanalarni miqdoriy aniqlash.",
    ],
    findings: [
      "Spetsifik IgG faolligi sog'lom meningokokk tashuvchilarining zardobida tashuvchi bo'lmaganlarnikiga qaraganda yuqori bo'ldi, biroq farq statistik jihatdan ahamiyatli emas edi.",
      "Antimeningokokk IgM antitanalari tashuvchilarda tashuvchi bo'lmaganlarga nisbatan ko'proq uchradi.",
      "Fulminant meningokokk kasalligi bo'lgan 34 bemorning o'tkir zardoblarida sog'lom tashuvchi va tashuvchi bo'lmaganlarga nisbatan spetsifik IgG kamroq, IgM darajasi esa yuqoriroq aniqlandi.",
      "Kasalxonada yotgan 18 bemordan 15 tasida (15/18) o'tkir va rekonvalessent zardoblarda IgG va IgM antitanalar miqdorining oshishi kuzatildi.",
    ],
    performance: [
      {
        label: "Sezgirlik (sensitivity)",
        value: "83%",
        note: "IgG va IgM o'lchovlarini birlashtirib, 18 bemordan 15 tasida antitana o'sishi aniqlandi (15/18).",
      },
      {
        label: "Xoslik (specificity)",
        value: "93%",
        note: "Meningokokk infeksiyasi bo'lmagan 118 kishidan faqat 8 tasida spetsifik IgM antitanalari aniqlandi.",
      },
    ],
    conclusion:
      "Butun bakterial ELISA testi orqali spetsifik antimeningokokk IgG antitanalarini miqdoriy " +
      "aniqlash — alohida shaxslarda hamda epidemiologik tadqiqotlarda meningokokk kasalligiga " +
      "qarshi immunitetni o'rganish uchun foydali test bo'lishi mumkin. IgG va IgM testlarini " +
      "birgalikda qo'llash qon yoki orqa miya suyuqligi tahlillari salbiy bo'lgan hollarda " +
      "meningokokk kasalligini tashxislashda foydalidir.",
    source: "[Iqtibos: muallif, jurnal, yil — to'ldiriladi]",
  },
};
