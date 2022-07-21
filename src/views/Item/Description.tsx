import React from 'react'
import { IonLabel } from '@ionic/react'

import { ListItem } from 'components'

const Description: React.FC<{ description?: string[] }> = ({ description }) => {
  return description && description.length ? (
    <ListItem className="ion-no-padding" lines="full">
      <IonLabel>
        <h4>{description.reduce((a, c) => (a ? `${a}. ${c}` : c), '')}</h4>
      </IonLabel>
    </ListItem>
  ) : null
}

export default Description
