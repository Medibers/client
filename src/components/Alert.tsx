import React from 'react'

import { AlertButton, IonAlert } from '@ionic/react'

type Props = {
  open: boolean
  header: string
  message: string
  buttonText?: string
  buttons?: AlertButton[]
  onConfirm?: () => void
  onDismiss: () => void
}

const Component: React.FC<Props> = ({
  open,
  header,
  message,
  buttonText,
  onConfirm,
  onDismiss,
  buttons,
}) => (
  <IonAlert
    isOpen={open}
    onWillDismiss={onDismiss}
    header={header || ''}
    message={message || ''}
    buttons={
      buttons
        ? buttons
        : [
            {
              text: buttonText || 'Okay',
              handler: onConfirm,
            },
          ]
    }
    cssClass="alert-custom"
  />
)

export default Component
