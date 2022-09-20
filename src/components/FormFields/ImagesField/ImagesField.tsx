import React, { useRef } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { IonLabel } from '@ionic/react'

import { ListItem } from 'components'
import { FormFieldError } from 'components/FormFields'

import { getUploadedImageUrls } from '../../../views/Admin/SupplierItemForm/utils'
import { checkFiles, minHeight, minWidth } from './utils'

import SelectedImages from './SelectedImages'

import './ImagesField.css'

interface IImagesField {
  disabled?: boolean
  label?: string
  name: string
}

const ImagesField: React.FC<IImagesField> = ({
  disabled,
  label = 'Pictures',
  name,
}) => {
  const { control, errors, setError, watch } = useFormContext()

  const selectedImages: string[] = getUploadedImageUrls(watch(name))

  const inputRef = useRef<HTMLInputElement>()

  const onFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    controllerOnChange: (files: string[]) => void
  ) => {
    const [validFiles, invalidFiles] = await checkFiles(
      Array.from(event.target.files || [])
    )

    const invalidFilesPresent = Boolean(invalidFiles)

    if (invalidFilesPresent) {
      setError(name, {
        message: `Some pictures were not added. Ensure each picture is at least ${minHeight}px by ${minWidth}px but smaller than 1MB`,
      })
    }

    controllerOnChange(selectedImages.concat(validFiles || []))

    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  return (
    <React.Fragment>
      <ListItem isLast>
        <IonLabel position="stacked">
          {label} <span className="ion-label-secondary">*</span>
        </IonLabel>
        <Controller
          control={control}
          name={name}
          render={({ onChange }) => (
            <input
              type="file"
              disabled={disabled}
              multiple
              accept="image/png,image/jpg,image/jpeg"
              onChange={event => onFileChange(event, onChange)}
              className="input-file"
              ref={(node: HTMLInputElement) => (inputRef.current = node)}
            />
          )}
          rules={{
            validate: value => value.length > 0,
          }}
        />
      </ListItem>
      <FormFieldError
        error={
          errors[name]
            ? errors[name].message || 'Please upload a picture of the item'
            : ''
        }
      />
      <SelectedImages fieldName={name} images={selectedImages} />
    </React.Fragment>
  )
}

export default ImagesField
