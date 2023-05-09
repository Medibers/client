/* eslint-disable no-undef */
import React, { useEffect, useRef, useState } from 'react'

import { imageServerUrl, placeholderImageUrl } from 'utils'

interface ILazyLoad {
  src: string
  alt?: string
  onClick?: () => void
  wrapperStyle?: React.CSSProperties
  imageStyle?: React.CSSProperties
}

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

const LazyLoad: React.FC<ILazyLoad> = ({
  src,
  onClick: parentOnClick,
  wrapperStyle,
  imageStyle,
}) => {
  const [imageSrc, setImageSrc] = useState<string | undefined>()
  const [loaded, setImageLoaded] = useState(false)

  const imageRef = useRef<Element | null>(null)

  useObserver(imageRef.current as Element, () => setImageSrc(src))

  const setRef: React.Ref<Element> = node => {
    imageRef.current = node
  }

  const onError = () => {
    setImageSrc(imageServerUrl + placeholderImageUrl)
  }

  const onLoad = () => setImageLoaded(true)

  const onClick: React.MouseEventHandler = e => {
    if (parentOnClick) {
      e.stopPropagation()
      parentOnClick()
    }
  }

  return (
    <div style={wrapperStyle}>
      {imageSrc ? (
        <img
          onClick={onClick}
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
      ) : (
        <div style={iconStyle} ref={setRef} />
      )}
    </div>
  )
}

const useObserver = (image: Element | null, cb: () => void) => {
  const observerRef = useRef<IntersectionObserver | null>(
    IntersectionObserver
      ? new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              // When image is visible in the viewport + rootMargin
              if (entry.intersectionRatio > 0 || entry.isIntersecting) {
                cb()
              }
            })
          },
          {
            threshold: 0.01,
            rootMargin: '75%',
          }
        )
      : null
  )

  useEffect(() => {
    const { current: observer } = observerRef

    observer && image && observer.observe(image)

    return () => {
      observer && image && observer.unobserve(image)
    }
  }, [image]) // eslint-disable-line react-hooks/exhaustive-deps
}

export default LazyLoad
