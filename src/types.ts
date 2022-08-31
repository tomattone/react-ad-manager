declare global {
  interface Window {
    googletag: any
  }
}

export type SizeType = [number, number]
export type SingleSizeType = SizeType
export type MultiSizeType = SizeType[]
export type FluidSizeType = 'fluid'
export type ResponsiveSizeType = [SizeType, SizeType[] | SizeType][]
export type AdSizeType =
  | SingleSizeType
  | MultiSizeType
  | FluidSizeType
  | ResponsiveSizeType

export type TargetType = [string, string] | [string, string[]]
export type TargetArrayType = TargetType[]

export type AdType = {
  adUnit: string
  name?: string
  size?: AdSizeType
  target?: TargetArrayType
  type?: 'INTERSTITIAL' | 'TOP_ANCHOR' | 'BOTTOM_ANCHOR'
}

export type AdConfigType = {
  networkCode?: number | string
  refreshTimer?: number | string
  target?: TargetArrayType
  enableLazyLoad?: boolean | 'true'
  enableSingleRequest?: boolean | 'true'
  collapseEmptyDivs?: boolean | 'true' | 'expanded' | 'collapse'
  eventImpressionViewable?: any
  eventSlotOnload?: any
  eventSlotRenderEnded?: any
  eventSlotRequested?: any
  eventSlotResponseReceived?: any
  eventSlotVisibilityChanged?: any
}
