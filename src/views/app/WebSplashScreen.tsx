import React from 'react'

import { IonPage } from '@ionic/react'

const WebSplashScreen: React.FC = () => {
  const imageSrc = process.env.REACT_APP_SPLASH_URL
  return (
    <IonPage
      style={{
        height: '100%',
        width: '100%',
        backgroundImage: `url(${imageSrc})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
      }}
      className="fade-in"
    />
  )
}

export default WebSplashScreen
