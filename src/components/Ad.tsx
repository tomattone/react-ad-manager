import React, { useEffect } from 'react'
import {
  impressionViewable,
  pushAdSlotToRefresh,
  refreshViewPercentage,
} from '../refresh'
import { AdType, ResponsiveSizeType } from '../types'
import * as variables from '../variables'

// eslint-disable-next-line react/prop-types
const Ad: React.FC<AdType> = ({
  adUnit,
  name,
  target = [],
  type,
  size,
  refreshTimer = 0,
  eventImpressionViewable,
  eventSlotOnload,
  eventSlotRenderEnded,
  eventSlotRequested,
  eventSlotResponseReceived,
  eventSlotVisibilityChanged,
}) => {
  let googletag: any
  let adSlot: any = null

  const displayCommonAd = () => {
    googletag.cmd.push(() => {
      adSlot = googletag
        .defineSlot(
          `${variables.networkCode.get()}${adUnit}`,
          generateSize(),
          name
        )
        .addService(googletag.pubads())
      mappingSize()
      setEvents(adSlot)
      setTargeting()
      googletag.enableServices()
      googletag.display(name)
    })
  }

  const displayEspecialAd = () => {
    googletag.cmd.push(() => {
      adSlot = googletag.defineOutOfPageSlot(
        `${variables.networkCode.get()}${adUnit}`,
        googletag.enums.OutOfPageFormat[type]
      )
      if (adSlot) {
        adSlot.setTargeting('type', type)
        adSlot.addService(googletag.pubads())
        googletag.pubads().enableSingleRequest()
        googletag.enableServices()
      }
    })
  }

  const setEvents = (targetSlot: any) => {
    googletag.pubads().addEventListener('slotOnload', (event: any) => {
      if (event.slot === targetSlot) {
        if (eventSlotOnload) eventSlotOnload(event)
        if (refreshTimer)
          pushAdSlotToRefresh(event.slot, googletag, Number(refreshTimer))
      }
    })

    googletag
      .pubads()
      .addEventListener('slotVisibilityChanged', (event: any) => {
        if (event.slot === targetSlot) {
          if (eventSlotVisibilityChanged) eventSlotVisibilityChanged(event)
          if (refreshTimer) refreshViewPercentage(event)
        }
      })

    googletag.pubads().addEventListener('impressionViewable', (event: any) => {
      if (event.slot === targetSlot) {
        if (eventImpressionViewable) eventImpressionViewable(event)
        if (refreshTimer) impressionViewable(event)
      }
    })

    if (eventSlotRenderEnded)
      googletag
        .pubads()
        .addEventListener('slotRenderEnded', eventSlotRenderEnded)
    if (eventSlotRequested)
      googletag.pubads().addEventListener('slotRequested', eventSlotRequested)
    if (eventSlotResponseReceived)
      googletag
        .pubads()
        .addEventListener('slotResponseReceived', eventSlotResponseReceived)
  }

  const setTargeting = () => {
    target.forEach((el: any) => adSlot.setTargeting(el[0], el[1]))
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

    return size[0][1]
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
    internalSize.forEach(el => (mapping = mapping.addSize(el[0], el[1])))
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
      if (adSlot) {
        googletag.destroySlots([adSlot])
      }
    }
  }, [])

  if (type) return null

  return <div id={name}></div>
}

export { Ad }
