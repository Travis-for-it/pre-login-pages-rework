import { availableLocales } from "./availableLocales"

const languages = Object.keys(availableLocales)

export const paramsForLangPaths = () => {
    return languages.map((locale) => {
        if (locale === 'en_us') {
            return { params: {lang: undefined} }
        }
        return { params:{lang: locale } }
    })
}