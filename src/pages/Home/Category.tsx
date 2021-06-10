import React, { useState } from 'react'
import { IonLabel, IonRippleEffect } from '@ionic/react'

const categoryImageStyle: Object = {
  width: '100%',
  height: '250px',
  objectFit: 'cover',
}

const placeholderImageUrl = '/assets/icons/no-icon.svg'

const Category: React.FC<{
  label: string
  description: string
  icon: string
  onSelect: () => void
}> = ({ label, icon, onSelect }) => {
  const [imageUrl, setUrl] = useState(icon)
  const onError = () => setUrl(placeholderImageUrl)

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
