export const availableLocales = {
    'en_us': {
        'language': 'English',
        'languageWord': 'Language',
        'disabled': false,
    },
    'ja_jp': {
        'language': '日本語',
        'languageWord': '言語',
        'disabled': false,
    },
    'zh_cn': {
        'language': '中文（简体中文）',
        'languageWord': '语言',
        'disabled': false,
    },
    'zh_tw': {
        'language': '中文（繁體中文）',
        'languageWord': '語言',
        'disabled': false,
    },
    'th_th': {
        'language': 'ภาษาไทย',
        'languageWord': 'ภาษา',
        'disabled': false,
    },
    'vi_vn': {
        'language': 'Tiếng Việt',
        'languageWord': 'Ngôn ngữ',
        'disabled': false,
    },
}

export type LocaleKey = keyof typeof availableLocales;

type LocaleInfo = {
  language: string;
  languageWord: string;
  disabled: boolean;
};

export type AvailableLocales = {
  [key in LocaleKey]: LocaleInfo;
};