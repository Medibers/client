import React from 'react'
import { IonButton } from '@ionic/react'

import Routes from 'routes'
import { navigateTo } from 'app-history'

const CreateAccountButton: React.FC = () => {
  const goToSignup = () => {
    navigateTo(Routes.signup1.path)
  }

  return (
    <IonButton
      onClick={goToSignup}
      expand="block"
      type="button"
      color="primary"
      className="ion-margin"
      fill="clear"
    >
      Create account
    </IonButton>
  )
}

export default CreateAccountButton
