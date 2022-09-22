import React, { useMemo } from 'react'

import { IonCol, IonGrid, IonLabel, IonRow } from '@ionic/react'

import Routes from 'routes'

import { navigateTo } from 'app-history'

import Category from './Category'
import { ICategory } from 'types'

const categoryImageBaseUrl = '/static/assets/images/item-category'

const onSelectCategory = (category: string) => {
  navigateTo(Routes.search.path, { category, items: [] })
}

const Categories: React.FC<{
  categories: ICategory[]
}> = ({ categories }) => {
  const categoriesSorted = useMemo(
    () => categories.sort((a, b) => (a.position > b.position ? 1 : -1)),
    [categories]
  )

  return categories.length > 0 ? (
    <IonGrid className="item-category-grid">
      <IonRow>
        {categoriesSorted.map(({ _id, image, name }) => (
          <IonCol
            key={name}
            className="ion-no-padding"
            sizeXs="6"
            sizeSm="4"
            sizeMd="3"
          >
            <div className="fill-height item-category-wrapper">
              <Category
                label={name}
                imageUrl={categoryImageBaseUrl + image}
                onSelect={() => onSelectCategory(_id)}
              />
            </div>
          </IonCol>
        ))}
      </IonRow>
    </IonGrid>
  ) : (
    <NoCategories />
  )
}

const NoCategories: React.FC = () => (
  <div className="ion-padding">
    <IonLabel>
      <p>Categories will appear here</p>
    </IonLabel>
  </div>
)

export default Categories
