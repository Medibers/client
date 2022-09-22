import React from 'react'
import { IonLabel } from '@ionic/react'
import { useFormContext } from 'react-hook-form'
import { FormFieldError, ListItem } from 'components'
import { TextField } from 'components/FormFields'

const fieldName = 'name'

const CategoryName: React.FC<{ disabled: boolean }> = ({ disabled }) => {
  const { errors } = useFormContext()

  return (
    <React.Fragment>
      <ListItem>
        <IonLabel position="stacked">
          Name <span className="ion-label-secondary">*</span>
        </IonLabel>
        <TextField required disabled={disabled} name={fieldName} />
      </ListItem>
      <FormFieldError error={errors[fieldName] ? 'Name is required' : ''} />
    </React.Fragment>
  )
}

export default CategoryName
