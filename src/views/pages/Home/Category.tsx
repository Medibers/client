import React, { useState } from 'react'
import { IonLabel, IonRippleEffect } from '@ionic/react'

const categoryImageStyle: Record<string, string> = {
  width: '100%',
  height: '250px',
  objectFit: 'cover',
}

const Category: React.FC<{
  label: string
  imageUrl: string
  onSelect: () => void
}> = ({ label, imageUrl, onSelect }) => {
  const onError = () => {
    // eslint-disable-next-line no-console
    console.error('Could not load image at ' + imageUrl)
  }

  const [loaded, setLoaded] = useState(false)
  const onLoad = () => setLoaded(true)

  return (
    <div
      onClick={onSelect}
      className="item-category fill-height ion-activatable"
    >
      <img
        style={{
          ...categoryImageStyle,
          opacity: loaded ? 1 : 0,
          transition: 'opacity 1s',
        }}
        src={imageUrl}
        onLoad={onLoad}
        onError={onError}
        alt=""
      />
      <div className="ion-padding">
        <IonLabel>
          <h3 className="ion-label-primary" style={{ fontSize: '105%' }}>
            {label}
          </h3>
        </IonLabel>
      </div>
      <IonRippleEffect />
    </div>
  )
}

export default Category
