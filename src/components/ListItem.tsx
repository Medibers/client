import React from 'react'

import { IonItem } from '@ionic/react'

interface Props {
  isLast: boolean
  lines?: 'full' | 'inset' | 'none'
  button?: boolean
  onClick?: () => void
}

const Component: React.FC<Props> = ({
  isLast,
  lines,
  children,
  button,
  onClick,
}) => (
  <IonItem lines={isLast ? lines : 'none'} button={button} onClick={onClick}>
    {children}
  </IonItem>
)

export default Component
