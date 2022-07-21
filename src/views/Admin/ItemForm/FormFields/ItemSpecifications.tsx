import React from 'react'
import { IonLabel } from '@ionic/react'

import { ListItem } from 'components'
import { TextareaField } from 'components/FormFields'

const Specification: React.FC<{ disabled: boolean }> = ({ disabled }) => {
  return (
    <ListItem>
      <IonLabel position="stacked">Specification</IonLabel>
      <TextareaField disabled={disabled} name="specification" />
    </ListItem>
  )
}

export default Specification
