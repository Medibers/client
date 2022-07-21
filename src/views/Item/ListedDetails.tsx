import React from 'react'
import { IonItemDivider, IonLabel } from '@ionic/react'

import { ListItem } from 'components'

const ListedDetails: React.FC<{ details?: string[] }> = ({ details }) => {
  return details && details.length ? (
    <React.Fragment>
      <IonItemDivider style={{ minHeight: '1.2rem', marginBottom: '0.6rem' }} />
      <ListItem className="ion-no-padding" lines="none">
        <IonLabel className="ion-no-margin wrap">
          {details.map(o => (
            <h4 key={o}>{o}</h4>
          ))}
        </IonLabel>
      </ListItem>
    </React.Fragment>
  ) : null
}

export default ListedDetails
