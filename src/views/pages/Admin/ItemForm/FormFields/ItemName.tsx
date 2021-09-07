import React from 'react'
import { useFormContext } from 'react-hook-form'
import { IonLabel } from '@ionic/react'

import { ListItem } from 'components'
import { FormFieldError, TextField } from 'components/FormFields'

const fieldName = 'name'

const Name: React.FC<{ disabled: boolean }> = ({ disabled }) => {
  const { errors } = useFormContext()

  return (
    <React.Fragment>
      <ListItem>
        <IonLabel position="stacked">
          Name <span className="ion-label-secondary">*</span>
        </IonLabel>
        <TextField disabled={disabled} required name={fieldName} />
      </ListItem>
      <FormFieldError error={errors[fieldName] ? 'Name is required' : ''} />
    </React.Fragment>
  )
}

export default Name
