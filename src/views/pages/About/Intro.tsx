import React from 'react'
import { IonItem, IonLabel, IonList } from '@ionic/react'

import { sessionAvailable as isSessionAvailable } from 'session'
import { APP_NAME } from 'utils'

const ionItemStyle = {
  '--min-height': 0,
}

const sessionAvailable = isSessionAvailable()

const intros = [
  `${APP_NAME} is an online application designed to be Uganda’s leading
  marketplace for medical equipment, supplies and drugs.`,
  `${APP_NAME} is founded by scientists with a diverse background in
  Laboratory Technology, Biomedical Engineering, Medicine,
  Pharmacy, Business and Software Engineering.`,
  `The team is dedicated to improving the supply of medical products
  and health services to those in need. We welcome you to enjoy our
  services.`,
  `We provide our customers with a digital platform for discovery and
  purchase of medical products from distributors across the globe.`,
]

const steps = [
  'Request for an item through the categories provided',
  'Choose a delivery location',
  'Make payment or pay on delivery',
]

const aboutIonItemStyle = {
  ...ionItemStyle,
  marginBottom: 5,
}

const Component: React.FC = () => {
  return (
    <IonLabel>
      <IonList lines="none" className="ion-no-padding">
        {intros.map((intro, i) => (
          <IonItem key={i} className="ion-no-padding" style={aboutIonItemStyle}>
            <h3>{intro}</h3>
          </IonItem>
        ))}
        <IonItem
          className="ion-no-padding ion-margin-vertical"
          style={ionItemStyle}
        >
          <h3>
            {sessionAvailable
              ? `
            Get started in ${steps.length} quick steps`
              : `
            Set up an account with your telephone number
            and enjoy our services in ${steps.length} quick steps
          `}
          </h3>
        </IonItem>
        {steps.map((step, i) => (
          <IonItem
            key={i}
            className="ion-align-items-start ion-no-padding ion-margin-vertical"
            style={ionItemStyle}
          >
            <h3
              style={{ marginInlineEnd: '8px' }}
              className="ion-label-primary"
            >
              {i + 1}.
            </h3>
            <h3 className="ion-label-primary">{step}</h3>
          </IonItem>
        ))}
      </IonList>
    </IonLabel>
  )
}

export default Component
