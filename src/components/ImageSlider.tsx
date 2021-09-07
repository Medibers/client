import React from 'react'

import { IonSlide, IonSlides } from '@ionic/react'

import { imageServerUrl } from 'utils'

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
            <img style={imageStyle} src={imageServerUrl + url} alt="" />
          </IonSlide>
        ))}
      </IonSlides>
      <div onClick={next} className="swiper-button-next" />
      <div onClick={prev} className="swiper-button-prev" />
    </React.Fragment>
  )
}

export default Component
