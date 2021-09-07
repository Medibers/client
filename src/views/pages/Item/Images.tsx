import React from 'react'

import { ImageSlider, ListItem } from 'components'

const Images: React.FC<{ urls: string[] }> = ({ urls }) => {
  return (
    <ListItem className="ion-margin-bottom">
      <ImageSlider urls={urls} imageStyle={{ height: '50vh' }} />
    </ListItem>
  )
}

export default Images
