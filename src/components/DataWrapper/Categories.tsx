/* eslint-disable react-hooks/rules-of-hooks */

import React from 'react'

import { connect } from 'react-redux'
import { State as ReducerState } from 'reducers'

import { useCategories } from 'requests'

import { ICategory } from 'types'

interface IComponent {
  categories?: ICategory[]
  categoriesApiCallCompleted?: boolean
}

const mapStateToProps = (state: ReducerState) => ({
  categories: state.App.categories,
})

const CategoriesDataWrapper = (Component: React.FC<IComponent>) =>
  connect(mapStateToProps)((({ categories: storeCategories }) => {
    const [loading, , data] = useCategories(!storeCategories)

    const categories = [...(storeCategories ? storeCategories : data)].sort(
      (a, b) => {
        if (a.position === b.position) return 0
        else if (a.position > b.position) return 1
        else return -1
      }
    )

    return (
      <Component
        categories={categories}
        categoriesApiCallCompleted={!loading}
      />
    )
  }) as React.FC<Partial<IComponent>>)

export default CategoriesDataWrapper
