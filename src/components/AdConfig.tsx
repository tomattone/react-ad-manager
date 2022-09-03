import React, { useEffect } from 'react'
import { AdConfigType } from '../types'
import * as variables from '../variables'
export const AdConfig: React.FC<AdConfigType> = ({
  networkCode,
  target = [],
  enableLazyLoad,
  enableSingleRequest,
  collapseEmptyDivs,
  eventImpressionViewable,
  eventSlotOnload,
  eventSlotRenderEnded,
  eventSlotRequested,
  eventSlotResponseReceived,
  eventSlotVisibilityChanged,
}) => {
  let googletag: any

  const setConfigs = () => {
    if (networkCode) variables.networkCode.set(networkCode)
    if (enableLazyLoad) googletag.pubads().enableLazyLoad(enableLazyLoad)
    if (collapseEmptyDivs) googletag.pubads().collapseEmptyDivs(true)
    if (enableSingleRequest) googletag.pubads().enableSingleRequest()
  }

  const setTargeting = () => {
    target.forEach((el) => googletag.pubads().setTargeting(el[0], el[1]))
  }

  const setEvents = () => {
    googletag.pubads().addEventListener('slotOnload', (event: any) => {
      if (eventSlotOnload) eventSlotOnload(event)
    })

    googletag
      .pubads()
      .addEventListener('slotVisibilityChanged', (event: any) => {
        if (eventSlotVisibilityChanged) eventSlotVisibilityChanged(event)
      })

    googletag.pubads().addEventListener('impressionViewable', (event: any) => {
      if (eventImpressionViewable) eventImpressionViewable(event)
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

  useEffect(() => {
    window.googletag = window.googletag || { cmd: [] }
    googletag = window.googletag
    googletag.cmd.push(() => {
      setConfigs()
      setEvents()
      setTargeting()
      googletag.enableServices()
    })
  }, [])

  return null
}
