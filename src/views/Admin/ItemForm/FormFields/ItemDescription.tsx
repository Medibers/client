import React from 'react'
import { IonLabel } from '@ionic/react'

import { ListItem } from 'components'
import { TextareaField } from 'components/FormFields'

const Description: React.FC<{ disabled: boolean }> = ({ disabled }) => {
  return (
    <ListItem>
      <IonLabel position="stacked">Description</IonLabel>
      <TextareaField disabled={disabled} name="description" />
    </ListItem>
  )
}

export default Description
