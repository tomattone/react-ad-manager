# react-ad-manager

A React component for Google Ad Manager

## Requirements

| Module    | Version |
| --------- | ------- |
| React     | 16.8.0  |
| React DOM | 16.8.0  |

## Installation

Install the library using your favorite package manager:

```js
    npm install react-ad-manager
```

or using:

```js
    yarn add react-ad-manager
```

## Getting Started

- First add the Google Publisher Tags script

```js
    import { AdScript } from react-ad-manager
    <head>
        <AdScript />
    </head>
```

or using:

```js
<head>
  <script
    async
    src='https://securepubads.g.doubleclick.net/tag/js/gpt.js'
  ></script>
</head>
```

- Add the Ad component for define ad slot

```js
    import { Ad } from react-ad-manager

    <Ad
        adUnit="ad-unit"
        name="ad-name"
        size={[300, 250]}
    />
```

## Ad Props

#### adUnit

- **type:** string
- **required:** true

Ad unit path loaded from google ad manager.

#### name

- **type:** string
- **required:** true

Name used in div id

#### size

- **type:** SingleSize | MultiSize | FluidSize | ResponsiveSize
- **required:** true

**SingleSize:** [number, number]
**MultiSize:** Array<[number, number]>
**FluidSize:** 'fluid'
**Responsive:** Array<[ [number, number], Array<[number, number]> ]>

Size is defined by single, multi, fluid or responsive.

#### target

- **type:** Array<[string, string | Array\<string>]>
- **required:** false

Configure targets in slot-level

## AdConfig Props

#### networkCode

- **type:** number | string
- **required:** true

Is a unique identifier for the Ad Manager network the ad unit belongs to.

#### target

- **type:** Array<[string, string | Array\<string>]>
- **required:** false

Configure targets in page-level

#### refreshTimer

- **type:** number | string
- **required:** false

The refreshTimer prop defines how often ads are updated. It activates a function where the ads are updated in a loop and while displayed on the screen.

#### collapseEmptyDivs

- **type:** boolean
- **default:** false

Enables collapsing of slot divs if have ad content to display. If true the div collapse mode will be enable and if false the slot div won't collapse.

#### eventSlotOnload

- **type:** callback(event)
- **required:** false

This event is fired when the ad is displayed. When rendering ads in sync rendering mode SlotOnloadEvent won't be fired.

#### eventSlotVisibilityChanged

- **type:** callback(event)
- **required:** false

This event is fired whenever the on-screen percentage of an ad slot's area changes.

#### eventSlotRenderEnded

- **type:** callback(event)
- **required:** false

This event is fired when the ad unit is injected into a slot. This event will occur before the ad are fetched, so the ad may not be visible yet.

#### eventSlotRequested

- **type:** callback(event)
- **required:** false

This event is fired when an ad has been requested for a particular slot.

#### eventSlotResponseReceived

- **type:** callback(event)
- **required:** false

This event is fired when an ad response has been received for a particular slot.
