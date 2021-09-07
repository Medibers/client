import React from 'react'
import { IonItem, IonList } from '@ionic/react'

const searchResultsDivStyle: Object = {
  minWidth: 200,
  maxHeight: 'calc(40vh)', // 100% - 2 * top
  overflowY: 'auto',
  position: 'absolute',
  top: 60,
  boxShadow: '0 0 5px 0 rgba(0, 0, 0, .8)',
  zIndex: 1,
}

interface ISupplierAddressResults {
  results: google.maps.places.PlaceResult[]
  onPlacesResultClick: (result: google.maps.places.PlaceResult) => void
}

const SupplierAddressResults: React.FC<ISupplierAddressResults> = ({
  results,
  onPlacesResultClick,
}) => {
  return (
    <div
      style={{
        ...searchResultsDivStyle,
        visibility: results.length ? 'visible' : 'hidden',
      }}
    >
      <IonList lines="none" className="ion-no-padding">
        {results.map((result, i) => (
          <IonItem key={i} onClick={() => onPlacesResultClick(result)} button>
            {result.name}
          </IonItem>
        ))}
      </IonList>
    </div>
  )
}

export default SupplierAddressResults
