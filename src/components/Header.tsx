import React, { useEffect } from 'react'
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
  backgroundTransparent?: boolean
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
  backgroundTransparent,
  title,
  size,
  actions = [],
  icon = back,
}) => {
  const omitsBack = ob || platformIsWebBrowser

  const onBack = history.goBack

  useEffect(() => {
    if (backgroundTransparent) {
      const headerStyle = document.createElement('style')
      headerStyle.innerHTML = ':after { background: transparent !important; }'
      // @ts-ignore
      document.querySelector('#toolbar').append(headerStyle)

      const toolbarStyle = document.createElement('style')
      toolbarStyle.innerHTML =
        '.toolbar-background { background: transparent !important; }'
      // @ts-ignore
      document.querySelector('#toolbar').shadowRoot.append(toolbarStyle)
    }
  }, [backgroundTransparent])

  return (
    <IonHeader id="header" color="primary">
      <IonToolbar id="toolbar">
        {omitsBack ? null : (
          <IonButtons slot="start">
            <IonButton
              color="primary"
              style={{ 'mix-blend-mode': 'difference' }}
              onClick={onBack}
            >
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
