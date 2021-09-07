import React from 'react'
import { ItemSearchResult as IItemSearchResult } from 'types'

interface ISearchContext {
  search?: string
  selectedCategory?: string
  results?: Array<IItemSearchResult>
  selectedItems: Array<IItemSearchResult>
}

const Context = React.createContext<ISearchContext>({
  results: [],
  selectedItems: [],
})

export default Context
