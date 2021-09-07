import React from 'react'
import { IonCol, IonGrid, IonRow } from '@ionic/react'
import { urlIsDataURL } from '../../utils'

interface IProps {
  images: string[]
}

const FILE_SERVER_URL = process.env.REACT_APP_FILE_SERVER_URL + '/images'

const SelectedImages: React.FC<IProps> = ({ images }) => {
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

export default SelectedImages
