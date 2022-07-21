import React from 'react'

import { IonCol, IonGrid, IonRow } from '@ionic/react'

import Routes from 'routes'

import ItemCategories from 'utils/item-category-map'
import { navigateTo } from 'app-history'

import Category from './Category'

const itemCategories = Object.keys(ItemCategories)
  .filter((k, i) => i)
  .map((key: string) => ({ ...ItemCategories[key], value: key }))

const onSelectCategory = (category: string) => {
  navigateTo(Routes.search.path, { category, items: [] })
}

const Categories = () => (
  <IonGrid>
    <IonRow>
      {itemCategories.map(({ imageUrl, label, description, value }) => (
        <IonCol
          key={value}
          className="ion-no-padding"
          sizeXs="12"
          sizeSm="6"
          sizeMd="6"
          sizeLg="4"
        >
          <div className="fill-height ion-padding">
            <Category
              label={label}
              imageUrl={imageUrl}
              onSelect={() => onSelectCategory(value)}
            />
          </div>
        </IonCol>
      ))}
    </IonRow>
  </IonGrid>
)

export default Categories
