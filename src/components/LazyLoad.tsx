import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { IonIcon } from '@ionic/react'

type Props = { src: string; alt?: string; item: string; onClick: () => void }

const placeholder = '/static/assets/icons/no-icon.svg'

const wrapperStyle = {
  display: 'flex',
  alignItems: 'center',
  height: 150,
  width: 150,
  padding: 10,
  margin: '0 calc(var(--ion-margin) - 10px)',
}

export const wrapperWidthSpan =
  2 * wrapperStyle.padding +
  2 * 6 + // 6 is calc(var(--ion-margin) - 10px)
  wrapperStyle.width

const iconStyle = {
  height: '100%',
  width: '100%',
  margin: '-5px 25px',
}

const imageStyle: Object = {
  height: '100%',
  width: '100%',
  borderWidth: 2,
  borderStyle: 'solid',
  borderColor: 'rgba(var(--ion-color-primary-rgb), .1)',
  borderRadius: '50%',
  objectFit: 'contain',
}

const Component: React.FC<Props> = ({ item, src, onClick }) => {
  const selected = false
  const [imageSrc, setImageSrc]: [
    string | undefined,
    Dispatch<SetStateAction<string | undefined>>
  ] = useState()
  const [imageRef, setImageRef]: [
    Element | undefined,
    Dispatch<SetStateAction<Element | undefined>>
  ] = useState()
  const [observerSet, setObserverSet] = useState(false)
  const [errored, setImageErrored] = useState(false)
  const [loaded, setImageLoaded] = useState(false)

  const setRef = (node: any) => {
    setImageRef(node)
  }

  const onError = function () {
    setObserverSet(true)
    setImageErrored(true)
  }

  const onLoad = () => setImageLoaded(true)

  useEffect(() => {
    let observer: IntersectionObserver
    let didCancel = false

    if (imageRef && observerSet === false) {
      if (IntersectionObserver) {
        observer = new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              // When image is visible in the viewport + rootMargin
              if (
                !didCancel &&
                (entry.intersectionRatio > 0 || entry.isIntersecting)
              ) {
                setImageSrc(src)
              }
            })
          },
          {
            threshold: 0.01,
            rootMargin: '75%',
          }
        )
        observer.observe(imageRef)
      }
    }

    return () => {
      didCancel = true
      // Remove the listener on unmount
      if (imageRef && observer && observer.unobserve) {
        observer.unobserve(imageRef)
      }
    }
  }, [imageRef, imageSrc, src, observerSet])

  const onClickLocal = (e: any) => {
    e.stopPropagation()
    onClick()
  }

  return (
    <div style={wrapperStyle}>
      {imageSrc ? (
        selected ? (
          <IonIcon
            style={iconStyle}
            ref={setRef}
            className="ion-icon-primary"
            icon="/static/assets/icons/checked.svg"
          />
        ) : errored ? (
          <IonIcon
            style={iconStyle}
            ref={setRef}
            className="ion-icon-primary"
            icon={placeholder}
          />
        ) : (
          <img
            onClick={onClickLocal}
            ref={setRef}
            src={imageSrc}
            onLoad={onLoad}
            onError={onError}
            alt=""
            style={{
              ...imageStyle,
              opacity: loaded ? 1 : 0,
              transition: 'opacity 1s',
            }}
          />
        )
      ) : (
        <div style={iconStyle} ref={setRef} />
      )}
    </div>
  )
}

export default Component
