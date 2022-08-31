import React, { useEffect } from 'react'
import {
  impressionViewable,
  pushAdSlotToRefresh,
  refreshViewPercentage,
} from '../refresh'
import { AdConfigType } from '../types'
import * as variables from '../variables'
export const AdConfig: React.FC<AdConfigType> = ({
  networkCode,
  refreshTimer,
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
    if (refreshTimer) variables.refreshTimer.set(refreshTimer)
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
      if (refreshTimer)
        pushAdSlotToRefresh(event.slot, googletag, Number(refreshTimer))
    })

    googletag
      .pubads()
      .addEventListener('slotVisibilityChanged', (event: any) => {
        if (eventSlotVisibilityChanged) eventSlotVisibilityChanged(event)
        if (refreshTimer) refreshViewPercentage(event)
      })

    googletag.pubads().addEventListener('impressionViewable', (event: any) => {
      if (eventImpressionViewable) eventImpressionViewable(event)
      if (refreshTimer) impressionViewable(event)
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
