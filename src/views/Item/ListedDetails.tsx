import React from 'react'
import { IonLabel } from '@ionic/react'

import { ListItem } from 'components'

const ListedDetails: React.FC<{ details?: string[] }> = ({ details }) => {
  return details && details.length ? (
    <ListItem className="ion-no-padding" lines="none">
      <IonLabel>
        {details.map(o => (
          <h4 key={o}>{o}</h4>
        ))}
      </IonLabel>
    </ListItem>
  ) : null
}

export default ListedDetails
