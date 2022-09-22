import React from 'react'

import {
  IonContent,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
} from '@ionic/react'

import { Header, Menu } from 'components'

import { userIsClientUser } from 'utils/role'

import getPageText from 'text'
import getMenuActions from 'views/menu-actions'

import CategoriesDataWrapper from 'components/DataWrapper/Categories'
import { ICategory } from 'types'

import Categories from './Categories'
import DeliveryLocation from './DeliveryLocation'

import { getHomeToolbarActions } from './toolbar-actions'

interface IHomePage {
  categories?: ICategory[]
  categoriesApiCallCompleted?: boolean
}

const Text = getPageText('home')

const HomePage: React.FC<IHomePage> = ({ categories = [] }) => (
  <IonPage>
    <Header omitsBack actions={getHomeToolbarActions()} />
    <Menu actions={getMenuActions()} />
    <IonContent>
      <IonList className="ion-no-padding">
        {userIsClientUser() ? (
          <React.Fragment>
            <DeliveryLocation />
            {categories.length > 0 && (
              <IonListHeader lines="full">
                <IonLabel>
                  <h3 style={{ fontSize: '105%' }}>
                    {Text['category-header']}
                  </h3>
                </IonLabel>
              </IonListHeader>
            )}
          </React.Fragment>
        ) : null}

        <Categories categories={categories} />
      </IonList>
    </IonContent>
  </IonPage>
)

export default CategoriesDataWrapper(HomePage)
