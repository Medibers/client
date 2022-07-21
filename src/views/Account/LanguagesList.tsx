import React from 'react'

import { IonIcon, IonItem, IonLabel, IonList } from '@ionic/react'
import { star } from 'ionicons/icons'

import { languages } from 'languages'

const LanguagesList: React.FC<{
  language: string | null
  onSelect: (a1: string) => void
}> = ({ language, onSelect }) => (
  <IonList className="ion-no-padding">
    {languages.map(({ label, value, disabled = false, description = null }) => (
      <IonItem
        key={value}
        onClick={() => (disabled ? null : onSelect(value))}
        button={!disabled}
      >
        <IonIcon
          icon={language === label ? star : 'no-icon'}
          size="small"
          className="ion-icon-primary"
          slot="start"
        />
        <IonLabel>
          {label}
          <p className="ion-label-primary">{description}</p>
        </IonLabel>
      </IonItem>
    ))}
  </IonList>
)

export default LanguagesList
