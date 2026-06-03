import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

export type Lang = "uz" | "ru" | "en";

// Brauzer yorlig'i (document.title) — har til uchun (issue #7, SEO/a11y)
const TITLES: Record<Lang, string> = {
  uz: "MeningoUz — Meningokokk infeksiyasi monitoringi",
  ru: "MeningoUz — Мониторинг менингококковой инфекции",
  en: "MeningoUz — Meningococcal infection monitoring",
};

// Raqam formatlash locali — uz/ru: vergul (kasr) + bo'sh joy (ming);
// en: nuqta (kasr) + vergul (ming). Intl orqali (issue #13).
const LOCALE: Record<Lang, string> = { uz: "uz-UZ", ru: "ru-RU", en: "en-US" };

// Manba til — o'zbekcha (kalit). ru/en lug'atlari quyida.
const RU: Record<string, string> = {
  // Chrome / nav
  "Bosh sahifa": "Главная",
  "Tahlil": "Аналитика",
  "Statistika": "Статистика",
  "Xarita": "Карта",
  "Metodologiya": "Методология",
  "Risk skrining": "Риск-скрининг",
  "Tadqiqot": "Исследование",
  "Akademik": "Академический",
  "2025 yilga nisbatan": "по сравнению с 2025",
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
  "Sanitariya-epidemiologik osoyishtalik agentligi (Sanepidqo‘m)": "Агентство санитарно-эпидемиологического благополучия (Санэпидконтроль)",
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
  "Amalga oshirilgan tadbirlar va SSV tavsiyalari (14.04.2026 holatiga)":
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
  "yangi holat · aprel (1–17.04)": "новых случаев · апрель (1–17.04)",
  "respublika": "республика",
  "83% bolalar": "83% — дети",
  "Tuzalgan": "Выздоровело",
  "uyga chiqarilgan": "выписаны домой",
  "O'lim koeffitsiyenti (CFR)": "Коэффициент летальности (CFR)",

  // Highlights
  "Epidemiya 23-fevraldan (9-hafta) keskin ko'tarildi.": "Эпидемия резко выросла с 23 февраля (9-я неделя).",
  "Vafot etganlarning 83% — bolalar.": "83% умерших — дети.",
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
  "1,5 oylik chaqaloq (Yashnobod tumani) meningokokksemiya asoratidan vafot etdi (23-vafot holati).":
    "1,5-месячный младенец (Яшнабадский район) умер от осложнений менингококцемии (23-й случай смерти).",
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
  "Bemorlarda kuzatilgan belgilar chastotasi (%) — septik (meningokokksemiya) shakli ustun":
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
  "SSV ma'lumotnomasi": "Справка Минздрава",
  "Hudud": "Регион",
  "Jami Holat": "Всего случаев",
  "100k aholiga": "на 100т населения",
  "Xavf": "Риск",
  "Yuqori": "Высокий",
  "O'rta": "Средний",
  "Past": "Низкий",
  "JAMI": "ИТОГО",

  // Chrome — qidiruv / bildirishnoma / sozlamalar / footer (issue #1, #3, #4, #9)
  "Bildirishnomalar": "Уведомления",
  "Sozlamalar": "Настройки",
  "Til": "Язык",
  "Hech narsa topilmadi": "Ничего не найдено",
  "Natijaga o‘tish uchun Enter": "Enter — перейти к результату",
  "Tez orada": "Скоро",
  "Barcha bo‘limlar": "Все разделы",
  "Interfeys tili": "Язык интерфейса",
  "Yordam va qo‘llanma": "Помощь и руководство",
  "Vafot reestri": "Реестр умерших",
  "CFR / o‘lim koeffitsiyenti": "CFR / коэффициент летальности",
  "Vaksina ACYW135": "Вакцина ACYW135",
  "Yangi": "Новое",
  "28.03.2026 holatiga · viloyatlararo taqsimot (yangilanmoqda).": "на 28.03.2026 · межрегиональное распределение (обновляется).",
  "Eng so‘nggi shahar ko‘rsatkichi — 277 holat / 23 vafot (17.04.2026), yuqorida berilgan.": "Последний городской показатель — 277 случаев / 23 смерти (17.04.2026), приведён выше.",
  "Doimiy": "Постоянно",
  "Amaldagi standart yo‘riqnoma (operativ sanaga bog‘liq emas) — emlash sxemasi va profilaktika ko‘rsatkichlari uchun.": "Действующая стандартная инструкция (не привязана к оперативной дате) — для схемы вакцинации и показателей профилактики.",

  // Tahlil
  "Toshkent shahri · 277 holat kesimida statistik tahlil (14.04.2026–17.04.2026)":
    "Статистический анализ по г. Ташкент · 277 случаев (14.04.2026–17.04.2026)",
  "Tumanlar reytingi": "Рейтинг районов",
  "Toshkent shahridagi 12 tuman bo'yicha": "По 12 районам г. Ташкент",
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
  "Toshkent shahar Hokimiyatiga ma'lumotnoma (14.04.2026), MKI bemorlar ro'yxati (17.04.2026), 2026 tumanlar jadvali, SSV respublika ma'lumotnomasi (28.03.2026). Tumanlar kesimi 277 ta holatga asoslangan.":
    "Справка хокимияту г. Ташкент (14.04.2026), список больных MKI (17.04.2026), таблица районов 2026, республиканская справка Минздрава (28.03.2026). Разрез по районам основан на 277 случаях.",

  // Statistika — tarixiy dinamika
  "15 yillik tarixiy dinamika (2012–2026)": "Динамика за 15 лет (2012–2026)",
  "Tarixiy qamrov": "Исторический охват",

  // Tahlil — statistik aniqlik (95% CI)
  "Statistik aniqlik (95% ishonch oralig‘i)": "Статистическая точность (95% ДИ)",
  "Nuqta-baholar 95% CI bilan; nisbatlar uchun Wilson, kasallanish nisbati uchun Poisson usuli": "Точечные оценки с 95% ДИ; для долей — метод Уилсона, для отношения заболеваемости — Пуассона",
  "Ko‘rsatkich": "Показатель",
  "Nuqta-baho": "Точечная оценка",
  "Asos": "Основа",
  "Usul": "Метод",
  "O‘lim koeffitsiyenti (CFR)": "Коэффициент летальности (CFR)",
  "14 yoshgacha bolalar ulushi (holatlar)": "Доля детей до 14 лет (случаи)",
  "Bolalar ulushi (vafot etganlar)": "Доля детей (среди умерших)",
  "Kasallanish nisbati (IRR, 2026 ÷ 2025)": "Отношение заболеваемости (IRR, 2026 ÷ 2025)",
  "Ahamiyatlilik testi (χ²)": "Тест значимости (χ²)",
  "2026 vs 2025 kasallanish farqi": "Различие заболеваемости 2026 и 2025",
  "Farq statistik jihatdan yuqori ahamiyatli (p < 0,05).": "Различие статистически высоко значимо (p < 0,05).",

  // Metodologiya — codebook / xalqaro kontekst / adabiyotlar
  "Manba": "Источник",
  "Yangilangan": "Обновлено",
  "Codebook (ma‘lumotlar lug‘ati)": "Кодбук (словарь данных)",
  "O‘zgaruvchi": "Переменная",
  "Ta‘rifi": "Определение",
  "Birlik": "Единица",
  "FAIR printsipi: ma‘lumotlar Topiladigan, Ochiq, O‘zaro moslashuvchan va Qayta ishlatiladigan.": "Принцип FAIR: данные Находимые, Доступные, Совместимые и Переиспользуемые.",
  "Xalqaro kontekst va taqqoslash": "Международный контекст и сравнение",
  "Toshkent sh. (joriy)": "г. Ташкент (текущее)",
  "Xalqaro (WHO/ECDC/CDC)": "Мир (ВОЗ/ECDC/CDC)",
  "Adabiyotlar": "Литература",
  "Eslatma: mintaqaviy taqqoslash (Rossiya, Qozog‘iston epidemiyalari) uchun aniq raqamlar va iqtiboslar dissertatsiya matnidan qo‘shiladi.": "Примечание: точные цифры и ссылки для регионального сравнения (эпидемии в России, Казахстане) добавляются из текста диссертации.",

  // Tadqiqot (research) sahifasi
  "Tadqiqot pasporti": "Паспорт исследования",
  "Dissertatsiya maqsadi, vazifalari, dizayni, material va usullari hamda etika asoslari": "Цель, задачи, дизайн, материалы и методы, а также этические основы диссертации",
  "Mavzu va identifikatsiya": "Тема и идентификация",
  "Dissertatsiya mavzusi": "Тема диссертации",
  "Muallif": "Автор",
  "Ilmiy rahbar": "Научный руководитель",
  "Ilmiy maslahatchi": "Научный консультант",
  "Muassasa": "Учреждение",
  "Ixtisoslik shifri": "Шифр специальности",
  "Himoya yili": "Год защиты",
  "Sariq bilan belgilangan maydonlar real qiymatlar bilan to‘ldiriladi (research.ts).": "Поля, выделенные жёлтым, заполняются реальными значениями (research.ts).",
  "Tadqiqot maqsadi": "Цель исследования",
  "Tadqiqot vazifalari": "Задачи исследования",
  "Ilmiy gipoteza": "Научная гипотеза",
  "Material va usullar": "Материалы и методы",
  "Tadqiqot dizayni": "Дизайн исследования",
  "Davr": "Период",
  "Statistik dastur": "Статистическая программа",
  "Inklyuziya mezonlari": "Критерии включения",
  "Eksklyuziya mezonlari": "Критерии исключения",
  "Statistik usullar": "Статистические методы",
  "Natijalar «Tahlil» sahifasida 95% CI bilan ko‘rsatilgan.": "Результаты приведены с 95% ДИ на странице «Аналитика».",
  "Etika asoslari": "Этические основы",
  "Ilmiy yangilik": "Научная новизна",
  "Dissertatsiya maqsadi, vazifalari, ko‘p yillik dinamika va TBATS bashorat tahlili": "Цель, задачи диссертации, многолетняя динамика и прогноз TBATS",
  "Kirish (mavzuning dolzarbligi)": "Введение (актуальность темы)",
  "Ilmiy rahbarlar": "Научные руководители",
  "Ixtisosliklar": "Специальности",
  "Ko‘p yillik dinamika (2012–2021)": "Многолетняя динамика (2012–2021)",
  "Respublika · 2019": "Республика · 2019",
  "Toshkent sh. · 2019": "г. Ташкент · 2019",
  "100 000 aholiga": "на 100 000 населения",
  "Tahlil va xulosalar": "Анализ и выводы",
  "TBATS eksponensial model bilan bashoratlash": "Прогнозирование экспоненциальной моделью TBATS",
  "Model": "Модель",
  "Bashorat ufqi": "Горизонт прогноза",
  "yil": "лет",
  "Bashorat qilingan epidemik cho‘qqilar": "Прогнозируемые эпидемические пики",
  "holat": "случаев",

  // Choralar
  "Amalga oshirilgan tadbirlar": "Проведённые мероприятия",
  "Aholini ogohlantirish kampaniyasi": "Кампания по информированию населения",
  "Tavsiya etilgan chora-tadbirlar": "Рекомендуемые меры",
  "Emlanganlar (muloqotdagilar)": "Привито (контактные)",
  "Harid qilingan vaksina (doza)": "Закуплено вакцины (доз)",
  "Emlangan tibbiyot xodimlari": "Привито медработников",
  "Tarqatma material (nusxa)": "Раздаточный материал (экз.)",
  "Qamrab olingan xonadon": "Охвачено домохозяйств",
  "Mahalla yig'ilishlari": "Махаллинские собрания",
  "Teleko'rsatuvlar": "Телепередачи",
  "Radio eshittirishlar": "Радиопередачи",
  "Ijtimoiy tarmoq chiqishlari": "Публикации в соцсетях",
  "Infografika": "Инфографика",
  "Tibbiy seminarlar": "Медицинские семинары",
  "Manba: O'zR SSV huzuridagi Sanepidqo'm respublika ma'lumotnomasi (28.03.2026) va Toshkent shahar Hokimiyatiga ma'lumotnoma (14.04.2026).":
    "Источник: республиканская справка Санэпидконтроля при Минздраве РУз (28.03.2026) и справка хокимияту г. Ташкент (14.04.2026).",
  "Aholi orasida tashuvchanlik darajasini o'rganish, xavf guruhlarida (bolalar va o'smirlar) laboratoriya tekshiruvlarini tashkil etish va tibbiy kuzatuvni kuchaytirish.":
    "Изучение уровня носительства среди населения, организация лабораторных обследований в группах риска (дети и подростки) и усиление медицинского наблюдения.",
  "Davlat va nodavlat muassasalarda \"Nazofaringit\" tashxisi qo'yilganlardan diagnostik laborator tahlillarni o'tkazish.":
    "Проведение диагностических лабораторных анализов у лиц с диагнозом «Назофарингит» в государственных и частных учреждениях.",
  "Muloqotdagilarni aniqlash doirasini kengaytirish, barchasini bir vaqtda to'liq kimyoviy profilaktika bilan qamrash.":
    "Расширение круга выявления контактных лиц и одновременный полный охват химиопрофилактикой.",
  "Kasallik o'choqlarida 10 kunlik qat'iy tibbiy kuzatuvni ta'minlash.":
    "Обеспечение строгого 10-дневного медицинского наблюдения в очагах заболевания.",
  "Vaksina zaxirasini yaratish uchun qo'shimcha mablag' ajratish (oyiga ~1000 doza).":
    "Выделение дополнительных средств для создания запаса вакцины (~1000 доз в месяц).",
  "\"Haj\" va \"Umra\" safari oldidan meningokokk infeksiyasiga qarshi emlashni qat'iy belgilash.":
    "Обязательная вакцинация против менингококковой инфекции перед поездкой на «Хадж» и «Умру».",
  "Tez-tez kasallanuvchi va dispanser nazoratidagi bolalarni sog'lomlashtirish.":
    "Оздоровление часто болеющих и состоящих на диспансерном учёте детей.",
  "Ma'lumotlarni \"DMED\" elektron tizimiga kiritish.":
    "Внесение данных в электронную систему «DMED».",
  "Rekonvalessentlarni 2 yil davomida dispanser nazoratiga olish (UASh, nevropatolog).":
    "Диспансерное наблюдение реконвалесцентов в течение 2 лет (ВОП, невропатолог).",
  "Nodavlat maktab va MTTlarni tibbiyot xodimlari bilan ta'minlash.":
    "Обеспечение частных школ и ДДУ медицинскими работниками.",
  "Maktab va MTTlarda filtr, tozalash, zararsizlantirish va shamollatishni muntazam amalga oshirish.":
    "Регулярные фильтр, уборка, дезинфекция и проветривание в школах и ДДУ.",
  "Savdo majmualaridagi yopiq bolalar o'yingohlarida kundalik tozalash tadbirlarini yo'lga qo'yish.":
    "Налаживание ежедневной уборки в закрытых детских игровых зонах торговых центров.",
  "Laboratoriyada ozuqa muhitlar va zardoblar zaxirasini yaratish, seroguruhni aniqlash.":
    "Создание запаса питательных сред и сывороток в лаборатории, определение серогруппы.",
  "OAV va ijtimoiy tarmoqlar orqali tushuntirish ishlarini kuchaytirish.":
    "Усиление разъяснительной работы через СМИ и социальные сети.",

  // Map + Risk natijalari
  "Viloyat qidirish...": "Поиск региона...",
  "ta holat": "случаев",
  "vafot": "смертей",
  "100k ga": "на 100т",
  "Jami holat": "Всего случаев",
  "ta hudud · SSV ma'lumoti (28.03.2026)": "регионов · данные Минздрава (28.03.2026)",
  "ColorBrewer YlOrRd · rang-ko‘rlikka mos": "ColorBrewer YlOrRd · подходит для дальтоников",
  "Simptom tanlanmagan": "Симптомы не выбраны",
  "Bemorda kuzatilayotgan simptomlarni belgilang.": "Отметьте наблюдаемые у больного симптомы.",
  "Bemorda meningokokk infeksiyasiga gumon yuqori.": "Высокое подозрение на менингококковую инфекцию.",
  "Bemorni nazoratga olish va qo'shimcha tekshiruvlar zarur.": "Необходимо наблюдение и дополнительные обследования.",
  "Hozirgi simptomlar asosida xavf past darajada.": "По текущим симптомам риск низкий.",
  "Natija va Tavsiyalar": "Результат и рекомендации",
  "Risk Ball": "Балл риска",
  "Tavsiyalar:": "Рекомендации:",
  "Ilmiy asos va cheklov": "Научная основа и ограничения",
  "Ball og‘irliklari belgilarning meningokokksemiyadagi diagnostik ahamiyatiga (toshma va meningial belgilarga yuqori vazn) hamda SSV klinik protokoliga asoslangan. Mos yozuvlar: WHO va CDC meningokokk infeksiyasi klinik qo‘llanmalari, Glasgow Meningococcal Septicaemia Prognostic Score (GMSPS).": "Веса баллов основаны на диагностической значимости признаков при менингококцемии (высокий вес сыпи и менингеальных признаков) и клиническом протоколе Минздрава. Источники: клинические руководства ВОЗ и CDC по менингококковой инфекции, Glasgow Meningococcal Septicaemia Prognostic Score (GMSPS).",
  "Muhim:": "Важно:",
  "Bu — o‘quv/saralash (triage) yordamchisi, validatsiyalangan diagnostik vosita emas. Sezgirlik (sensitivity) va xoslik (specificity) ushbu namunada hali baholanmagan; yakuniy tashxis klinik ko‘rik va laboratoriya tasdig‘iga asoslanadi.": "Это вспомогательный инструмент обучения/сортировки (triage), а не валидированное диагностическое средство. Чувствительность и специфичность на данной выборке не оценивались; окончательный диагноз основывается на клиническом осмотре и лабораторном подтверждении.",

  // Risk skrining — simptomlar, tavsiyalar
  "Yuqori isitma": "Высокая температура",
  "Tana harorati 38.5°C dan yuqori": "Температура тела выше 38,5°C",
  "Kuchli bosh og'rig'i": "Сильная головная боль",
  "Birdan boshlanadigan kuchli og'riq": "Внезапная сильная боль",
  "Bo'yin qotishi": "Ригидность затылка",
  "Iyagini ko'kragiga tekkiza olmaslik": "Невозможность прижать подбородок к груди",
  "Toshmalar": "Сыпь",
  "Bosganda yo'qolmaydigan qizil/binafsha toshmalar": "Красно-фиолетовая сыпь, не исчезающая при надавливании",
  "Yorug'likka ta'sirchanlik": "Светобоязнь",
  "Yorug'likdan ko'z qamashishi": "Резь в глазах от света",
  "Ko'ngil aynishi": "Тошнота",
  "Sababsiz qayt qilish": "Беспричинная рвота",
  "Qaltirash": "Озноб",
  "Sovuq qotish va titroq": "Зябкость и дрожь",
  "Ong chalkashishi": "Спутанность сознания",
  "Savollarga javob berishga qiynalish": "Затруднение при ответах на вопросы",
  "Zudlik bilan reanimatsiya yoki yuqumli kasalliklar bo'limiga yotqizish.": "Немедленная госпитализация в реанимацию или инфекционное отделение.",
  "Lumbal punksiya va qon tahlili o'tkazish.": "Проведение люмбальной пункции и анализа крови.",
  "Empirik antibiotik terapiyani boshlash.": "Начало эмпирической антибиотикотерапии.",
  "Bemorni 24 soatlik qat'iy nazoratga olish.": "Строгое наблюдение за больным в течение 24 часов.",
  "Tana harorati va qon bosimi monitoringi.": "Мониторинг температуры и артериального давления.",
  "Simptomlar kuchaysa shifoxonaga yuborish.": "При усилении симптомов — направление в стационар.",
  "Suyuqlik ichish tartibini nazorat qilish.": "Контроль питьевого режима.",
  "Isitma tushiruvchi vositalar qabul qilish.": "Приём жаропонижающих средств.",
  "Oila shifokori nazoratida bo'lish.": "Наблюдение у семейного врача.",
  "Shoshilinch murojaat": "Экстренный вызов",
  "Natijani saqlash": "Сохранить результат",
  "Profil solishtiruvi": "Сравнение профилей",
  "Yashil — bemorning belgilar profili. Kulrang — tipik meningokokksemiyaning namunaviy (taqqoslash uchun) profili.":
    "Зелёный — профиль признаков больного. Серый — типовой (эталонный) профиль менингококцемии.",
  "Bemor": "Больной",
  "Tipik MKI (namuna)": "Типичная MKI (эталон)",
  "Isitma": "Лихорадка",
  "Bo'yin/meningial": "Шея/менингеальные",
  "Ong holati": "Состояние сознания",
  "Umumiy intoksikatsiya": "Общая интоксикация",

  // Vaksinatsiya
  "Doza": "Доза", "Yosh chegarasi": "Возрастное ограничение", "Saqlash": "Хранение",
  "Yaroqlilik": "Срок годности", "Berilishi": "Отпуск", "Ishlab chiqaruvchi": "Производитель",
  "Tarkibi (1 doza)": "Состав (1 доза)", "Seroguruh qamrovi": "Охват серогрупп",
  "ACYW135 — to'rt seroguruhga qarshi himoya": "ACYW135 — защита от четырёх серогрупп",
  "Eslatma: vaksina B seroguruhga qarshi himoya qilmaydi.": "Примечание: вакцина не защищает от серогруппы B.",
  "O'choqda profilaktika bosqichlari": "Этапы профилактики в очаге",
  "Ko'rsatmalar": "Показания", "Qarshi ko'rsatmalar": "Противопоказания", "Nojo'ya ta'sirlar": "Побочные эффекты",
  "Mahalliy": "Местные", "Tizimli": "Системные",
  "Aniqlash": "Выявление", "Muloqotda bo'lganlarni aniqlash": "Выявление контактных лиц",
  "Bemor bilan o'choqda mulokotda bo'lgan barcha shaxslar ro'yxatga olinadi.": "Регистрируются все контактировавшие в очаге.",
  "Tekshiruv": "Обследование", "Bakteriologik surtma": "Бактериологический мазок",
  "Burun-halqumdan surtma olinib, tashuvchanlik aniqlanadi.": "Берётся мазок из носоглотки, определяется носительство.",
  "Emlash": "Вакцинация", "Epid ko'rsatma bo'yicha emlash": "Вакцинация по эпидпоказаниям",
  "Tibbiy moneligi bo'lmagan muloqotdagilar 0,5 ml dozada emlanadi.": "Контактные без медотводов вакцинируются дозой 0,5 мл.",
  "Kuzatuv": "Наблюдение", "10 kunlik tibbiy kuzatuv": "10-дневное медицинское наблюдение",
  "O'choqda 10 kun davomida qat'iy tibbiy kuzatuv olib boriladi.": "В очаге ведётся строгое медицинское наблюдение в течение 10 дней.",

  // Kabinet
  "Vafot etganlar": "Умершие", "O'rtacha kechish": "Средняя длительность",
  "Lab. tasdiqlangan": "Лаб. подтверждено", "Tahlil jarayonda": "Анализ в процессе",
  "bola": "детей", "katta": "взрослых", "kun": "дней",
  "kasallikdan vafotgacha": "от болезни до смерти", "natija kutilmoqda": "ожидается результат",
  "Olingan namunalar bo'yicha": "По взятым образцам",
  "Vafot etgan bemorlar reestri": "Реестр умерших больных",
  "Yakuniy tashxis: yashin tezligidagi meningokokksemiya": "Окончательный диагноз: молниеносная менингококцемия",
  "F.I.Sh yoki tuman...": "Ф.И.О. или район...",
  "F.I.Sh.": "Ф.И.О.", "Yosh": "Возраст", "Tuman": "Район", "Kasallangan": "Заболел", "Yotqizilgan": "Госпитализирован",
  "ta yozuv": "записей",

  // Tadqiqot — Serologik diagnostika (ELISA IgM/IgG)
  "Serologik diagnostika — ELISA (IgM/IgG)": "Серологическая диагностика — ELISA (IgM/IgG)",
  "Usul (qisqacha)": "Метод (кратко)",
  "Asosiy natijalar": "Основные результаты",
  "Xulosa": "Заключение",
  "Sezgirlik (sensitivity)": "Чувствительность (sensitivity)",
  "Xoslik (specificity)": "Специфичность (specificity)",
  "Antimeningokokk zardob IgM va IgG antitanalarini miqdoriy o'lchash uchun ferment bilan bog'langan immunosorbent tahlil (ELISA) ishlab chiqildi. Antigen qoplamasi sifatida B:15 meningokokk shtammi qo'llanildi; klass-spetsifik antitanalar ishqoriy fosfataza bilan markerlangan quyon anti-inson IgM yoki IgG konyugati yordamida aniqlandi.":
    "Для количественного измерения антименингококковых сывороточных антител IgM и IgG разработан иммуноферментный анализ (ELISA). В качестве антигенного покрытия использован менингококковый штамм B:15; классоспецифические антитела выявляли с помощью конъюгата — кроличьих античеловеческих IgM или IgG, меченных щелочной фосфатазой.",
  "Antigen qoplamasi: B:15 meningokokk shtammi (butun bakterial hujayrali ELISA).":
    "Антигенное покрытие: менингококковый штамм B:15 (цельноклеточный бактериальный ELISA).",
  "Konyugat: ishqoriy fosfataza bilan markerlangan quyon anti-inson IgM yoki IgG.":
    "Конъюгат: кроличьи античеловеческие IgM или IgG, меченные щелочной фосфатазой.",
  "Maqsad: zardobdagi spetsifik IgM va IgG antitanalarni miqdoriy aniqlash.":
    "Цель: количественное определение специфических антител IgM и IgG в сыворотке.",
  "Spetsifik IgG faolligi sog'lom meningokokk tashuvchilarining zardobida tashuvchi bo'lmaganlarnikiga qaraganda yuqori bo'ldi, biroq farq statistik jihatdan ahamiyatli emas edi.":
    "Специфическая активность IgG была выше в сыворотках здоровых менингококковых носителей, чем у неносителей, но разница не была статистически значимой.",
  "Antimeningokokk IgM antitanalari tashuvchilarda tashuvchi bo'lmaganlarga nisbatan ko'proq uchradi.":
    "Антименингококковые IgM-антитела чаще выявлялись у носителей, чем у неносителей.",
  "Fulminant meningokokk kasalligi bo'lgan 34 bemorning o'tkir zardoblarida sog'lom tashuvchi va tashuvchi bo'lmaganlarga nisbatan spetsifik IgG kamroq, IgM darajasi esa yuqoriroq aniqlandi.":
    "Острые сыворотки 34 пациентов с фульминантной менингококковой болезнью содержали меньше специфического IgG и более высокий уровень IgM по сравнению со здоровыми носителями и неносителями.",
  "Kasalxonada yotgan 18 bemordan 15 tasida (15/18) o'tkir va rekonvalessent zardoblarda IgG va IgM antitanalar miqdorining oshishi kuzatildi.":
    "У 15 из 18 госпитализированных пациентов (15/18) в острых и реконвалесцентных сыворотках наблюдалось нарастание антител IgG и IgM.",
  "IgG va IgM o'lchovlarini birlashtirib, 18 bemordan 15 tasida antitana o'sishi aniqlandi (15/18).":
    "При объединении измерений IgG и IgM нарастание антител выявлено у 15 из 18 пациентов (15/18).",
  "Meningokokk infeksiyasi bo'lmagan 118 kishidan faqat 8 tasida spetsifik IgM antitanalari aniqlandi.":
    "Из 118 человек без менингококковой инфекции специфические IgM-антитела выявлены лишь у 8.",
  "Butun bakterial ELISA testi orqali spetsifik antimeningokokk IgG antitanalarini miqdoriy aniqlash — alohida shaxslarda hamda epidemiologik tadqiqotlarda meningokokk kasalligiga qarshi immunitetni o'rganish uchun foydali test bo'lishi mumkin. IgG va IgM testlarini birgalikda qo'llash qon yoki orqa miya suyuqligi tahlillari salbiy bo'lgan hollarda meningokokk kasalligini tashxislashda foydalidir.":
    "Количественное определение специфических антименингококковых антител IgG с помощью цельноклеточного бактериального теста ELISA может быть полезным для изучения иммунитета против менингококковой болезни как у отдельных людей, так и в эпидемиологических исследованиях. Совместное применение тестов IgG и IgM полезно для диагностики менингококковой болезни при отрицательных результатах анализов крови или спинномозговой жидкости.",
};

const EN: Record<string, string> = {
  "Bosh sahifa": "Home",
  "Tahlil": "Analytics",
  "Statistika": "Statistics",
  "Xarita": "Map",
  "Metodologiya": "Methodology",
  "Risk skrining": "Risk screening",
  "Tadqiqot": "Research",
  "Akademik": "Academic",
  "2025 yilga nisbatan": "vs 2025",
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
  "Sanitariya-epidemiologik osoyishtalik agentligi (Sanepidqo‘m)": "Sanitary-Epidemiological Welfare Agency (SanEpid)",
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
  "Amalga oshirilgan tadbirlar va SSV tavsiyalari (14.04.2026 holatiga)":
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
  "yangi holat · aprel (1–17.04)": "new cases · April (1–17 Apr)",
  "respublika": "republic",
  "83% bolalar": "83% children",
  "Tuzalgan": "Recovered",
  "uyga chiqarilgan": "discharged home",
  "O'lim koeffitsiyenti (CFR)": "Case fatality rate (CFR)",

  "Epidemiya 23-fevraldan (9-hafta) keskin ko'tarildi.": "Epidemic surged from Feb 23 (week 9).",
  "Vafot etganlarning 83% — bolalar.": "83% of deaths are children.",
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
  "1,5 oylik chaqaloq (Yashnobod tumani) meningokokksemiya asoratidan vafot etdi (23-vafot holati).":
    "A 1.5-month-old infant (Yashnabad district) died of meningococcemia complications (23rd death).",
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
  "Bemorlarda kuzatilgan belgilar chastotasi (%) — septik (meningokokksemiya) shakli ustun":
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

  "SSV ma'lumotnomasi": "Ministry report",
  "Hudud": "Region",
  "Jami Holat": "Total cases",
  "100k aholiga": "per 100k pop.",
  "Xavf": "Risk",
  "Yuqori": "High",
  "O'rta": "Medium",
  "Past": "Low",
  "JAMI": "TOTAL",

  // Chrome — search / notifications / settings / footer (issue #1, #3, #4, #9)
  "Bildirishnomalar": "Notifications",
  "Sozlamalar": "Settings",
  "Til": "Language",
  "Hech narsa topilmadi": "Nothing found",
  "Natijaga o‘tish uchun Enter": "Press Enter to open result",
  "Tez orada": "Coming soon",
  "Barcha bo‘limlar": "All sections",
  "Interfeys tili": "Interface language",
  "Yordam va qo‘llanma": "Help & guide",
  "Vafot reestri": "Death registry",
  "CFR / o‘lim koeffitsiyenti": "CFR / case fatality rate",
  "Vaksina ACYW135": "Vaccine ACYW135",
  "Yangi": "New",
  "28.03.2026 holatiga · viloyatlararo taqsimot (yangilanmoqda).": "as of 28.03.2026 · inter-regional breakdown (updating).",
  "Eng so‘nggi shahar ko‘rsatkichi — 277 holat / 23 vafot (17.04.2026), yuqorida berilgan.": "Latest city figure — 277 cases / 23 deaths (17.04.2026), shown above.",
  "Doimiy": "Standing",
  "Amaldagi standart yo‘riqnoma (operativ sanaga bog‘liq emas) — emlash sxemasi va profilaktika ko‘rsatkichlari uchun.": "Standing standard guideline (not tied to an operational date) — for the vaccination scheme and prevention indicators.",

  // Tahlil
  "Toshkent shahri · 277 holat kesimida statistik tahlil (14.04.2026–17.04.2026)":
    "Statistical analysis for Tashkent city · 277 cases (14.04.2026–17.04.2026)",
  "Tumanlar reytingi": "District ranking",
  "Toshkent shahridagi 12 tuman bo'yicha": "Across the 12 districts of Tashkent",
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
  "Toshkent shahar Hokimiyatiga ma'lumotnoma (14.04.2026), MKI bemorlar ro'yxati (17.04.2026), 2026 tumanlar jadvali, SSV respublika ma'lumotnomasi (28.03.2026). Tumanlar kesimi 277 ta holatga asoslangan.":
    "Report to Tashkent khokimiyat (14.04.2026), MKI patient list (17.04.2026), 2026 districts table, Ministry republic report (28.03.2026). District breakdown based on 277 cases.",

  // Statistics — historical dynamics
  "15 yillik tarixiy dinamika (2012–2026)": "15-year dynamics (2012–2026)",
  "Tarixiy qamrov": "Historical coverage",

  // Tahlil — statistical precision (95% CI)
  "Statistik aniqlik (95% ishonch oralig‘i)": "Statistical precision (95% CI)",
  "Nuqta-baholar 95% CI bilan; nisbatlar uchun Wilson, kasallanish nisbati uchun Poisson usuli": "Point estimates with 95% CI; Wilson method for proportions, Poisson for the rate ratio",
  "Ko‘rsatkich": "Indicator",
  "Nuqta-baho": "Point estimate",
  "Asos": "Basis",
  "Usul": "Method",
  "O‘lim koeffitsiyenti (CFR)": "Case fatality rate (CFR)",
  "14 yoshgacha bolalar ulushi (holatlar)": "Share of children under 14 (cases)",
  "Bolalar ulushi (vafot etganlar)": "Share of children (among deaths)",
  "Kasallanish nisbati (IRR, 2026 ÷ 2025)": "Incidence rate ratio (IRR, 2026 ÷ 2025)",
  "Ahamiyatlilik testi (χ²)": "Significance test (χ²)",
  "2026 vs 2025 kasallanish farqi": "2026 vs 2025 incidence difference",
  "Farq statistik jihatdan yuqori ahamiyatli (p < 0,05).": "The difference is statistically highly significant (p < 0.05).",

  // Methodology — codebook / international context / references
  "Manba": "Source",
  "Yangilangan": "Updated",
  "Codebook (ma‘lumotlar lug‘ati)": "Codebook (data dictionary)",
  "O‘zgaruvchi": "Variable",
  "Ta‘rifi": "Definition",
  "Birlik": "Unit",
  "FAIR printsipi: ma‘lumotlar Topiladigan, Ochiq, O‘zaro moslashuvchan va Qayta ishlatiladigan.": "FAIR principle: data are Findable, Accessible, Interoperable and Reusable.",
  "Xalqaro kontekst va taqqoslash": "International context and comparison",
  "Toshkent sh. (joriy)": "Tashkent city (current)",
  "Xalqaro (WHO/ECDC/CDC)": "Global (WHO/ECDC/CDC)",
  "Adabiyotlar": "References",
  "Eslatma: mintaqaviy taqqoslash (Rossiya, Qozog‘iston epidemiyalari) uchun aniq raqamlar va iqtiboslar dissertatsiya matnidan qo‘shiladi.": "Note: exact figures and citations for regional comparison (epidemics in Russia, Kazakhstan) are added from the dissertation text.",

  // Research page
  "Tadqiqot pasporti": "Research passport",
  "Dissertatsiya maqsadi, vazifalari, dizayni, material va usullari hamda etika asoslari": "Dissertation aim, objectives, design, materials & methods, and ethical basis",
  "Mavzu va identifikatsiya": "Topic & identification",
  "Dissertatsiya mavzusi": "Dissertation topic",
  "Muallif": "Author",
  "Ilmiy rahbar": "Scientific supervisor",
  "Ilmiy maslahatchi": "Scientific consultant",
  "Muassasa": "Institution",
  "Ixtisoslik shifri": "Specialty code",
  "Himoya yili": "Defense year",
  "Sariq bilan belgilangan maydonlar real qiymatlar bilan to‘ldiriladi (research.ts).": "Fields highlighted in yellow are filled with real values (research.ts).",
  "Tadqiqot maqsadi": "Research aim",
  "Tadqiqot vazifalari": "Research objectives",
  "Ilmiy gipoteza": "Scientific hypothesis",
  "Material va usullar": "Materials & methods",
  "Tadqiqot dizayni": "Study design",
  "Davr": "Period",
  "Statistik dastur": "Statistical software",
  "Inklyuziya mezonlari": "Inclusion criteria",
  "Eksklyuziya mezonlari": "Exclusion criteria",
  "Statistik usullar": "Statistical methods",
  "Natijalar «Tahlil» sahifasida 95% CI bilan ko‘rsatilgan.": "Results are shown with 95% CI on the “Analytics” page.",
  "Etika asoslari": "Ethical basis",
  "Ilmiy yangilik": "Scientific novelty",
  "Dissertatsiya maqsadi, vazifalari, ko‘p yillik dinamika va TBATS bashorat tahlili": "Dissertation aim, objectives, multi-year dynamics and TBATS forecast",
  "Kirish (mavzuning dolzarbligi)": "Introduction (relevance of the topic)",
  "Ilmiy rahbarlar": "Scientific supervisors",
  "Ixtisosliklar": "Specialties",
  "Ko‘p yillik dinamika (2012–2021)": "Multi-year dynamics (2012–2021)",
  "Respublika · 2019": "Republic · 2019",
  "Toshkent sh. · 2019": "Tashkent city · 2019",
  "100 000 aholiga": "per 100,000 population",
  "Tahlil va xulosalar": "Analysis & conclusions",
  "TBATS eksponensial model bilan bashoratlash": "Forecasting with the TBATS exponential model",
  "Model": "Model",
  "Bashorat ufqi": "Forecast horizon",
  "yil": "years",
  "Bashorat qilingan epidemik cho‘qqilar": "Forecasted epidemic peaks",
  "holat": "cases",

  // Choralar
  "Amalga oshirilgan tadbirlar": "Measures taken",
  "Aholini ogohlantirish kampaniyasi": "Public awareness campaign",
  "Tavsiya etilgan chora-tadbirlar": "Recommended measures",
  "Emlanganlar (muloqotdagilar)": "Vaccinated (contacts)",
  "Harid qilingan vaksina (doza)": "Vaccine purchased (doses)",
  "Emlangan tibbiyot xodimlari": "Medical staff vaccinated",
  "Tarqatma material (nusxa)": "Leaflets (copies)",
  "Qamrab olingan xonadon": "Households covered",
  "Mahalla yig'ilishlari": "Mahalla meetings",
  "Teleko'rsatuvlar": "TV broadcasts",
  "Radio eshittirishlar": "Radio broadcasts",
  "Ijtimoiy tarmoq chiqishlari": "Social media posts",
  "Infografika": "Infographics",
  "Tibbiy seminarlar": "Medical seminars",
  "Manba: O'zR SSV huzuridagi Sanepidqo'm respublika ma'lumotnomasi (28.03.2026) va Toshkent shahar Hokimiyatiga ma'lumotnoma (14.04.2026).":
    "Source: republic report of the Sanitary-Epidemiological Service under the MoH (28.03.2026) and report to Tashkent khokimiyat (14.04.2026).",
  "Aholi orasida tashuvchanlik darajasini o'rganish, xavf guruhlarida (bolalar va o'smirlar) laboratoriya tekshiruvlarini tashkil etish va tibbiy kuzatuvni kuchaytirish.":
    "Study carriage rates in the population, organize lab testing in risk groups (children and adolescents) and strengthen medical surveillance.",
  "Davlat va nodavlat muassasalarda \"Nazofaringit\" tashxisi qo'yilganlardan diagnostik laborator tahlillarni o'tkazish.":
    "Perform diagnostic lab tests on those diagnosed with \"Nasopharyngitis\" in public and private facilities.",
  "Muloqotdagilarni aniqlash doirasini kengaytirish, barchasini bir vaqtda to'liq kimyoviy profilaktika bilan qamrash.":
    "Expand contact tracing and cover all contacts with full chemoprophylaxis simultaneously.",
  "Kasallik o'choqlarida 10 kunlik qat'iy tibbiy kuzatuvni ta'minlash.":
    "Ensure strict 10-day medical surveillance in disease foci.",
  "Vaksina zaxirasini yaratish uchun qo'shimcha mablag' ajratish (oyiga ~1000 doza).":
    "Allocate additional funds to build a vaccine reserve (~1000 doses per month).",
  "\"Haj\" va \"Umra\" safari oldidan meningokokk infeksiyasiga qarshi emlashni qat'iy belgilash.":
    "Make meningococcal vaccination mandatory before \"Hajj\" and \"Umrah\" trips.",
  "Tez-tez kasallanuvchi va dispanser nazoratidagi bolalarni sog'lomlashtirish.":
    "Rehabilitate frequently-ill and dispensary-registered children.",
  "Ma'lumotlarni \"DMED\" elektron tizimiga kiritish.":
    "Enter data into the \"DMED\" electronic system.",
  "Rekonvalessentlarni 2 yil davomida dispanser nazoratiga olish (UASh, nevropatolog).":
    "Place convalescents under dispensary follow-up for 2 years (GP, neurologist).",
  "Nodavlat maktab va MTTlarni tibbiyot xodimlari bilan ta'minlash.":
    "Staff private schools and kindergartens with medical workers.",
  "Maktab va MTTlarda filtr, tozalash, zararsizlantirish va shamollatishni muntazam amalga oshirish.":
    "Regularly carry out filtering, cleaning, disinfection and ventilation in schools and kindergartens.",
  "Savdo majmualaridagi yopiq bolalar o'yingohlarida kundalik tozalash tadbirlarini yo'lga qo'yish.":
    "Establish daily cleaning in indoor children's playgrounds in malls.",
  "Laboratoriyada ozuqa muhitlar va zardoblar zaxirasini yaratish, seroguruhni aniqlash.":
    "Build a reserve of culture media and sera in the lab, determine the serogroup.",
  "OAV va ijtimoiy tarmoqlar orqali tushuntirish ishlarini kuchaytirish.":
    "Strengthen awareness work through media and social networks.",

  // Map + Risk results
  "Viloyat qidirish...": "Search region...",
  "ta holat": "cases",
  "vafot": "deaths",
  "100k ga": "per 100k",
  "Jami holat": "Total cases",
  "ta hudud · SSV ma'lumoti (28.03.2026)": "regions · Ministry data (28.03.2026)",
  "ColorBrewer YlOrRd · rang-ko‘rlikka mos": "ColorBrewer YlOrRd · colorblind-safe",
  "Simptom tanlanmagan": "No symptoms selected",
  "Bemorda kuzatilayotgan simptomlarni belgilang.": "Mark the symptoms observed in the patient.",
  "Bemorda meningokokk infeksiyasiga gumon yuqori.": "High suspicion of meningococcal infection.",
  "Bemorni nazoratga olish va qo'shimcha tekshiruvlar zarur.": "Surveillance and further tests are required.",
  "Hozirgi simptomlar asosida xavf past darajada.": "Based on current symptoms, the risk is low.",
  "Natija va Tavsiyalar": "Result & Recommendations",
  "Risk Ball": "Risk score",
  "Tavsiyalar:": "Recommendations:",
  "Ilmiy asos va cheklov": "Scientific basis & limitations",
  "Ball og‘irliklari belgilarning meningokokksemiyadagi diagnostik ahamiyatiga (toshma va meningial belgilarga yuqori vazn) hamda SSV klinik protokoliga asoslangan. Mos yozuvlar: WHO va CDC meningokokk infeksiyasi klinik qo‘llanmalari, Glasgow Meningococcal Septicaemia Prognostic Score (GMSPS).": "Score weights are based on the diagnostic significance of signs in meningococcemia (high weight for rash and meningeal signs) and the Ministry of Health clinical protocol. References: WHO and CDC clinical guidance on meningococcal disease, Glasgow Meningococcal Septicaemia Prognostic Score (GMSPS).",
  "Muhim:": "Important:",
  "Bu — o‘quv/saralash (triage) yordamchisi, validatsiyalangan diagnostik vosita emas. Sezgirlik (sensitivity) va xoslik (specificity) ushbu namunada hali baholanmagan; yakuniy tashxis klinik ko‘rik va laboratoriya tasdig‘iga asoslanadi.": "This is an educational/triage aid, not a validated diagnostic tool. Sensitivity and specificity have not yet been assessed on this sample; the final diagnosis rests on clinical examination and laboratory confirmation.",

  // Risk screening
  "Yuqori isitma": "High fever",
  "Tana harorati 38.5°C dan yuqori": "Body temperature above 38.5°C",
  "Kuchli bosh og'rig'i": "Severe headache",
  "Birdan boshlanadigan kuchli og'riq": "Sudden severe pain",
  "Bo'yin qotishi": "Neck stiffness",
  "Iyagini ko'kragiga tekkiza olmaslik": "Unable to touch chin to chest",
  "Toshmalar": "Rash",
  "Bosganda yo'qolmaydigan qizil/binafsha toshmalar": "Red/purple rash that doesn't fade under pressure",
  "Yorug'likka ta'sirchanlik": "Light sensitivity",
  "Yorug'likdan ko'z qamashishi": "Glare/discomfort from light",
  "Ko'ngil aynishi": "Nausea",
  "Sababsiz qayt qilish": "Unexplained vomiting",
  "Qaltirash": "Chills",
  "Sovuq qotish va titroq": "Feeling cold and shivering",
  "Ong chalkashishi": "Confusion",
  "Savollarga javob berishga qiynalish": "Difficulty answering questions",
  "Zudlik bilan reanimatsiya yoki yuqumli kasalliklar bo'limiga yotqizish.": "Immediate admission to ICU or the infectious diseases ward.",
  "Lumbal punksiya va qon tahlili o'tkazish.": "Perform lumbar puncture and blood test.",
  "Empirik antibiotik terapiyani boshlash.": "Start empiric antibiotic therapy.",
  "Bemorni 24 soatlik qat'iy nazoratga olish.": "Place the patient under strict 24-hour observation.",
  "Tana harorati va qon bosimi monitoringi.": "Monitor temperature and blood pressure.",
  "Simptomlar kuchaysa shifoxonaga yuborish.": "Refer to hospital if symptoms worsen.",
  "Suyuqlik ichish tartibini nazorat qilish.": "Monitor fluid intake.",
  "Isitma tushiruvchi vositalar qabul qilish.": "Take antipyretics.",
  "Oila shifokori nazoratida bo'lish.": "Stay under family doctor's supervision.",
  "Shoshilinch murojaat": "Emergency call",
  "Natijani saqlash": "Save result",
  "Profil solishtiruvi": "Profile comparison",
  "Yashil — bemorning belgilar profili. Kulrang — tipik meningokokksemiyaning namunaviy (taqqoslash uchun) profili.":
    "Green — the patient's sign profile. Gray — the typical (reference) meningococcemia profile.",
  "Bemor": "Patient",
  "Tipik MKI (namuna)": "Typical MKI (reference)",
  "Isitma": "Fever",
  "Bo'yin/meningial": "Neck/meningeal",
  "Ong holati": "Consciousness",
  "Umumiy intoksikatsiya": "General intoxication",

  // Vaccination
  "Doza": "Dose", "Yosh chegarasi": "Age limit", "Saqlash": "Storage",
  "Yaroqlilik": "Shelf life", "Berilishi": "Dispensing", "Ishlab chiqaruvchi": "Manufacturer",
  "Tarkibi (1 doza)": "Composition (1 dose)", "Seroguruh qamrovi": "Serogroup coverage",
  "ACYW135 — to'rt seroguruhga qarshi himoya": "ACYW135 — protection against four serogroups",
  "Eslatma: vaksina B seroguruhga qarshi himoya qilmaydi.": "Note: the vaccine does not protect against serogroup B.",
  "O'choqda profilaktika bosqichlari": "Prophylaxis steps in the focus",
  "Ko'rsatmalar": "Indications", "Qarshi ko'rsatmalar": "Contraindications", "Nojo'ya ta'sirlar": "Side effects",
  "Mahalliy": "Local", "Tizimli": "Systemic",
  "Aniqlash": "Identification", "Muloqotda bo'lganlarni aniqlash": "Identify contacts",
  "Bemor bilan o'choqda mulokotda bo'lgan barcha shaxslar ro'yxatga olinadi.": "All people who had contact in the focus are registered.",
  "Tekshiruv": "Testing", "Bakteriologik surtma": "Bacteriological swab",
  "Burun-halqumdan surtma olinib, tashuvchanlik aniqlanadi.": "A nasopharyngeal swab is taken to detect carriage.",
  "Emlash": "Vaccination", "Epid ko'rsatma bo'yicha emlash": "Vaccination by epidemic indication",
  "Tibbiy moneligi bo'lmagan muloqotdagilar 0,5 ml dozada emlanadi.": "Contacts without contraindications are vaccinated with a 0.5 ml dose.",
  "Kuzatuv": "Surveillance", "10 kunlik tibbiy kuzatuv": "10-day medical surveillance",
  "O'choqda 10 kun davomida qat'iy tibbiy kuzatuv olib boriladi.": "Strict medical surveillance is carried out in the focus for 10 days.",

  // Cabinet
  "Vafot etganlar": "Deaths", "O'rtacha kechish": "Average course",
  "Lab. tasdiqlangan": "Lab confirmed", "Tahlil jarayonda": "Analysis in progress",
  "bola": "children", "katta": "adults", "kun": "days",
  "kasallikdan vafotgacha": "from onset to death", "natija kutilmoqda": "awaiting result",
  "Olingan namunalar bo'yicha": "By collected samples",
  "Vafot etgan bemorlar reestri": "Registry of deceased patients",
  "Yakuniy tashxis: yashin tezligidagi meningokokksemiya": "Final diagnosis: fulminant meningococcemia",
  "F.I.Sh yoki tuman...": "Name or district...",
  "F.I.Sh.": "Name", "Yosh": "Age", "Tuman": "District", "Kasallangan": "Onset", "Yotqizilgan": "Hospitalized",
  "ta yozuv": "records",

  // Research — Serological diagnostics (ELISA IgM/IgG)
  "Serologik diagnostika — ELISA (IgM/IgG)": "Serological diagnostics — ELISA (IgM/IgG)",
  "Usul (qisqacha)": "Method (brief)",
  "Asosiy natijalar": "Key findings",
  "Xulosa": "Conclusion",
  "Sezgirlik (sensitivity)": "Sensitivity",
  "Xoslik (specificity)": "Specificity",
  "Antimeningokokk zardob IgM va IgG antitanalarini miqdoriy o'lchash uchun ferment bilan bog'langan immunosorbent tahlil (ELISA) ishlab chiqildi. Antigen qoplamasi sifatida B:15 meningokokk shtammi qo'llanildi; klass-spetsifik antitanalar ishqoriy fosfataza bilan markerlangan quyon anti-inson IgM yoki IgG konyugati yordamida aniqlandi.":
    "An enzyme-linked immunosorbent assay (ELISA) was developed to quantify antimeningococcal serum IgM and IgG antibodies. Meningococcal strain B:15 was used as the coating antigen; class-specific antibodies were detected using alkaline-phosphatase-labelled rabbit anti-human IgM or IgG as the conjugate.",
  "Antigen qoplamasi: B:15 meningokokk shtammi (butun bakterial hujayrali ELISA).":
    "Coating antigen: meningococcal strain B:15 (whole-cell bacterial ELISA).",
  "Konyugat: ishqoriy fosfataza bilan markerlangan quyon anti-inson IgM yoki IgG.":
    "Conjugate: alkaline-phosphatase-labelled rabbit anti-human IgM or IgG.",
  "Maqsad: zardobdagi spetsifik IgM va IgG antitanalarni miqdoriy aniqlash.":
    "Aim: quantitative determination of specific serum IgM and IgG antibodies.",
  "Spetsifik IgG faolligi sog'lom meningokokk tashuvchilarining zardobida tashuvchi bo'lmaganlarnikiga qaraganda yuqori bo'ldi, biroq farq statistik jihatdan ahamiyatli emas edi.":
    "Specific IgG activity was higher in the sera of healthy meningococcal carriers than in non-carriers, but the difference was not statistically significant.",
  "Antimeningokokk IgM antitanalari tashuvchilarda tashuvchi bo'lmaganlarga nisbatan ko'proq uchradi.":
    "Antimeningococcal IgM antibodies were more frequent in carriers than in non-carriers.",
  "Fulminant meningokokk kasalligi bo'lgan 34 bemorning o'tkir zardoblarida sog'lom tashuvchi va tashuvchi bo'lmaganlarga nisbatan spetsifik IgG kamroq, IgM darajasi esa yuqoriroq aniqlandi.":
    "Acute sera from 34 patients with fulminant meningococcal disease contained less specific IgG and higher IgM levels compared with healthy carriers and non-carriers.",
  "Kasalxonada yotgan 18 bemordan 15 tasida (15/18) o'tkir va rekonvalessent zardoblarda IgG va IgM antitanalar miqdorining oshishi kuzatildi.":
    "In 15 of 18 hospitalized patients (15/18), a rise in IgG and IgM antibodies was observed in acute and convalescent sera.",
  "IgG va IgM o'lchovlarini birlashtirib, 18 bemordan 15 tasida antitana o'sishi aniqlandi (15/18).":
    "Combining IgG and IgM measurements, an antibody rise was detected in 15 of 18 patients (15/18).",
  "Meningokokk infeksiyasi bo'lmagan 118 kishidan faqat 8 tasida spetsifik IgM antitanalari aniqlandi.":
    "Of 118 individuals without meningococcal infection, only 8 had detectable specific IgM antibodies.",
  "Butun bakterial ELISA testi orqali spetsifik antimeningokokk IgG antitanalarini miqdoriy aniqlash — alohida shaxslarda hamda epidemiologik tadqiqotlarda meningokokk kasalligiga qarshi immunitetni o'rganish uchun foydali test bo'lishi mumkin. IgG va IgM testlarini birgalikda qo'llash qon yoki orqa miya suyuqligi tahlillari salbiy bo'lgan hollarda meningokokk kasalligini tashxislashda foydalidir.":
    "Quantitative determination of specific antimeningococcal IgG antibodies by a whole-cell bacterial ELISA may be a useful test for studying immunity against meningococcal disease in individuals as well as in epidemiological studies. The combined use of IgG and IgM tests is useful for diagnosing meningococcal disease when blood or cerebrospinal fluid cultures are negative.",
};

const DICT = { ru: RU, en: EN } as const;

interface I18nValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (s: string) => string;
  // Locale-ga mos raqam formatlash. decimals berilmasa — eng ko'pi 2 kasr.
  fmt: (n: number, decimals?: number) => string;
}

const Ctx = createContext<I18nValue>({
  lang: "uz",
  setLang: () => {},
  t: (s) => s,
  fmt: (n) => String(n),
});

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
  }, []);

  // <html lang> va brauzer yorlig'ini tanlangan tilga moslash (issue #7)
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = TITLES[lang];
  }, [lang]);

  const t = useCallback(
    (s: string) => (lang === "uz" ? s : DICT[lang][s] ?? s),
    [lang]
  );

  const fmt = useCallback(
    (n: number, decimals?: number) =>
      new Intl.NumberFormat(
        LOCALE[lang],
        decimals === undefined
          ? { maximumFractionDigits: 2 }
          : { minimumFractionDigits: decimals, maximumFractionDigits: decimals }
      ).format(n),
    [lang]
  );

  return <Ctx.Provider value={{ lang, setLang, t, fmt }}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);
