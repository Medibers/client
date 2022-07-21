import React from 'react'
import { IonLabel, IonList } from '@ionic/react'

import { ListItem } from 'components'
import { indexIsLastInArray } from 'utils'

import { ISupportContacts } from './types'
import { mapContactsToListItem } from './utils'

interface Props {
  contacts: ISupportContacts
}

const Contacts: React.FC<Props> = ({ contacts }) => {
  return (
    <IonList lines="full">
      {mapContactsToListItem(contacts).map(
        ({ header, description, action }, i, a) => (
          <ListItem
            key={i}
            isLast={indexIsLastInArray(i, a)}
            button={Boolean(action)}
            onClick={action}
          >
            <IonLabel>
              <p>{header}</p>
              <h3
                className="ion-label-primary wrap"
                dangerouslySetInnerHTML={{
                  __html: description ? description : '',
                }}
              />
            </IonLabel>
          </ListItem>
        )
      )}
    </IonList>
  )
}

export default Contacts
