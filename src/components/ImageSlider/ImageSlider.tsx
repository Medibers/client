import React from 'react'

import { IonIcon, IonSlide, IonSlides } from '@ionic/react'
import { chevronBack as left, chevronForward as right } from 'ionicons/icons'

import { imageServerUrl } from 'utils'

import './ImageSlider.scss'

type Props = {
  urls: Array<string>
  imageStyle?: Object
}

const Component: React.FC<Props> = ({ urls, imageStyle = {} }) => {
  let swiper: any = null // eslint-disable-line

  const slideOpts = {
    speed: 500,
    centeredSlides: true,
    loop: true,
    on: {
      beforeInit() {
        swiper = this
      },
    },
  }

  const next = () => swiper && swiper.slideNext()
  const prev = () => swiper && swiper.slidePrev()

  return (
    <React.Fragment>
      <IonSlides options={slideOpts}>
        {urls.map((url, i) => (
          <IonSlide key={i}>
            <div
              style={{
                ...imageStyle,
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                backgroundImage: `url(${imageServerUrl + url})`,
              }}
            />
          </IonSlide>
        ))}
      </IonSlides>
      <IonIcon icon={left} onClick={prev} className="swiper-button-prev" />
      <IonIcon icon={right} onClick={next} className="swiper-button-next" />
    </React.Fragment>
  )
}

export default Component
