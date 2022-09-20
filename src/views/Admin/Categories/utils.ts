import { ICategory } from 'types'
import { ICategoryFormFields } from './types'

export const getItemFormDefaultValues = (
  category?: ICategory
): ICategoryFormFields => ({
  name: category ? category.name : '',
  image: category ? [category.image] : [],
})
