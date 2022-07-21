import React from 'react'
import { IonLabel } from '@ionic/react'

import { ListItem } from 'components'

const CountryOrigin: React.FC<{ country?: string }> = ({ country }) => {
  return (
    <ListItem className="ion-no-padding">
      <IonLabel>
        <h4>
          <i>
            Country of Origin -{' '}
            <span className="ion-text-uppercase">{country || 'Uganda'}</span>
          </i>
        </h4>
      </IonLabel>
    </ListItem>
  )
}

export default CountryOrigin
