import React, { useMemo } from 'react'

import { IonGrid, IonIcon, IonItem } from '@ionic/react'

import { LazyLoad } from 'components'

import { ItemSearchResult } from 'types'
import { imageServerUrl } from 'utils'
import { formatMoney } from 'utils/currency'

import { wrapperWidthSpan as imageWrapperWidthSpan } from 'components/LazyLoad'
import { userIsClientUser } from 'utils/role'

import Name from './Name'
import Description from './Description'
import Price from './Price'
import Available from './Available'
import More from './More'

export type Props = {
  selected: boolean
  onSelect: (a1: ItemSearchResult) => void
  onImageClick: () => void
  onMore: (a1: ItemSearchResult) => void
  lines: boolean
  result: ItemSearchResult
}

const Component: React.FC<Props> = ({
  result,
  lines,
  selected,
  onSelect,
  onImageClick,
  onMore,
}) => {
  const { item, price, images } = result

  const isClientUser = useMemo(userIsClientUser, [])

  const onClick = (event: React.MouseEvent, action: string) => {
    switch (action) {
      case 'primary':
        if (isClientUser) {
          onSelect(result)
        } else {
          onMore(result)
        }
        break
      case 'more':
        event.stopPropagation()
        onMore(result)
        break
    }
  }

  return (
    <IonItem
      button
      lines={lines ? 'full' : 'none'}
      onClick={e => onClick(e, 'primary')}
      className="search-result ion-no-padding"
    >
      <LazyLoad
        onClick={onImageClick}
        item={item.name}
        src={`${imageServerUrl}${images[0]}`}
      />
      <IonGrid
        style={{
          width: `calc(100% - ${imageWrapperWidthSpan}px)`, // Compute what's left after image fills space
        }}
      >
        <Name name={item.name} />
        <Description description={result.item.description} />
        <Price price={formatMoney(price)} />
        <Available available={result.available} />
        <More userIsClientUser={isClientUser} onClick={onClick} />
      </IonGrid>
      <IonIcon
        className="ion-icon-primary"
        icon={selected ? '/assets/icons/checked.svg' : 'no-icon'}
      />
    </IonItem>
  )
}

export default Component
