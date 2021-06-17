import React from 'react'

import { IonItem } from '@ionic/react'

interface Props {
  isLast: boolean
  lines?: 'full' | 'inset' | 'none'
  button?: boolean
  onClick?: () => void
  className?: string
}

const ListItemStyle = {
  cursor: 'pointer',
}

const ListIem: React.FC<Props> = ({
  isLast,
  lines,
  children,
  button,
  onClick,
  className,
}) => (
  <IonItem
    lines={isLast ? 'none' : lines}
    button={button}
    onClick={onClick}
    style={ListItemStyle}
    className={className}
  >
    {children}
  </IonItem>
)

export default ListIem
