import React, { useContext } from 'react'

import { ItemRequest as IItemRequest } from 'types'
import { ItemRequest, ListItem } from 'components'

import Context from '../context'

interface IItemRequestListItemProps {
  item: IItemRequest
  isLast: boolean
}

const ItemRequestListItemWrapper: React.FC<IItemRequestListItemProps> = ({
  item,
  isLast,
}) => {
  const { selectModeOn, requestsSelected } = useContext(Context)

  return (
    <ListItem
      key={item._id}
      button
      className={`request ${selectModeOn ? 'select-mode' : ''} ion-no-padding`}
      isLast={isLast}
    >
      <ItemRequest item={item} selected={requestsSelected.includes(item._id)} />
    </ListItem>
  )
}

export default ItemRequestListItemWrapper
