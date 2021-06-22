import app from './app'
import home from './home'
import about from './about'
import itemRequest from './item-request'
import itemRequestList from './item-request-list'
import order from './order'

interface TPageTextValue {
  en: string
  local?: string
}

export type TPageText = Record<string, TPageTextValue>

type TPageTextKey =
  | 'app'
  | 'home'
  | 'about'
  | 'item-request'
  | 'item-request-list'
  | 'order'

type Language = 'en' | 'local'

const language: Language = 'en'

const text: Record<TPageTextKey, TPageText> = {
  app,
  home,
  about,
  'item-request': itemRequest,
  'item-request-list': itemRequestList,
  order,
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
