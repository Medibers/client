import { groupBy, map, mapValues } from 'lodash'

export const maxFileSize = 1024000

export const minWidth = 500

export const minHeight = 500

const mapFileToDataUri = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onload = () => {
      resolve(reader.result as string)
    }

    reader.onerror = reject
  })
}

interface IImageDimensions {
  width: number
  height: number
}

const getImageDimensions = (dataURI: string): Promise<IImageDimensions> => {
  const image = document.createElement('img')

  const promise = new Promise<IImageDimensions>((resolve, reject) => {
    image.onload = () => {
      resolve({ width: image.naturalWidth, height: image.naturalHeight })
    }

    image.onerror = reject
  })

  image.src = dataURI

  return promise
}

export const checkFiles = async (
  files: File[]
): Promise<[string[], string[]]> => {
  const checks = await Promise.all(
    files.map(async rawFile => {
      const file = await mapFileToDataUri(rawFile)

      if (rawFile.size > maxFileSize) {
        return { file, fileMatches: false }
      }

      const { width, height } = await getImageDimensions(file)

      return {
        file,
        fileMatches: width >= minWidth && height >= minHeight,
      }
    })
  )

  const { true: validFiles, false: invalidFiles } = mapValues(
    groupBy(checks, 'fileMatches'),
    check => map(check, 'file')
  )

  return [validFiles, invalidFiles]
}
