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
import { sessionAvailable } from 'session'

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
  const sessionNotAvailable = !useMemo(sessionAvailable, [])

  const onClick = (event: React.MouseEvent, action: string) => {
    switch (action) {
      case 'primary':
        if (isClientUser || sessionNotAvailable) {
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

  const imageSrc = `${imageServerUrl}${images[0]}`

  return (
    <IonItem
      button
      lines={lines ? 'full' : 'none'}
      onClick={e => onClick(e, 'primary')}
      className="search-result ion-no-padding"
    >
      <LazyLoad onClick={onImageClick} item={item.name} src={imageSrc} />
      <IonGrid
        style={{
          width: `calc(100% - ${imageWrapperWidthSpan}px)`, // Compute what's left after image fills space
        }}
      >
        <Name name={item.name} />
        <Description description={result.item.description} />
        <Price price={formatMoney(price)} />
        <Available available={result.available} />
        {isClientUser || sessionNotAvailable ? (
          <More onClick={onClick} />
        ) : null}
      </IonGrid>
      <IonIcon
        className="ion-icon-primary"
        icon={selected ? '/assets/icons/checked.svg' : 'no-icon'}
      />
    </IonItem>
  )
}

export default Component
