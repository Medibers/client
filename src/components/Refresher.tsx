import React from 'react'

import { IonRefresher, IonRefresherContent } from '@ionic/react'
// import { platformIsWebBrowser } from 'utils'

interface IRefresherProps {
  onRefresh: () => Promise<void>
}

const Refresher: React.FC<IRefresherProps> = ({
  onRefresh: parentOnRefresh,
}) => {
  // if (platformIsWebBrowser) return null

  const onRefresh = async (event: CustomEvent) => {
    try {
      await parentOnRefresh()
    } catch (error) {
      // ignore
    }
    event.detail.complete()
  }

  return (
    <IonRefresher slot="fixed" onIonRefresh={onRefresh}>
      <IonRefresherContent />
    </IonRefresher>
  )
}

export default Refresher
