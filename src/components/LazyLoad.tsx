/* eslint-disable no-undef */
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'
import { IonIcon } from '@ionic/react'

interface ILazyLoad {
  src: string
  alt?: string
  onClick?: () => void
  wrapperStyle?: React.CSSProperties
  imageStyle?: React.CSSProperties
}

const placeholder = '/static/assets/icons/no-icon.svg'

const iconStyle = {
  height: '100%',
  width: '100%',
  margin: '-5px 25px',
}

const defaultImageStyle: Object = {
  height: '100%',
  width: '100%',
  objectFit: 'cover',
}

const Component: React.FC<ILazyLoad> = ({
  src,
  onClick,
  wrapperStyle,
  imageStyle,
}) => {
  const selected = false

  const [imageSrc, setImageSrc]: [
    string | undefined,
    Dispatch<SetStateAction<string | undefined>>
  ] = useState()

  const imageRef = useRef<Element | null>(null)

  const [observerSet, setObserverSet] = useState(false)
  const [errored, setImageErrored] = useState(false)
  const [loaded, setImageLoaded] = useState(false)

  const setRef: React.Ref<Element> = node => {
    imageRef.current = node
  }

  const onError = function () {
    setObserverSet(true)
    setImageErrored(true)
  }

  const onLoad = () => setImageLoaded(true)

  useEffect(() => {
    let observer: IntersectionObserver
    let didCancel = false

    if (imageRef.current && observerSet === false) {
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
        observer.observe(imageRef.current)
      }
    }

    const imageRefValue = imageRef.current as unknown as Element

    return () => {
      didCancel = true
      // Remove the listener on unmount
      if (imageRef.current && observer && observer.unobserve) {
        observer.unobserve(imageRefValue)
      }
    }
  }, [imageSrc, src, observerSet])

  const onClickLocal: React.MouseEventHandler = e => {
    if (onClick) {
      e.stopPropagation()
      onClick()
    }
  }

  return (
    <div style={wrapperStyle}>
      {imageSrc ? (
        selected ? (
          <IonIcon
            style={iconStyle}
            ref={setRef as React.Ref<HTMLIonIconElement>}
            className="ion-icon-primary"
            icon="/static/assets/icons/checked.svg"
          />
        ) : errored ? (
          <IonIcon
            style={iconStyle}
            ref={setRef as React.Ref<HTMLIonIconElement>}
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
              ...defaultImageStyle,
              ...imageStyle,
              objectFit: 'cover',
              opacity: loaded ? 1 : 0,
              transition: 'opacity 0.5s',
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
