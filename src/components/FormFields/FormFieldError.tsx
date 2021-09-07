import React from 'react'

import { IonLabel } from '@ionic/react'

const styles = {
  h4: {
    margin: '5px var(--ion-margin) 0',
    fontSize: '80%',
  },
}

interface IComponentProps {
  error: string
}

const Component: React.FC<IComponentProps> = ({ error }) => {
  return (
    <IonLabel>
      <h4 className="ion-label-danger" style={styles.h4}>
        {error}
      </h4>
    </IonLabel>
  )
}

export default Component
