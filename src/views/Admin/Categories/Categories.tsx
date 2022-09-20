import React, { useState } from 'react'

import { IonButton, IonContent, IonIcon, IonList, IonPage } from '@ionic/react'
import {
  addCircleOutline as add,
  chevronDown as down,
  chevronUp as up,
} from 'ionicons/icons'
import { Header } from 'components'

import Requests, { endPoints } from 'requests'
import { ADD_CATEGORY_URL, getCategoryUrl } from 'routes'
import { navigateTo } from 'app-history'
import { ICategory } from 'types'
import { setCategories } from 'store/utils'

import CategoriesDataWrapper from 'components/DataWrapper/Categories'
import ListItem from 'components/ListItem'

const toolbarActions = [
  {
    icon: add,
    handler: () => {
      navigateTo(ADD_CATEGORY_URL)
    },
  },
]

interface ICategories {
  categories?: ICategory[]
}

const Categories: React.FC<ICategories> = ({ categories = [] }) => (
  <IonPage>
    <Header title="Categories" actions={toolbarActions} />
    <IonContent>
      <IonList>
        {categories.map((category, index) => (
          <CategoryListItem
            key={category._id}
            category={category}
            prevPosition={
              categories[index - 1] ? categories[index - 1].position : null
            }
            nextPosition={
              categories[index + 1] ? categories[index + 1].position : null
            }
          />
        ))}
      </IonList>
    </IonContent>
  </IonPage>
)

interface ICategoryListItem {
  category: ICategory
  prevPosition: number | null
  nextPosition: number | null
}

const handleClick = (categoryId: string) => {
  navigateTo(getCategoryUrl(categoryId))
}

// eslint-disable-next-line react/display-name
const CategoryListItem: React.FC<ICategoryListItem> = React.memo(
  ({ category, prevPosition, nextPosition }) => {
    const [directionUpdating, setDirection] = useState('')

    const onPositionUp: React.MouseEventHandler = event => {
      event.stopPropagation()
      onUpdate('up')
    }

    const onPositionDown: React.MouseEventHandler = event => {
      event.stopPropagation()
      onUpdate('down')
    }

    const onUpdate = (direction: 'up' | 'down') => {
      setDirection(direction)
      Requests.put<ICategory>(endPoints.categories + '/' + category._id, {
        position: direction === 'up' ? prevPosition : nextPosition,
      })
        .then(() => Requests.get<ICategory[]>(endPoints.categories))
        .then(setCategories)
        .catch(error => {
          console.error(error) // eslint-disable-line
        })
        .finally(() => setDirection(''))
    }

    return (
      <ListItem onClick={() => handleClick(category._id)} lines="full">
        {category.name}
        {prevPosition && (
          <IonButton
            type="button"
            slot="end"
            className="ion-no-margin"
            fill="clear"
            onClick={onPositionUp}
            disabled={directionUpdating !== ''}
          >
            <IonIcon icon={up} className="ion-icon-primary" />
          </IonButton>
        )}
        {nextPosition && (
          <IonButton
            type="button"
            slot="end"
            className="ion-no-margin"
            fill="clear"
            onClick={onPositionDown}
            disabled={directionUpdating !== ''}
          >
            <IonIcon icon={down} className="ion-icon-primary" />
          </IonButton>
        )}
      </ListItem>
    )
  }
)

export default CategoriesDataWrapper(Categories)
