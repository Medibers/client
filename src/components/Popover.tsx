import React from 'react'

import { IonPopover } from '@ionic/react'

type Props = {
  open: boolean
  event?: Event
  showBackdrop?: boolean
  onPresent?: () => void
  onDismiss?: () => void
  cssClass?: string
}

const Component: React.FC<Props> = ({
  open,
  event,
  showBackdrop,
  onPresent,
  onDismiss,
  cssClass,
  children,
}) => (
  <IonPopover
    isOpen={open}
    event={event}
    onDidPresent={onPresent}
    onDidDismiss={onDismiss}
    showBackdrop={showBackdrop}
    cssClass={cssClass}
  >
    {children}
  </IonPopover>
)

export default Component
