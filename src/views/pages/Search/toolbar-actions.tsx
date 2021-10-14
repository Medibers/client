import React from 'react'

import {
  IonButton,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
} from '@ionic/react'

import { closeOutline as close } from 'ionicons/icons'

import { SearchbarChangeEventDetail } from '@ionic/core'
import { ToolbarAction } from 'types'

import { platformIsWebBrowser } from 'utils'

export const getTitle = (
  onSearch: (event: CustomEvent<SearchbarChangeEventDetail>) => void
) => (
  <IonSearchbar
    style={{
      paddingInlineStart: platformIsWebBrowser ? 'var(--ion-padding)' : 0,
      '--icon-color': 'var(--ion-color-primary)',
      '--color': 'var(--ion-color-primary)',
    }}
    placeholder={searchPlaceholder}
    className="searchbar ion-no-padding"
    clearIcon={close}
    onIonChange={onSearch}
  />
)

const searchPlaceholder = 'Search'

interface IToolbarActionsContext {
  selectedCategory: string
  itemCategories: { label: string; value: string }[]
  onCategorySelected: (value: string) => void
}

export const getSearchToolbarActions = function ({
  selectedCategory,
  itemCategories,
  onCategorySelected,
}: IToolbarActionsContext): ToolbarAction[] {
  return [
    {
      // eslint-disable-next-line react/display-name
      component: () => (
        <IonButton slot="start" style={{ textTransform: 'unset' }}>
          <IonSelect
            interfaceOptions={{
              showBackdrop: false,
              cssClass: 'unlimited-width-popover',
            }}
            interface="popover"
            onIonChange={({ detail: { value } }: CustomEvent) =>
              onCategorySelected(value)
            }
            value={selectedCategory}
          >
            {itemCategories.map(({ label, value }, i, a) => (
              <IonSelectOption
                key={i}
                className={i < a.length - 1 ? '' : 'last'}
                value={value}
              >
                {label}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonButton>
      ),
      handler: () => {},
    },
  ]
}
