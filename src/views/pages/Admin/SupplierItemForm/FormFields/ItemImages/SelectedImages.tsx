import React from 'react'
import { IonButton, IonCol, IonGrid, IonIcon, IonRow } from '@ionic/react'
import { urlIsDataURL } from '../../utils'
import { close } from 'ionicons/icons'
import { useFormContext } from 'react-hook-form'

interface IProps {
  fieldName: string
  images: string[]
}

const FILE_SERVER_URL = process.env.REACT_APP_FILE_SERVER_URL + '/images'

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
                  urlIsDataURL(imageUrl) ? imageUrl : FILE_SERVER_URL + imageUrl
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
