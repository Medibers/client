import React from 'react'

import { IonSlide, IonSlides } from '@ionic/react'

import { imageServerUrl } from 'utils'

import { LazyLoad } from 'components'

import './ImageSlider.scss'

interface IImageSlider {
  urls: Array<string>
}

const imageWrapperStyle = {
  height: '100%',
}

const Component: React.FC<IImageSlider> = ({ urls }) => {
  const slideOpts = {
    speed: 500,
    centeredSlides: true,
    loop: true,
  }

  return (
    <IonSlides options={slideOpts}>
      {urls.map((url, i) => (
        <IonSlide key={i}>
          <LazyLoad
            src={imageServerUrl + url}
            wrapperStyle={imageWrapperStyle}
          />
        </IonSlide>
      ))}
    </IonSlides>
  )
}

export default Component
