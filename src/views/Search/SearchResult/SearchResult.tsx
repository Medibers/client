import React, { useMemo } from 'react'

import { IonGrid, IonIcon, IonItem } from '@ionic/react'

import { LazyLoad } from 'components'

import { ItemSearchResult } from 'types'
import { imageServerUrl } from 'utils'
import { formatMoney } from 'utils/currency'
import { userIsClientUser } from 'utils/role'
import { sessionAvailable } from 'session'

import Name from './Name'
import Specification from './Specification'
import Price from './Price'
import Available from './Available'
import More from './More'

import './SearchResult.scss'

interface ISearchResult {
  selected: boolean
  onSelect: (a1: ItemSearchResult) => void
  onMore: (a1: ItemSearchResult) => void
  lines: boolean
  result: ItemSearchResult
}

const imageWrapperStyle = {
  display: 'flex',
  alignItems: 'center',
  height: 150,
  width: 150,
  padding: 'calc(var(--ion-margin)',
}

const imageWrapperWidthSpan = 150 + 16 * 2 // width + padding

const imageStyle = {
  borderRadius: '50%',
}

const SearchResult: React.FC<ISearchResult> = ({
  result,
  lines,
  selected,
  onSelect,
  onMore,
}) => {
  const { item, currency, price, images } = result

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
      <LazyLoad
        src={imageSrc}
        wrapperStyle={imageWrapperStyle}
        imageStyle={imageStyle}
      />
      <IonGrid
        className="ion-no-padding ion-padding-vertical"
        style={{
          // Makes overflow: ellipses work
          width: `calc(100% - ${imageWrapperWidthSpan}px)`, // Compute what's left after image fills space
        }}
      >
        <Name name={item.name} />
        <Specification specification={result.item.specification} />
        <Price price={formatMoney(price, currency.name)} />
        <Available available={result.available} />
        {isClientUser || sessionNotAvailable ? (
          <More onClick={onClick} />
        ) : null}
      </IonGrid>
      {selected ? (
        <IonIcon
          className="ion-icon-primary"
          icon="/static/assets/icons/checked.svg"
          style={{ position: 'absolute', right: 'calc(var(--ion-margin)' }}
        />
      ) : null}
    </IonItem>
  )
}

export default SearchResult
