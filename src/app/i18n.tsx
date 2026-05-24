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
