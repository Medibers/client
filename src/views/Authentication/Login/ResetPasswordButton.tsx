import React from 'react'
import { IonButton } from '@ionic/react'

import Routes from 'routes'
import { navigateTo } from 'app-history'

const ResetPasswordButton: React.FC = () => {
  const goToSignup = () => {
    navigateTo(Routes.passwordReset1.path)
  }

  return (
    <IonButton
      onClick={goToSignup}
      expand="block"
      type="button"
      color="secondary"
      className="ion-margin"
      fill="clear"
    >
      Forgot Password?
    </IonButton>
  )
}

export default ResetPasswordButton
