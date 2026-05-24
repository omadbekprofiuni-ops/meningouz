import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type Lang = "uz" | "ru" | "en";

// Manba til — o'zbekcha (kalit). ru/en lug'atlari quyida.
const RU: Record<string, string> = {
  // Chrome / nav
  "Bosh sahifa": "Главная",
  "Tahlil": "Аналитика",
  "Xarita": "Карта",
  "Risk skrining": "Риск-скрининг",
  "Kabinet": "Кабинет",
  "Vaksinatsiya": "Вакцинация",
  "Choralar": "Меры",
  "Monitoring": "Мониторинг",
  "Klinik": "Клиника",
  "Profilaktika": "Профилактика",
  "Epidemiologik monitoring": "Эпидемиологический мониторинг",
  "Epidemiologik monitoring platformasi": "Платформа эпидемиологического мониторинга",
  "EPIDEMIK HOLAT: YUQORI": "ЭПИД. СИТУАЦИЯ: ВЫСОКАЯ",
  "Yangilangan: 17.04.2026": "Обновлено: 17.04.2026",
  "Epidemiolog": "Эпидемиолог",
  "O‘ZBEKISTON RESPUBLIKASI SOG‘LIQNI SAQLASH VAZIRLIGI": "МИНИСТЕРСТВО ЗДРАВООХРАНЕНИЯ РЕСПУБЛИКИ УЗБЕКИСТАН",
  " · Sanitariya-epidemiologik osoyishtalik agentligi (Sanepidqo‘m)": " · Агентство санитарно-эпидемиологического благополучия (Санэпидконтроль)",
  "— epidemiologik monitoring": "— эпидемиологический мониторинг",
  "Hudud yoki ko'rsatkich qidirish...": "Поиск региона или показателя...",
  "Epidemik holat: YUQORI": "Эпид. ситуация: ВЫСОКАЯ",
  " — Toshkent shahrida faol o‘choq (23-fevraldan beri).": " — Активный очаг в г. Ташкент (с 23 февраля).",
  "So‘nggi yangilanish: 17.04.2026": "Последнее обновление: 17.04.2026",
  "Bo‘limlar": "Разделы",
  "Ma‘lumot manbalari": "Источники данных",
  "Bog‘lanish": "Контакты",
  "Meningokokk infeksiyasi bo‘yicha epidemiologik monitoring va profilaktika platformasi.":
    "Платформа эпидемиологического мониторинга и профилактики менингококковой инфекции.",
  "© 2026 O‘zbekiston Respublikasi SSV · Sanepidqo‘m. Barcha huquqlar himoyalangan.":
    "© 2026 Минздрав Республики Узбекистан · Санэпидконтроль. Все права защищены.",
  "Ma‘lumotlar rasmiy hisobotlar asosida · Tibbiy maslahat o‘rnini bosmaydi.":
    "Данные основаны на официальных отчётах · Не заменяет медицинскую консультацию.",

  // Page headers
  "Chuqur tahlil": "Углублённая аналитика",
  "Profilaktika va epidemiyaga qarshi choralar": "Профилактика и противоэпидемические меры",
  "Vaksinatsiya va profilaktika": "Вакцинация и профилактика",
  "Tibbiyot xodimlari kabineti": "Кабинет медицинских работников",
  "Risk skrining kalkulyatori": "Калькулятор риск-скрининга",
  "Klinik reestr, laboratoriya natijalari va statistik hisobot":
    "Клинический реестр, результаты лабораторий и статотчёт",
  "Amalga oshirilgan tadbirlar va ССВ tavsiyalari (14.04.2026 holatiga)":
    "Проведённые мероприятия и рекомендации Минздрава (на 14.04.2026)",
  "Bemorda kuzatilayotgan simptomlarni belgilang — tizim avtomatik ravishda xavf darajasini hisoblaydi.":
    "Отметьте наблюдаемые симптомы — система автоматически рассчитает уровень риска.",

  // KPI / common labels
  "Intensivlik / 100k": "Интенсивность / 100т",
  "Bolalar ulushi": "Доля детей",
  "2025 ga nisbatan": "По сравнению с 2025",
  "Emlangan": "Привито",
  "Kimyoviy prof.": "Химиопроф.",
  "Vaksina (doza)": "Вакцина (доз)",
  "Emlanganlar": "Привитые",
  "Dozalar haridi": "Закупка доз",
  "Tib. xodimlari": "Медработники",
  "Vafot etgan": "Умерло",
  "Lab. tasdiq": "Лаб. подтв.",
  "Jarayonda": "В процессе",

  // Dashboard
  "Asosiy faktlar": "Ключевые факты",
  "So'nggi Yangiliklar": "Последние новости",
  "Kasallanish dinamikasi": "Динамика заболеваемости",
  "Oylik": "Месяц",
  "Haftalik": "Неделя",
  "Hududlar kesimida tahlil": "Анализ по регионам",
  "Yosh guruhlari kesimi": "Возрастные группы",
  "Kasallik o'choqlari": "Очаги заболевания",
  "SURTMA TOPSHIRDI": "СДАЛИ МАЗОК",
  "SOG'LOM TASHUVCHI": "НОСИТЕЛИ",
  "EMLANGANLAR": "ПРИВИТО",
  "KIMYOVIY PROFILAKTIKA": "ХИМИОПРОФИЛАКТИКА",

  // Map
  "Viloyatlar ro'yxati": "Список регионов",
  "Barchasi": "Все",
  "Yuqori xavf": "Высокий риск",
  "O'rta xavf": "Средний риск",
  "Past xavf": "Низкий риск",
  "Holatlar soni": "Число случаев",
  "Holat qayd etilmagan": "Случаи не зарегистрированы",
  "Tanlangan hudud": "Выбранный регион",
  "Holat": "Случаи",
  "Vafot": "Смерти",

  // Hero
  "Jonli o'choq monitoringi": "Мониторинг очага в реальном времени",
  "Toshkent shahri": "город Ташкент",
  "XAVF: YUQORI": "РИСК: ВЫСОКИЙ",
  "Meningokokk infeksiyasi o'chog'i": "Очаг менингококковой инфекции",
  "Kasallanganlar": "Заболевшие",
  "aprelda": "в апреле",
  "respublika": "республика",
  "Vafot etgan": "Умерло",
  "85% bolalar": "85% — дети",
  "Tuzalgan": "Выздоровело",
  "uyga chiqarilgan": "выписаны домой",
  "Lab. tasdiq": "Лаб. подтв.",
  "O'lim koeffitsiyenti (CFR)": "Коэффициент летальности (CFR)",

  // Highlights
  "Epidemiya 23-fevraldan (9-hafta) keskin ko'tarildi.": "Эпидемия резко выросла с 23 февраля (9-я неделя).",
  "Vafot etganlarning 85% — bolalar.": "85% умерших — дети.",
  "Holatlarning 97,5% — 14 yoshgacha bo'lgan bolalar.": "97,5% случаев — дети до 14 лет.",
  "Eng yuqori intensivlik: Sergeli (13,4) va Chilonzor (12,3).": "Наивысшая интенсивность: Сергели (13,4) и Чиланзар (12,3).",
  "Kasallikning ustun shakli — yashin tezligidagi meningokokksemiya.": "Преобладающая форма — молниеносная менингококцемия.",

  // Prevention cards
  "Surtma topshirdi": "Сдали мазок",
  "Sog'lom tashuvchi": "Носители",
  "Kimyoviy profilaktika": "Химиопрофилактика",
  "muloqotdagilar": "контактные лица",
  "aniqlangan (0,5%)": "выявлено (0,5%)",
  "tavsiya etilgan": "рекомендовано",

  // Chart captions / live updates
  "Epidemiya 9-haftada (23-fevral) keskin ko'tarildi.": "Эпидемия резко выросла на 9-й неделе (23 февраля).",
  "* Aprel — 17-aprelgacha bo'lgan ma'lumot.": "* Апрель — данные по 17 апреля.",
  "Toshkent shahri bo'yicha jami 277 ta holat ro'yxatga olindi. Aprel oyida 105 ta yangi holat qayd etildi.":
    "По г. Ташкент зарегистрировано 277 случаев. В апреле выявлено 105 новых случаев.",
  "Hokimiyatga ma'lumotnoma: 264 holat, 8,3/100k — 2025 yilga nisbatan 17,6 barobar ko'p. 183 ta (69,3%) lab. tasdiqlangan.":
    "Справка хокимияту: 264 случая, 8,3/100т — в 17,6 раза больше, чем в 2025. Лаб. подтверждено 183 (69,3%).",
  "1,5 oylik chaqaloq Saidov M.X. meningokokksemiya asoratidan vafot etdi (23-vafot holati).":
    "1,5-месячный младенец Саидов М.Х. умер от осложнений менингококцемии (23-й случай смерти).",
  "9-haftadan boshlab kasallanish keskin ko'tarildi. Epidemik ko'rsatma bo'yicha emlash boshlandi.":
    "С 9-й недели заболеваемость резко выросла. Начата вакцинация по эпидпоказаниям.",
  "Muloqotdagilardan 8 358 nafar surtma topshirdi, 3 502 nafar emlandi.":
    "Из контактных лиц 8 358 сдали мазок, 3 502 вакцинированы.",

  // Age / social labels
  "97,5% — 14 yoshgacha bo'lgan bolalar": "97,5% — дети до 14 лет",
  "ta": "шт.",
  "1 yoshgacha": "до 1 года",
  "1–2 yosh": "1–2 года",
  "3–5 yosh": "3–5 лет",
  "6–14 yosh": "6–14 лет",
  "15 yosh va katta": "15 лет и старше",
  "Holatlar qayerda qayd etilgani bo'yicha": "По месту регистрации случаев",
  "Uy bolalari": "Домашние дети",
  "Bog'cha (MTT)": "Детсад (ДДУ)",
  "Maktab": "Школа",
  "Kattalar": "Взрослые",

  // Radar (clinical)
  "Klinik belgilar profili": "Профиль клинических признаков",
  "Beмorlarda kuzatilgan belgilar chastotasi (%) — septik (meningokokksemiya) shakli ustun":
    "Частота признаков у больных (%) — преобладает септическая (менингококцемия) форма",
  "Chastota": "Частота",
  "Isitma >38°": "Лихорадка >38°",
  "Toshma": "Сыпь",
  "Qayt qilish": "Рвота",
  "Es-hush yo'qolishi": "Потеря сознания",
  "Meningial belgilar": "Менингеальные признаки",
  "Profil nimani ko'rsatadi?": "Что показывает профиль?",
  "Isitma va toshma deyarli har bir bemorda kuzatilgan — bu kasallikning eng erta va doimiy belgisi.":
    "Лихорадка и сыпь почти у каждого больного — самый ранний и постоянный признак болезни.",
  "Es-hush yo'qolishi va qayt qilish — og'ir intoksikatsiya alomatlari.":
    "Потеря сознания и рвота — признаки тяжёлой интоксикации.",
  "Meningial belgilar kam — bu o'choq meningokokksemiya (qon sepsisi) shaklida kechgani, klassik meningit emasligini ko'rsatadi. Shu sabab kasallik yashin tezligida kechib, yuqori letallikka olib kelgan.":
    "Менингеальные признаки редки — очаг протекал в форме менингококцемии (сепсиса крови), а не классического менингита. Поэтому болезнь протекала молниеносно и привела к высокой летальности.",

  // Table
  "ССВ ma'lumotnomasi": "Справка Минздрава",
  "Hudud": "Регион",
  "Jami Holat": "Всего случаев",
  "100k aholiga": "на 100т населения",
  "Xavf": "Риск",
  "Yuqori": "Высокий",
  "O'rta": "Средний",
  "Past": "Низкий",
  "JAMI": "ИТОГО",

  // Tahlil
  "Toshkent shahri · 277 holat kesimida statistik tahlil (14.04.2026–17.04.2026)":
    "Статистический анализ по г. Ташкент · 277 случаев (14.04.2026–17.04.2026)",
  "Tumanlar reytingi": "Рейтинг районов",
  "Toshkent shahridagi 12 tuman bo'yicha": "По 12 районам г. Ташкент",
  "Holatlar soni": "Число случаев",
  "Intensivlik (100k)": "Интенсивность (100т)",
  "† — tumanda qayd etilgan vafot soni. Rang: intensivlik darajasi (qizil ≥11, sariq ≥8).":
    "† — число смертей в районе. Цвет: уровень интенсивности (красный ≥11, жёлтый ≥8).",
  "Yosh taqsimoti": "Возрастное распределение",
  "14 yoshgacha bolalar — 97,5%": "Дети до 14 лет — 97,5%",
  "Ijtimoiy guruh / o'choq": "Социальная группа / очаг",
  "Holatlar qayerda qayd etilgani": "Где зарегистрированы случаи",
  "Laboratoriya natijalari": "Результаты лабораторий",
  "69.3% — N. meningitidis tasdiqlangan": "69,3% — подтверждён N. meningitidis",
  "Tasdiqlangan": "Подтверждено",
  "Aniqlanmagan": "Не выявлено",
  "Kasallik yakunlari": "Исходы заболевания",
  "1-son YuKSh · 292 bemor ro'yxatga olingan": "1-я ГИКБ · зарегистрировано 292 больных",
  "Ro'yxatga olingan": "Зарегистрировано",
  "Tuzalgan / chiqarilgan": "Выздоровело / выписано",
  "Davolanmoqda": "Лечатся",
  "Taxminiy yuqish manbalari": "Предполагаемые источники заражения",
  "Epidemiologik surishtiruv natijalari": "Результаты эпидрасследования",
  "Yopiq bolalar o'yingohlari (savdo majmualari)": "Закрытые детские игровые зоны (ТЦ)",
  "Oila a'zolari / yaqin qarindosh (sog'lom tashuvchi)": "Члены семьи / близкие (носители)",
  "\"Umra\" ziyoratidan kelganlar (O'RI belgili)": "Вернувшиеся из \"Умры\" (с признаками ОРИ)",
  "Jazoni o'tash muassasasi (1 xona)": "Исправительное учреждение (1 палата)",
  "31,4% holat savdo majmualaridagi yopiq bolalar o'yingohlarida yuqtirilgan deb gumon qilinmoqda.":
    "Предполагается, что 31,4% случаев заразились в закрытых детских игровых зонах ТЦ.",
  "2025 — 2026 taqqoslash": "Сравнение 2025 — 2026",
  "Kasallanish 17.6 barobar oshgan": "Заболеваемость выросла в 17,6 раза",
  "Toshkent shahar Hokimiyatiga ma'lumotnoma (14.04.2026), MKI beмorlar ro'yxati (17.04.2026), 2026 tumanlar jadvali, ССВ respublika ma'lumotnomasi (28.03.2026). Tumanlar kesimi 277 ta holatga asoslangan.":
    "Справка хокимияту г. Ташкент (14.04.2026), список больных МКИ (17.04.2026), таблица районов 2026, республиканская справка Минздрава (28.03.2026). Разрез по районам основан на 277 случаях.",
};

const EN: Record<string, string> = {
  "Bosh sahifa": "Home",
  "Tahlil": "Analytics",
  "Xarita": "Map",
  "Risk skrining": "Risk screening",
  "Kabinet": "Cabinet",
  "Vaksinatsiya": "Vaccination",
  "Choralar": "Measures",
  "Monitoring": "Monitoring",
  "Klinik": "Clinical",
  "Profilaktika": "Prevention",
  "Epidemiologik monitoring": "Epidemiological monitoring",
  "Epidemiologik monitoring platformasi": "Epidemiological monitoring platform",
  "EPIDEMIK HOLAT: YUQORI": "EPIDEMIC LEVEL: HIGH",
  "Yangilangan: 17.04.2026": "Updated: 17.04.2026",
  "Epidemiolog": "Epidemiologist",
  "O‘ZBEKISTON RESPUBLIKASI SOG‘LIQNI SAQLASH VAZIRLIGI": "MINISTRY OF HEALTH OF THE REPUBLIC OF UZBEKISTAN",
  " · Sanitariya-epidemiologik osoyishtalik agentligi (Sanepidqo‘m)": " · Sanitary-Epidemiological Welfare Agency",
  "— epidemiologik monitoring": "— epidemiological monitoring",
  "Hudud yoki ko'rsatkich qidirish...": "Search region or indicator...",
  "Epidemik holat: YUQORI": "Epidemic level: HIGH",
  " — Toshkent shahrida faol o‘choq (23-fevraldan beri).": " — Active outbreak in Tashkent city (since Feb 23).",
  "So‘nggi yangilanish: 17.04.2026": "Last updated: 17.04.2026",
  "Bo‘limlar": "Sections",
  "Ma‘lumot manbalari": "Data sources",
  "Bog‘lanish": "Contact",
  "Meningokokk infeksiyasi bo‘yicha epidemiologik monitoring va profilaktika platformasi.":
    "Epidemiological monitoring and prevention platform for meningococcal infection.",
  "© 2026 O‘zbekiston Respublikasi SSV · Sanepidqo‘m. Barcha huquqlar himoyalangan.":
    "© 2026 Ministry of Health of Uzbekistan · SanEpid. All rights reserved.",
  "Ma‘lumotlar rasmiy hisobotlar asosida · Tibbiy maslahat o‘rnini bosmaydi.":
    "Data based on official reports · Not a substitute for medical advice.",

  "Chuqur tahlil": "In-depth analytics",
  "Profilaktika va epidemiyaga qarshi choralar": "Prevention & anti-epidemic measures",
  "Vaksinatsiya va profilaktika": "Vaccination & prevention",
  "Tibbiyot xodimlari kabineti": "Medical staff cabinet",
  "Risk skrining kalkulyatori": "Risk screening calculator",
  "Klinik reestr, laboratoriya natijalari va statistik hisobot":
    "Clinical registry, lab results and statistical report",
  "Amalga oshirilgan tadbirlar va ССВ tavsiyalari (14.04.2026 holatiga)":
    "Measures taken and Ministry recommendations (as of 14.04.2026)",
  "Bemorda kuzatilayotgan simptomlarni belgilang — tizim avtomatik ravishda xavf darajasini hisoblaydi.":
    "Mark the observed symptoms — the system calculates the risk level automatically.",

  "Intensivlik / 100k": "Incidence / 100k",
  "Bolalar ulushi": "Children share",
  "2025 ga nisbatan": "vs 2025",
  "Emlangan": "Vaccinated",
  "Kimyoviy prof.": "Chemoprophylaxis",
  "Vaksina (doza)": "Vaccine (doses)",
  "Emlanganlar": "Vaccinated",
  "Dozalar haridi": "Doses purchased",
  "Tib. xodimlari": "Medical staff",
  "Vafot etgan": "Deaths",
  "Lab. tasdiq": "Lab confirmed",
  "Jarayonda": "In progress",

  "Asosiy faktlar": "Key facts",
  "So'nggi Yangiliklar": "Latest updates",
  "Kasallanish dinamikasi": "Incidence dynamics",
  "Oylik": "Monthly",
  "Haftalik": "Weekly",
  "Hududlar kesimida tahlil": "Analysis by region",
  "Yosh guruhlari kesimi": "Age groups",
  "Kasallik o'choqlari": "Disease settings",
  "SURTMA TOPSHIRDI": "SWABBED",
  "SOG'LOM TASHUVCHI": "CARRIERS",
  "EMLANGANLAR": "VACCINATED",
  "KIMYOVIY PROFILAKTIKA": "CHEMOPROPHYLAXIS",

  "Viloyatlar ro'yxati": "Regions list",
  "Barchasi": "All",
  "Yuqori xavf": "High risk",
  "O'rta xavf": "Medium risk",
  "Past xavf": "Low risk",
  "Holatlar soni": "Case count",
  "Holat qayd etilmagan": "No cases registered",
  "Tanlangan hudud": "Selected region",
  "Holat": "Cases",
  "Vafot": "Deaths",

  // Hero
  "Jonli o'choq monitoringi": "Live outbreak monitoring",
  "Toshkent shahri": "Tashkent city",
  "XAVF: YUQORI": "RISK: HIGH",
  "Meningokokk infeksiyasi o'chog'i": "Meningococcal infection outbreak",
  "Kasallanganlar": "Cases",
  "aprelda": "in April",
  "respublika": "republic",
  "Vafot etgan": "Deaths",
  "85% bolalar": "85% children",
  "Tuzalgan": "Recovered",
  "uyga chiqarilgan": "discharged home",
  "Lab. tasdiq": "Lab confirmed",
  "O'lim koeffitsiyenti (CFR)": "Case fatality rate (CFR)",

  "Epidemiya 23-fevraldan (9-hafta) keskin ko'tarildi.": "Epidemic surged from Feb 23 (week 9).",
  "Vafot etganlarning 85% — bolalar.": "85% of deaths are children.",
  "Holatlarning 97,5% — 14 yoshgacha bo'lgan bolalar.": "97.5% of cases are children under 14.",
  "Eng yuqori intensivlik: Sergeli (13,4) va Chilonzor (12,3).": "Highest incidence: Sergeli (13.4) and Chilonzor (12.3).",
  "Kasallikning ustun shakli — yashin tezligidagi meningokokksemiya.": "Predominant form — fulminant meningococcemia.",

  "Surtma topshirdi": "Swabbed",
  "Sog'lom tashuvchi": "Carriers",
  "Kimyoviy profilaktika": "Chemoprophylaxis",
  "muloqotdagilar": "contacts",
  "aniqlangan (0,5%)": "detected (0.5%)",
  "tavsiya etilgan": "recommended",

  "Epidemiya 9-haftada (23-fevral) keskin ko'tarildi.": "Epidemic surged in week 9 (Feb 23).",
  "* Aprel — 17-aprelgacha bo'lgan ma'lumot.": "* April — data through April 17.",
  "Toshkent shahri bo'yicha jami 277 ta holat ro'yxatga olindi. Aprel oyida 105 ta yangi holat qayd etildi.":
    "277 cases registered in Tashkent city. 105 new cases recorded in April.",
  "Hokimiyatga ma'lumotnoma: 264 holat, 8,3/100k — 2025 yilga nisbatan 17,6 barobar ko'p. 183 ta (69,3%) lab. tasdiqlangan.":
    "Report to khokimiyat: 264 cases, 8.3/100k — 17.6× more than 2025. 183 (69.3%) lab-confirmed.",
  "1,5 oylik chaqaloq Saidov M.X. meningokokksemiya asoratidan vafot etdi (23-vafot holati).":
    "A 1.5-month-old infant, Saidov M.X., died of meningococcemia complications (23rd death).",
  "9-haftadan boshlab kasallanish keskin ko'tarildi. Epidemik ko'rsatma bo'yicha emlash boshlandi.":
    "Incidence surged from week 9. Vaccination by epidemic indication began.",
  "Muloqotdagilardan 8 358 nafar surtma topshirdi, 3 502 nafar emlandi.":
    "Of contacts, 8,358 were swabbed and 3,502 vaccinated.",

  "97,5% — 14 yoshgacha bo'lgan bolalar": "97.5% — children under 14",
  "ta": "",
  "1 yoshgacha": "Under 1 year",
  "1–2 yosh": "1–2 years",
  "3–5 yosh": "3–5 years",
  "6–14 yosh": "6–14 years",
  "15 yosh va katta": "15 years and older",
  "Holatlar qayerda qayd etilgani bo'yicha": "By place of case registration",
  "Uy bolalari": "Home children",
  "Bog'cha (MTT)": "Kindergarten",
  "Maktab": "School",
  "Kattalar": "Adults",

  "Klinik belgilar profili": "Clinical signs profile",
  "Beмorlarda kuzatilgan belgilar chastotasi (%) — septik (meningokokksemiya) shakli ustun":
    "Frequency of signs in patients (%) — septic (meningococcemia) form predominates",
  "Chastota": "Frequency",
  "Isitma >38°": "Fever >38°",
  "Toshma": "Rash",
  "Qayt qilish": "Vomiting",
  "Es-hush yo'qolishi": "Loss of consciousness",
  "Meningial belgilar": "Meningeal signs",
  "Profil nimani ko'rsatadi?": "What does the profile show?",
  "Isitma va toshma deyarli har bir bemorda kuzatilgan — bu kasallikning eng erta va doimiy belgisi.":
    "Fever and rash in almost every patient — the earliest and most constant sign of the disease.",
  "Es-hush yo'qolishi va qayt qilish — og'ir intoksikatsiya alomatlari.":
    "Loss of consciousness and vomiting — signs of severe intoxication.",
  "Meningial belgilar kam — bu o'choq meningokokksemiya (qon sepsisi) shaklida kechgani, klassik meningit emasligini ko'rsatadi. Shu sabab kasallik yashin tezligida kechib, yuqori letallikka olib kelgan.":
    "Meningeal signs were rare — the outbreak ran as meningococcemia (blood sepsis), not classic meningitis. Hence the fulminant course and high lethality.",

  "ССВ ma'lumotnomasi": "Ministry report",
  "Hudud": "Region",
  "Jami Holat": "Total cases",
  "100k aholiga": "per 100k pop.",
  "Xavf": "Risk",
  "Yuqori": "High",
  "O'rta": "Medium",
  "Past": "Low",
  "JAMI": "TOTAL",

  // Tahlil
  "Toshkent shahri · 277 holat kesimida statistik tahlil (14.04.2026–17.04.2026)":
    "Statistical analysis for Tashkent city · 277 cases (14.04.2026–17.04.2026)",
  "Tumanlar reytingi": "District ranking",
  "Toshkent shahridagi 12 tuman bo'yicha": "Across the 12 districts of Tashkent",
  "Holatlar soni": "Case count",
  "Intensivlik (100k)": "Incidence (100k)",
  "† — tumanda qayd etilgan vafot soni. Rang: intensivlik darajasi (qizil ≥11, sariq ≥8).":
    "† — deaths recorded in the district. Color: incidence level (red ≥11, amber ≥8).",
  "Yosh taqsimoti": "Age distribution",
  "14 yoshgacha bolalar — 97,5%": "Children under 14 — 97.5%",
  "Ijtimoiy guruh / o'choq": "Social group / setting",
  "Holatlar qayerda qayd etilgani": "Where cases were registered",
  "Laboratoriya natijalari": "Laboratory results",
  "69.3% — N. meningitidis tasdiqlangan": "69.3% — N. meningitidis confirmed",
  "Tasdiqlangan": "Confirmed",
  "Aniqlanmagan": "Not detected",
  "Kasallik yakunlari": "Disease outcomes",
  "1-son YuKSh · 292 bemor ro'yxatga olingan": "City Infectious Hospital #1 · 292 patients registered",
  "Ro'yxatga olingan": "Registered",
  "Tuzalgan / chiqarilgan": "Recovered / discharged",
  "Davolanmoqda": "In treatment",
  "Taxminiy yuqish manbalari": "Suspected transmission sources",
  "Epidemiologik surishtiruv natijalari": "Epidemiological investigation results",
  "Yopiq bolalar o'yingohlari (savdo majmualari)": "Indoor children's playgrounds (malls)",
  "Oila a'zolari / yaqin qarindosh (sog'lom tashuvchi)": "Family members / close relatives (carriers)",
  "\"Umra\" ziyoratidan kelganlar (O'RI belgili)": "Returnees from \"Umrah\" (with ARI signs)",
  "Jazoni o'tash muassasasi (1 xona)": "Penal institution (1 cell)",
  "31,4% holat savdo majmualaridagi yopiq bolalar o'yingohlarida yuqtirilgan deb gumon qilinmoqda.":
    "An estimated 31.4% of cases are suspected to have been infected at indoor children's playgrounds in malls.",
  "2025 — 2026 taqqoslash": "2025 — 2026 comparison",
  "Kasallanish 17.6 barobar oshgan": "Incidence increased 17.6-fold",
  "Toshkent shahar Hokimiyatiga ma'lumotnoma (14.04.2026), MKI beмorlar ro'yxati (17.04.2026), 2026 tumanlar jadvali, ССВ respublika ma'lumotnomasi (28.03.2026). Tumanlar kesimi 277 ta holatga asoslangan.":
    "Report to Tashkent khokimiyat (14.04.2026), MKI patient list (17.04.2026), 2026 districts table, Ministry republic report (28.03.2026). District breakdown based on 277 cases.",
};

const DICT = { ru: RU, en: EN } as const;

interface I18nValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (s: string) => string;
}

const Ctx = createContext<I18nValue>({ lang: "uz", setLang: () => {}, t: (s) => s });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof localStorage !== "undefined") {
      const saved = localStorage.getItem("mng_lang") as Lang | null;
      if (saved === "uz" || saved === "ru" || saved === "en") return saved;
    }
    return "uz";
  });

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("mng_lang", l);
    } catch {}
    document.documentElement.lang = l;
  }, []);

  const t = useCallback(
    (s: string) => (lang === "uz" ? s : DICT[lang][s] ?? s),
    [lang]
  );

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);
