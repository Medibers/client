import React, { useContext, useState } from 'react'
import { IonList } from '@ionic/react'

import { indexIsLastInArray } from 'utils'

import NoRequests from './NoItemRequests'
import ItemRequestListItemWrapper from './ItemRequestListItemWrapper'
import CompleteItemRequestListToggle from './CompleteItemRequestListToggle'

import Context from '../context'

const ItemRequestList: React.FC = () => {
  const [completeRequestsShown, setCompleteRequestsShown] = useState(false)

  const onToggleCompleteOrders = () => {
    setCompleteRequestsShown(!completeRequestsShown)
  }

  const { activeRequests, archivedRequests } = useContext(Context)

  return activeRequests.length || archivedRequests.length ? (
    <IonList style={{ paddingTop: 0, paddingBottom: 0 }}>
      {activeRequests.map((item, i, a) => (
        <ItemRequestListItemWrapper
          key={item._id}
          item={item}
          isLast={indexIsLastInArray(i, a)}
        />
      ))}
      {archivedRequests.length > 0 && (
        <CompleteItemRequestListToggle
          completeRequestsShown={completeRequestsShown}
          onToggleCompleteOrders={onToggleCompleteOrders}
        />
      )}
      {completeRequestsShown
        ? archivedRequests.map((item, i, a) => (
            <ItemRequestListItemWrapper
              key={item._id}
              item={item}
              isLast={indexIsLastInArray(i, a)}
            />
          ))
        : null}
    </IonList>
  ) : (
    <NoRequests />
  )
}

export default ItemRequestList
