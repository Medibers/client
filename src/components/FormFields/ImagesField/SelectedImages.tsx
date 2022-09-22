import React from 'react'
import { IonButton, IonCol, IonGrid, IonIcon, IonRow } from '@ionic/react'
import { close } from 'ionicons/icons'
import { useFormContext } from 'react-hook-form'
import { imageServerUrl } from 'utils'

interface IProps {
  fieldName: string
  images: string[]
}

const urlIsDataURL = (url: string = '') => url.startsWith('data:')

const SelectedImages: React.FC<IProps> = ({ fieldName, images }) => {
  const { setValue, getValues } = useFormContext()

  const onRemoveImage = (url: string) => {
    const urls = (getValues(fieldName) as string[]).filter(
      value => value !== url
    )
    setValue(fieldName, urls)
  }

  return (
    <IonGrid>
      <IonRow>
        {images.map((imageUrl, i) => (
          <IonCol
            key={i}
            className="ion-no-padding"
            sizeXs="6"
            sizeSm="6"
            sizeMd="4"
            sizeLg="2"
          >
            <div style={{ padding: 10 }}>
              <DeleteButton onClick={() => onRemoveImage(imageUrl)} />
              <img
                src={
                  urlIsDataURL(imageUrl) ? imageUrl : imageServerUrl + imageUrl
                }
                alt=""
              />
            </div>
          </IonCol>
        ))}
      </IonRow>
    </IonGrid>
  )
}

const DeleteButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <IonButton
    size="small"
    shape="round"
    onClick={onClick}
    fill="clear"
    style={{
      position: 'absolute',
      top: 15,
      right: 15,
      margin: 0,
    }}
  >
    <IonIcon lazy icon={close} color="secondary" />
  </IonButton>
)

export default SelectedImages
