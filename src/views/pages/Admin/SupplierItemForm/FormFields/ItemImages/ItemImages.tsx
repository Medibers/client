import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { IonLabel } from '@ionic/react'

import { ListItem } from 'components'
import { FormFieldError } from 'components/FormFields'

import { checkFiles, minHeight, minWidth } from './utils'

import SelectedImages from './SelectedImages'

import './ItemImages.css'

const fieldName = 'images'

const Images: React.FC = () => {
  const { control, errors, setError, watch } = useFormContext()

  const selectedImages: string[] = watch(fieldName)

  const onFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    controllerOnChange: (files: string[]) => void
  ) => {
    const [validFiles, invalidFiles] = await checkFiles(
      Array.from(event.target.files || [])
    )

    const invalidFilesPresent = Boolean(invalidFiles)

    if (invalidFilesPresent) {
      setError(fieldName, {
        message: `Some pictures were not added. Ensure each picture is at least ${minHeight}px by ${minWidth}px but smaller than 1MB`,
      })
    }

    controllerOnChange(selectedImages.concat(validFiles || []))
  }

  return (
    <React.Fragment>
      <ListItem isLast>
        <IonLabel position="stacked">
          Pictures <span className="ion-label-secondary">*</span>
        </IonLabel>
        <Controller
          control={control}
          name={fieldName}
          render={({ onChange }) => (
            <input
              type="file"
              multiple
              accept="image/png,image/jpg,image/jpeg"
              onChange={event => onFileChange(event, onChange)}
              className="input-file"
            />
          )}
          rules={{
            validate: value => value.length > 0,
          }}
        />
      </ListItem>
      <FormFieldError
        error={
          errors[fieldName]
            ? errors[fieldName].message || 'Please upload a picture of the item'
            : ''
        }
      />
      <SelectedImages images={selectedImages} />
    </React.Fragment>
  )
}

export default Images
