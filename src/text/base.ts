import app from './app'
import home from './home'
import about from './about'

interface TPageTextValue {
  en: string
  local?: string
}

export type TPageText = Record<string, TPageTextValue>

type TPageTextKey = 'app' | 'home' | 'about'

type Language = 'en' | 'local'

const language: Language = 'en'

const text: Record<TPageTextKey, TPageText> = {
  app,
  home,
  about,
}

const textTranslated: Record<TPageTextKey, Record<string, string>> = (
  Object.keys(text) as TPageTextKey[]
).reduce((base, pageKey) => {
  base[pageKey] = Object.keys(text[pageKey]).reduce(
    (pageEntities, entityKey) => {
      pageEntities[entityKey] = text[pageKey][entityKey][language]
      return pageEntities
    },
    Object.create(null)
  )
  return base
}, Object.create(null))

export const Text = textTranslated

export default (page: TPageTextKey) => textTranslated[page]
