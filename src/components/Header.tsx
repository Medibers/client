import React from 'react'
import { arrowBack as back } from 'ionicons/icons'
import {
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from '@ionic/react'

import { ToolbarAction } from 'types'

import history from 'app-history'
import { APP_NAME, platformIsWebBrowser } from 'utils'

export type Props = {
  omitsBack?: boolean
  title?: string | JSX.Element
  size?: 'small' | 'large'
  actions?: Array<ToolbarAction>
  icon?: string
}

const buttonStyle = {
  textTransform: 'unset',
}

const Component: React.FC<Props> = ({
  omitsBack: ob,
  title,
  size,
  actions = [],
  icon = back,
}) => {
  const omitsBack = ob || platformIsWebBrowser

  const onBack = history.goBack

  return (
    <IonHeader>
      <IonToolbar>
        {omitsBack ? null : (
          <IonButtons slot="start">
            <IonButton color="primary" onClick={onBack}>
              <IonIcon icon={icon} />
            </IonButton>
          </IonButtons>
        )}
        <IonTitle size={size} color="primary">
          {title}
        </IonTitle>
        <IonButtons slot="secondary">
          {actions.map(({ icon, text, component: Component, handler }, i) =>
            Component ? (
              <Component key={i} />
            ) : (
              <IonButton key={i} onClick={handler} style={buttonStyle}>
                {icon ? <IonIcon color="primary" icon={icon} /> : null}
                {text ? text : null}
              </IonButton>
            )
          )}
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  )
}

Component.defaultProps = { title: APP_NAME, size: 'large' }

export default Component
