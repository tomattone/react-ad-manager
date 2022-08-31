import React, { useEffect } from 'react'
import { AdType, ResponsiveSizeType } from '../types'
import { networkCode } from '../variables'

// eslint-disable-next-line react/prop-types
const Ad: React.FC<AdType> = ({ adUnit, name, target = [], type, size }) => {
  let googletag: any
  let adSlot: any = null

  const displayCommonAd = () => {
    googletag.cmd.push(() => {
      adSlot = googletag
        .defineSlot(`${networkCode.get()}/${adUnit}`, generateSize(), name)
        .addService(googletag.pubads())
      mappingSize()
      setTargeting()
      googletag.enableServices()
      googletag.display(name)
    })
  }

  const displayEspecialAd = () => {
    googletag.cmd.push(() => {
      adSlot = googletag.defineOutOfPageSlot(
        `${networkCode.get()}/${adUnit}`,
        googletag.enums.OutOfPageFormat[type]
      )
      if (!adSlot) return
      setTargeting()
      adSlot.addService(googletag.pubads())
    })
  }

  const setTargeting = () => {
    target.forEach((el: any) => googletag.pubads().setTargeting(el[0], el[1]))
  }

  const generateSize = () => {
    const internalSize = size as ResponsiveSizeType
    if (
      !(
        typeof internalSize === 'object' &&
        typeof internalSize[0][1] === 'object'
      )
    )
      return size
    return internalSize.reduce((uniqueSizes: any, elSize: any) => {
      const haveSize = !!uniqueSizes.find(
        (mapSize: [number, number]) =>
          mapSize[0] === elSize[0] && mapSize[0] === elSize[0]
      )
      if (haveSize) uniqueSizes.push(haveSize)
      return uniqueSizes
    }, [])
  }

  const mappingSize = () => {
    const internalSize = size as ResponsiveSizeType
    if (
      !(
        typeof internalSize === 'object' &&
        typeof internalSize[0][1] === 'object'
      )
    )
      return
    let mapping = googletag.sizeMapping()
    internalSize.forEach((el) => (mapping = mapping.addSize(el)))
    mapping = mapping.build()
    adSlot.defineSizeMapping(mapping)
  }

  useEffect(() => {
    window.googletag = window.googletag || { cmd: [] }
    googletag = window.googletag
    googletag.cmd.push(() => {
      // eslint-disable-next-line react/prop-types
      type ? displayEspecialAd() : displayCommonAd()
    })
  }, [])

  useEffect(() => {
    return () => {
      googletag.destroySlots([adSlot])
    }
  }, [])

  if (type) return null

  return <div id={name}></div>
}

export { Ad }
