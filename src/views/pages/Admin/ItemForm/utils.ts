import { IItemFormFields, ILocationState } from './types'

export const MIN_ITEM_PRICE = 500

export const getItemFormDefaultValues = (
  state?: ILocationState
): IItemFormFields => {
  const values: IItemFormFields = {
    category: null,
    name: null,
    description: null,
    specification: null,
    more: [],
    unit: null,
  }

  if (state && state.selectedCategory) {
    values.category = state.selectedCategory
  }

  if (state && state.item) {
    values.category = state.item.category
    values.name = state.item.name
    values.description = state.item.description.join('\n')
    values.specification = (state.item.specification || []).join('\n')
    // values.more = state.item.more
    values.unit = state.unit._id
  }

  return values
}
