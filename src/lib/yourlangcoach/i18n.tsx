import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { tppEn, tppHe, tppRu } from "@/lib/yourlangcoach/tppTranslations";
import { homeEn, homeHe, homeRu } from "@/lib/yourlangcoach/homeTranslations";

export type YlcLang = "en" | "he" | "ru";

export const YLC_LANGS: { code: YlcLang; label: string; flag: string; dir: "ltr" | "rtl" }[] = [
  { code: "en", label: "English", flag: "🇬🇧", dir: "ltr" },
  { code: "he", label: "עברית", flag: "🇮🇱", dir: "rtl" },
  { code: "ru", label: "Русский", flag: "🇷🇺", dir: "ltr" },
];

const STORAGE_KEY = "ylc-lang";

const en = {
  nav: {
    howItWorks: "How it works",
    features: "Features",
    pricing: "Pricing",
    download: "Download",
    android: "Android",
    ios: "iOS",
  },
  hero: {
    titleA: "YourLangCoach — ",
    titleB: "learn a language in a way that actually fits you",
    subtitle:
      "A language-learning app created by a language coach to help you build vocabulary, practice naturally, and become a stronger independent learner.",
    supporting:
      "Use AI-guided practice, spaced repetition, your own personal dictionary, and a flexible workbook to learn in a way that suits you best.",
    downloadAndroid: "Download for Android",
    downloadIphone: "Download for iPhone",
    shortLine: "Practice with guidance. Review with structure. Build your own system for learning.",
  },
  flex: {
    eyebrow: "Built for flexible self-learning",
    title: "Learn your way, not one rigid way",
    intro: "YourLangCoach gives you tools to learn in the style that works for you:",
    bullets: [
      "practice with Anna, your AI language coach",
      "save your own words and phrases",
      "review with spaced repetition",
      "upload materials into your workbook",
      "build better habits for independent learning",
    ],
  },
  how: {
    eyebrow: "How it works",
    title: "A simple system for steady progress",
    steps: [
      { title: "Practice with Anna", description: "Get guided language practice, grammar help, and coaching that adapts to your level." },
      { title: "Build your personal dictionary", description: "Save words and phrases you actually want to remember, not random textbook lists." },
      { title: "Review with spaced repetition", description: "Strengthen memory over time with structured review, so words stay with you longer." },
      { title: "Use your workbook", description: "Keep your own learning materials in one place and return to them whenever you need." },
    ],
  },
  features: {
    eyebrow: "What makes YourLangCoach different",
    title: "Designed by a language coach",
    items: [
      { title: "Coaching, not just answers", description: "Anna helps you notice patterns, practice actively, and improve how you learn." },
      { title: "Flexible learning path", description: "Use the app for vocabulary, grammar, speaking, self-study, or all of them together." },
      { title: "Spaced repetition that reinforces memory", description: "Review timing is designed to help words come back before you forget them." },
      { title: "Your own content matters", description: "Your dictionary and workbook are built around the language you actually want to learn." },
      { title: "Suitable for all ages", description: "Simple, calm, focused experience without social pressure or user-to-user interaction." },
    ],
  },
  pricing: {
    eyebrow: "Pricing",
    title: "Start building your own language",
    subtitle: "Try Premium and get full access to AI practice and the YourLangCoach tools.",
    bestValue: "Best value",
    fairUseBadge: "Subject to fair use",
    fairUseNote: "Voice usage is subject to fair use limits to maintain service quality.",
    getStarted: "Get started",
    cancelAnytime: "Cancel anytime in store",
    autoRenew: "Auto-renews until canceled",
    perMonth: "/ month",
    perYear: "/ year",
    plans: [
      { name: "YourLangCoach Premium", tagline: "Full access to all core learning features. Includes 90 voice minutes per billing cycle." },
      { name: "YourLangCoach Premium — Annual", tagline: "Best value. Two months free vs. monthly." },
      { name: "YourLangCoach Voice", tagline: "Extended Voice for learners who want much more speaking practice. Includes 600 voice minutes per billing cycle." },
    ],
    smallPrint: "Subscriptions renew automatically until canceled. Manage or cancel through the store where you purchased your subscription.",
  },
  tppPromo: {
    eyebrow: "Teacher Partner Program",
    title: "Are you a language teacher?",
    text: "We have a special offer for you and your students.",
    cta: "See the offer",
  },
  fhPromo: {
    badge: "Also from our team",
    title: "Want to see our other app, the family task hub?",
    text: "Meet Family Huddle — shared tasks, goals, and rewards that bring families and friends closer, together.",
    cta: "Check it out",
  },
  footer: {
    needHelp: "Need help? Contact:",
    terms: "Terms of Use",
    privacy: "Privacy Policy",
    refund: "Refund Policy",
    deleteAccount: "Delete Account",
    rights: "All rights reserved.",
  },
  home: homeEn,
  tpp: tppEn,
  join: {
    back: "Back",
    eyebrow: "Teacher Partner Program",
    title: "Become a Teacher Partner",
    intro: "Lifetime Premium for you, one free month of Premium for every student. No payment, no commitment.",
    name: "Name",
    namePlaceholder: "Anna Cohen",
    email: "Email",
    emailPlaceholder: "you@example.com",
    languages: "What language(s) do you teach?",
    languagesPlaceholder: "Hebrew, English",
    format: "Teaching format",
    students: "Number of students",
    optional: "(optional)",
    select: "Select",
    submit: "Become a Teacher Partner",
    submitting: "Creating your link…",
    formats: ["Private", "Language school", "Online", "Other"],
    successTitle: "You're in! 🎉",
    successText: "Your Teacher Partner link is ready.",
    studentsGetA: "Your students get ",
    studentsGetB: "1 month of Premium free",
    youGetA: "You get ",
    youGetB: "Lifetime Premium free",
    linkLabel: "Your personal student link",
    saveTitle: "Save your personal student link",
    saveText: "Keep this link somewhere safe. You’ll use the same link whenever you invite a student.",
    copy: "Copy link",
    copied: "Copied",
    codeNoteA: "Students can also enter your code ",
    codeNoteB: " directly in the app.",
    whatsapp: "Share via WhatsApp",
    openIphone: "Open YourLangCoach (iPhone)",
    openAndroid: "Open YourLangCoach (Android)",
    messageLabel: "Message for your students",
    messageHint: "Copy this ready-made message and send it wherever you normally talk with your students.",
    copyMessage: "Copy message",
    whatsappText: "Here is your free month of YourLangCoach Premium:",
    alreadyRegistered: "You're already a Teacher Partner — here is your link again.",
    premiumCodeTitle: "Your personal Premium code",
    premiumCodeBody: "This code gives YOU lifetime Premium access in the YourLangCoach app. Enter it in the app under Settings -> Teacher code. It works only once — it is personal, do NOT share or publish it.",
    premiumCodeWarning: "Share only your referral link/code with students.",
    copyCode: "Copy code",
    copySuccess: "Link copied",
    copyCodeSuccess: "Code copied",
    copyError: "Couldn't copy automatically — please copy the link manually.",
    signupError: "We couldn't complete your signup.",
  },
};

export type YlcDict = typeof en;

const he: YlcDict = {
  nav: { howItWorks: "איך זה עובד", features: "יכולות", pricing: "מחירים", download: "הורדה", android: "אנדרואיד", ios: "iOS" },
  hero: {
    titleA: "YourLangCoach — ",
    titleB: "ללמוד שפה בדרך שמתאימה בדיוק לך",
    subtitle: "אפליקציה ללימוד שפות שנוצרה על ידי מאמנת שפה, כדי לעזור לך להרחיב אוצר מילים, לתרגל באופן טבעי ולהפוך ללומד עצמאי וחזק יותר.",
    supporting: "תרגול בליווי AI, חזרות מרווחות, מילון אישי וחוברת עבודה גמישה — ללמוד בדרך שהכי מתאימה לך.",
    downloadAndroid: "הורדה לאנדרואיד",
    downloadIphone: "הורדה לאייפון",
    shortLine: "לתרגל בליווי. לחזור בשיטתיות. לבנות שיטת לימוד משלך.",
  },
  flex: {
    eyebrow: "בנוי ללמידה עצמית גמישה",
    title: "ללמוד בדרך שלך, לא בדרך אחת נוקשה",
    intro: "YourLangCoach נותנת לך כלים ללמוד בסגנון שמתאים לך:",
    bullets: [
      "לתרגל עם אנה, מאמנת השפה שלך מבוססת AI",
      "לשמור מילים וביטויים משלך",
      "לחזור בעזרת חזרות מרווחות",
      "להעלות חומרים לחוברת העבודה",
      "לפתח הרגלים טובים ללמידה עצמאית",
    ],
  },
  how: {
    eyebrow: "איך זה עובד",
    title: "שיטה פשוטה להתקדמות יציבה",
    steps: [
      { title: "לתרגל עם אנה", description: "תרגול מודרך, עזרה בדקדוק וליווי שמתאים את עצמו לרמה שלך." },
      { title: "לבנות מילון אישי", description: "לשמור מילים וביטויים שבאמת חשוב לך לזכור, לא רשימות אקראיות מספר לימוד." },
      { title: "לחזור עם חזרות מרווחות", description: "לחזק את הזיכרון לאורך זמן בעזרת חזרה מובנית, כך שהמילים נשארות איתך." },
      { title: "להשתמש בחוברת העבודה", description: "לשמור את כל חומרי הלימוד במקום אחד ולחזור אליהם מתי שצריך." },
    ],
  },
  features: {
    eyebrow: "מה מייחד את YourLangCoach",
    title: "פותח על ידי מאמנת שפה",
    items: [
      { title: "ליווי, לא רק תשובות", description: "אנה עוזרת לך לזהות דפוסים, לתרגל באופן פעיל ולשפר את דרך הלמידה שלך." },
      { title: "מסלול למידה גמיש", description: "אוצר מילים, דקדוק, דיבור, לימוד עצמי — או הכול יחד." },
      { title: "חזרות מרווחות שמחזקות זיכרון", description: "תזמון החזרות נועד להחזיר מילים לפני שהן נשכחות." },
      { title: "התוכן שלך חשוב", description: "המילון וחוברת העבודה נבנים סביב השפה שאתה באמת רוצה ללמוד." },
      { title: "מתאים לכל הגילאים", description: "חוויה פשוטה, רגועה וממוקדת, ללא לחץ חברתי וללא אינטראקציה בין משתמשים." },
    ],
  },
  pricing: {
    eyebrow: "מחירים",
    title: "להתחיל לבנות את השפה שלך",
    subtitle: "נסו את Premium וקבלו גישה מלאה לתרגול עם AI ולכל הכלים של YourLangCoach.",
    bestValue: "הכי משתלם",
    fairUseBadge: "בכפוף לשימוש הוגן",
    fairUseNote: "השימוש בקול כפוף למגבלות שימוש הוגן לשמירה על איכות השירות.",
    getStarted: "להתחיל",
    cancelAnytime: "ניתן לבטל בכל עת בחנות",
    autoRenew: "מתחדש אוטומטית עד לביטול",
    perMonth: "/ לחודש",
    perYear: "/ לשנה",
    plans: [
      { name: "YourLangCoach Premium", tagline: "גישה מלאה לכל יכולות הלמידה. כולל 90 דקות קוליות בכל מחזור חיוב." },
      { name: "YourLangCoach Premium — שנתי", tagline: "הכי משתלם. חודשיים חינם לעומת מנוי חודשי." },
      { name: "YourLangCoach Voice", tagline: "קול מורחב ללומדים שרוצים הרבה יותר תרגול דיבור. כולל 600 דקות קוליות בכל מחזור חיוב." },
    ],
    smallPrint: "המנויים מתחדשים אוטומטית עד לביטול. ניתן לנהל או לבטל דרך החנות שבה רכשת את המנוי.",
  },
  tppPromo: {
    eyebrow: "תוכנית שותפות למורים",
    title: "את/ה מורה לשפות?",
    text: "יש לנו הצעה מיוחדת עבורך ועבור התלמידים שלך.",
    cta: "לצפייה בהצעה",
  },
  fhPromo: {
    badge: "גם מהצוות שלנו",
    title: "רוצה לראות את האפליקציה השנייה שלנו למשימות משפחתיות?",
    text: "הכירו את Family Huddle — משימות, יעדים ופרסים משותפים שמקרבים משפחות וחברים.",
    cta: "לבדיקה",
  },
  footer: {
    needHelp: "צריך עזרה? כתבו לנו:",
    terms: "תנאי שימוש",
    privacy: "מדיניות פרטיות",
    refund: "מדיניות החזרים",
    deleteAccount: "מחיקת חשבון",
    rights: "כל הזכויות שמורות.",
  },
  home: homeHe,
  tpp: tppHe,
  join: {
    back: "חזרה",
    eyebrow: "תוכנית שותפות למורים",
    title: "להצטרף כמורה שותף",
    intro: "Premium לכל החיים עבורך, וחודש Premium חינם לכל תלמיד. בלי תשלום, בלי התחייבות.",
    name: "שם",
    namePlaceholder: "אנה כהן",
    email: "אימייל",
    emailPlaceholder: "you@example.com",
    languages: "אילו שפות את/ה מלמד/ת?",
    languagesPlaceholder: "עברית, אנגלית",
    format: "פורמט ההוראה",
    students: "מספר תלמידים",
    optional: "(לא חובה)",
    select: "בחירה",
    submit: "להצטרף כמורה שותף",
    submitting: "יוצרים את הקישור שלך…",
    formats: ["פרטי", "בית ספר לשפות", "אונליין", "אחר"],
    successTitle: "נרשמת! 🎉",
    successText: "הקישור שלך כמורה שותף מוכן.",
    studentsGetA: "התלמידים שלך מקבלים ",
    studentsGetB: "חודש Premium בחינם",
    youGetA: "את/ה מקבל/ת ",
    youGetB: "Premium לכל החיים בחינם",
    linkLabel: "הקישור האישי שלך לתלמידים",
    saveTitle: "כדאי לשמור את הקישור האישי שלך לתלמידים",
    saveText: "שמרו את הקישור במקום בטוח. זה אותו קישור שבו תשתמשו בכל פעם שתזמינו תלמיד או תלמידה.",
    copy: "העתקת קישור",
    copied: "הועתק",
    codeNoteA: "התלמידים יכולים גם להזין את הקוד שלך ",
    codeNoteB: " ישירות באפליקציה.",
    whatsapp: "שיתוף בוואטסאפ",
    openIphone: "פתיחת YourLangCoach (אייפון)",
    openAndroid: "פתיחת YourLangCoach (אנדרואיד)",
    messageLabel: "הודעה לתלמידים שלך",
    messageHint: "העתיקו את ההודעה המוכנה ושלחו אותה בדרך שבה אתם רגילים לתקשר עם התלמידים שלכם.",
    copyMessage: "העתקת ההודעה",
    whatsappText: "הנה חודש Premium חינם ב‑YourLangCoach:",
    alreadyRegistered: "את/ה כבר מורה שותף — הנה הקישור שלך שוב.",
    premiumCodeTitle: "הקוד האישי שלך ל‑Premium",
    premiumCodeBody: "קוד זה נותן לך גישת Premium לכל החיים ב‑YourLangCoach. הזינו אותו באפליקציה בהגדרות -> קוד מורה. הקוד תקף פעם אחת בלבד — הוא אישי, אין לשתף או לפרסם אותו.",
    premiumCodeWarning: "שתפו רק את קישור ההפניה/קוד ההפניה עם התלמידים.",
    copyCode: "העתקת קוד",
    copySuccess: "הקישור הועתק",
    copyCodeSuccess: "הקוד הועתק",
    copyError: "לא הצלחנו להעתיק אוטומטית — אפשר להעתיק ידנית.",
    signupError: "לא הצלחנו להשלים את ההרשמה.",
  },
};

const ru: YlcDict = {
  nav: { howItWorks: "Как это работает", features: "Возможности", pricing: "Цены", download: "Скачать", android: "Android", ios: "iOS" },
  hero: {
    titleA: "YourLangCoach — ",
    titleB: "изучайте язык так, как удобно именно вам",
    subtitle: "Приложение для изучения языков, созданное языковым коучем: расширяйте словарный запас, практикуйтесь естественно и становитесь увереннее в самостоятельном обучении.",
    supporting: "Практика с ИИ, интервальные повторения, личный словарь и гибкая рабочая тетрадь — учитесь так, как подходит именно вам.",
    downloadAndroid: "Скачать для Android",
    downloadIphone: "Скачать для iPhone",
    shortLine: "Практика с поддержкой. Повторение по системе. Собственный подход к обучению.",
  },
  flex: {
    eyebrow: "Создано для гибкого самообучения",
    title: "Учитесь по-своему, а не по жёсткой схеме",
    intro: "YourLangCoach даёт инструменты для обучения в удобном вам стиле:",
    bullets: [
      "практикуйтесь с Анной, вашим ИИ-коучем по языку",
      "сохраняйте свои слова и фразы",
      "повторяйте с интервальными повторениями",
      "загружайте материалы в рабочую тетрадь",
      "формируйте полезные привычки самостоятельного обучения",
    ],
  },
  how: {
    eyebrow: "Как это работает",
    title: "Простая система стабильного прогресса",
    steps: [
      { title: "Практика с Анной", description: "Управляемая практика языка, помощь с грамматикой и коучинг под ваш уровень." },
      { title: "Личный словарь", description: "Сохраняйте слова и фразы, которые действительно хотите запомнить, а не случайные списки из учебника." },
      { title: "Интервальные повторения", description: "Повторение по структуре укрепляет память, и слова остаются с вами дольше." },
      { title: "Рабочая тетрадь", description: "Держите свои учебные материалы в одном месте и возвращайтесь к ним, когда нужно." },
    ],
  },
  features: {
    eyebrow: "Чем отличается YourLangCoach",
    title: "Создано языковым коучем",
    items: [
      { title: "Коучинг, а не только ответы", description: "Анна помогает замечать закономерности, активно практиковаться и улучшать сам процесс обучения." },
      { title: "Гибкий путь обучения", description: "Лексика, грамматика, речь, самостоятельные занятия — или всё сразу." },
      { title: "Интервальные повторения для памяти", description: "Время повторений подобрано так, чтобы слова возвращались до того, как забудутся." },
      { title: "Ваш собственный контент важен", description: "Словарь и рабочая тетрадь строятся вокруг языка, который вы действительно учите." },
      { title: "Подходит для любого возраста", description: "Простой, спокойный и сфокусированный опыт без социального давления и общения между пользователями." },
    ],
  },
  pricing: {
    eyebrow: "Цены",
    title: "Начните строить свой собственный язык",
    subtitle: "Попробуйте Premium и получите полный доступ к AI-практике и инструментам YourLangCoach.",
    bestValue: "Выгоднее всего",
    fairUseBadge: "С учётом добросовестного использования",
    fairUseNote: "Голосовые минуты ограничены правилами добросовестного использования для сохранения качества сервиса.",
    getStarted: "Начать",
    cancelAnytime: "Отмена в любой момент в магазине",
    autoRenew: "Продлевается автоматически до отмены",
    perMonth: "/ месяц",
    perYear: "/ год",
    plans: [
      { name: "YourLangCoach Premium", tagline: "Полный доступ ко всем основным возможностям. Включает 90 голосовых минут за расчётный период." },
      { name: "YourLangCoach Premium — годовой", tagline: "Самый выгодный вариант. Два месяца бесплатно по сравнению с месячным." },
      { name: "YourLangCoach Voice", tagline: "Расширенный голос для тех, кто хочет гораздо больше разговорной практики. Включает 600 голосовых минут за расчётный период." },
    ],
    smallPrint: "Подписки продлеваются автоматически до отмены. Управлять подпиской или отменить её можно в магазине, где вы её оформили.",
  },
  tppPromo: {
    eyebrow: "Программа для преподавателей",
    title: "Вы преподаёте языки?",
    text: "У нас есть специальное предложение для вас и ваших учеников.",
    cta: "Посмотреть предложение",
  },
  fhPromo: {
    badge: "Также от нашей команды",
    title: "Хотите увидеть наше второе приложение для семейных задач?",
    text: "Family Huddle — общие задачи, цели и награды, которые сближают семьи и друзей.",
    cta: "Посмотреть",
  },
  footer: {
    needHelp: "Нужна помощь? Напишите:",
    terms: "Условия использования",
    privacy: "Политика конфиденциальности",
    refund: "Политика возврата",
    deleteAccount: "Удалить аккаунт",
    rights: "Все права защищены.",
  },
  home: homeRu,
  tpp: tppRu,
  join: {
    back: "Назад",
    eyebrow: "Программа для преподавателей",
    title: "Стать партнёром-преподавателем",
    intro: "Premium навсегда для вас и бесплатный месяц Premium каждому ученику. Без оплаты и без обязательств.",
    name: "Имя",
    namePlaceholder: "Анна Коэн",
    email: "Эл. почта",
    emailPlaceholder: "you@example.com",
    languages: "Какие языки вы преподаёте?",
    languagesPlaceholder: "Иврит, английский",
    format: "Формат преподавания",
    students: "Количество учеников",
    optional: "(необязательно)",
    select: "Выбрать",
    submit: "Стать партнёром-преподавателем",
    submitting: "Создаём вашу ссылку…",
    formats: ["Частно", "Языковая школа", "Онлайн", "Другое"],
    successTitle: "Готово! 🎉",
    successText: "Ваша партнёрская ссылка готова.",
    studentsGetA: "Ваши ученики получают ",
    studentsGetB: "1 месяц Premium бесплатно",
    youGetA: "Вы получаете ",
    youGetB: "Premium навсегда бесплатно",
    linkLabel: "Ваша личная ссылка для учеников",
    saveTitle: "Сохраните вашу личную ссылку для учеников",
    saveText: "Храните эту ссылку в надёжном месте. Используйте её каждый раз, когда приглашаете ученика.",
    copy: "Копировать ссылку",
    copied: "Скопировано",
    codeNoteA: "Ученики также могут ввести ваш код ",
    codeNoteB: " прямо в приложении.",
    whatsapp: "Поделиться в WhatsApp",
    openIphone: "Открыть YourLangCoach (iPhone)",
    openAndroid: "Открыть YourLangCoach (Android)",
    messageLabel: "Сообщение для ваших учеников",
    messageHint: "Скопируйте готовое сообщение и отправьте его там, где вы обычно общаетесь с учениками.",
    copyMessage: "Копировать сообщение",
    whatsappText: "Вот ваш бесплатный месяц YourLangCoach Premium:",
    alreadyRegistered: "Вы уже партнёр-преподаватель — вот ваша ссылка снова.",
    premiumCodeTitle: "Ваш персональный код Premium",
    premiumCodeBody: "Этот код даёт ВАМ пожизненный доступ к Premium в приложении YourLangCoach. Введите его в приложении в разделе Настройки -> Код преподавателя. Код действует только один раз — он персональный, НЕ передавайте и не публикуйте его.",
    premiumCodeWarning: "Делитесь с учениками только своей реферальной ссылкой/кодом.",
    copyCode: "Копировать код",
    copySuccess: "Ссылка скопирована",
    copyCodeSuccess: "Код скопирован",
    copyError: "Не удалось скопировать автоматически — скопируйте ссылку вручную.",
    signupError: "Не удалось завершить регистрацию.",
  },
};

const DICTS: Record<YlcLang, YlcDict> = { en, he, ru };

type Ctx = { lang: YlcLang; setLang: (lang: YlcLang) => void; t: YlcDict; dir: "ltr" | "rtl" };

const YlcLangContext = createContext<Ctx>({ lang: "en", setLang: () => {}, t: en, dir: "ltr" });

export const useYlcLang = () => useContext(YlcLangContext);

export const YlcLangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<YlcLang>(() => {
    if (typeof window === "undefined") return "en";
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "he" || stored === "ru" || stored === "en" ? stored : "en";
  });

  const setLang = useCallback((next: YlcLang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const dir = lang === "he" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t: DICTS[lang], dir } as Ctx), [lang, setLang, dir]);

  return <YlcLangContext.Provider value={value}>{children}</YlcLangContext.Provider>;
};
