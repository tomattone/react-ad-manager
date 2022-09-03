# react-ad-manager

![react-ad-manager](https://user-images.githubusercontent.com/2035911/188284142-9d9ae304-0280-46f2-99f9-1d2fc3d0222a.png)

A React component for Google Ad Manager, created to serve Ads on the [🖖🏻 Jovem Nerd website](https://jovemnerd.com.br).

<br />

## Installation

Install the library using your favorite package manager:

```js
    npm install react-ad-manager
```

or using:

```js
    yarn add react-ad-manager
```

<br />

## Getting Started

First add the Google Publisher Tags script on your application

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

then, create the Ad component for define ad slot

```js
    import { Ad } from react-ad-manager

    <Ad
        adUnit="/6355419/Travel/Europe"
        name="div-name"
        size={[300, 250]}
    />
```

<br />

## Ad Props

```js
    import { Ad } from react-ad-manager

    <Ad
        adUnit="/6355419/Travel/Europe"
        name="div-name"
        size={[
            [[1024, 768], [[750, 200], [728, 90]]],
            [[640, 480], [[300, 250]]],
        ]}
        target={[['color', 'red']]}
        refreshTimer={5000}
        type='INTERSTITIAL'
        eventImpressionViewable={(e) => console.log(e.slot)}
        eventSlotOnload={(e) => console.log(e.slot)}
        eventSlotRenderEnded={(e) => console.log(e.slot)}
        eventSlotRequested={(e) => console.log(e.slot)}
        eventSlotResponseReceived={(e) => console.log(e.slot)}
        eventSlotVisibilityChanged={(e) => console.log(e.slot)}
    />
```

#### `adUnit`

Ad unit path loaded from Google Ad Manager.

- **type:** string
- **required:** true

#### `name`

Name used in div id

- **type:** string
- **required:** true

#### `size`

Size is defined by single, multi, fluid or responsive. See more information at [Ad sizes - Google Developers ](https://developers.google.com/publisher-tag/guides/ad-sizes).

- **type:** SingleSize | MultiSize | FluidSize | ResponsiveSize
- **required:** true

**SingleSize:** [number, number] <br />
**MultiSize:** Array<[number, number]> <br />
**FluidSize:** 'fluid' <br />
**Responsive:** Array<[ [number, number], Array<[number, number]> ]>

#### `target`

Configure targets in slot-level

- **type:** Array<[string, string | Array\<string>]>
- **required:** false

#### `refreshTimer`

The refreshTimer prop defines how often the ad are updated. It activates a function where the ads are updated in a loop and while displayed on the screen.
The prop is set in **milliseconds**.

- **type:** number | string
- **required:** false

#### `type`

Define Out-of-page formats supported by Google Tag Manger. See more information at [Enum Types - Google Developers](https://developers.google.com/publisher-tag/reference#googletag.enums.outofpageformat).

- **type:** string
- **required:** false
- **value:** 'INTERSTITIAL' | 'TOP_ANCHOR' | 'BOTTOM_ANCHOR' | undefined

#### `eventSlotOnload`

This event is fired when the ad is displayed. When rendering ads in sync rendering mode SlotOnloadEvent won't be fired.

- **type:** callback(event)
- **required:** false

#### `eventSlotVisibilityChanged`

This event is fired whenever the on-screen percentage of an ad slot's area changes.

- **type:** callback(event)
- **required:** false

#### `eventSlotRenderEnded`

This event is fired when the ad unit is injected into a slot. This event will occur before the ad are fetched, so the ad may not be visible yet.

- **type:** callback(event)
- **required:** false

#### `eventSlotRequested`

This event is fired when an ad has been requested for a particular slot.

- **type:** callback(event)
- **required:** false

#### `eventSlotResponseReceived`

This event is fired when an ad response has been received for a particular slot.

- **type:** callback(event)
- **required:** false

<br />

## Global Props

It is possible set global props using the component `<AdConfig>`:

```js
    import { AdScript, AdConfig } from react-ad-manager
    <head>
        <AdScript />

        <AdConfig
            networkCode={1}
            target={[['global', 'true']]}
            collapseEmptyDivs={true}
            eventImpressionViewable={(e) => console.log(e.slot)}
            eventSlotOnload={(e) => console.log(e.slot)}
            eventSlotRenderEnded={(e) => console.log(e.slot)}
            eventSlotRequested={(e) => console.log(e.slot)}
            eventSlotResponseReceived={(e) => console.log(e.slot)}
            eventSlotVisibilityChanged={(e) => console.log(e.slot)}
        />
    </head>
```

#### `networkCode`

Is a unique identifier for the Ad Manager network the ad unit belongs to.

- **type:** number | string
- **required:** true

#### `target`

Configure targets in page-level

- **type:** Array<[string, string | Array\<string>]>
- **required:** false

#### `collapseEmptyDivs`

Enables collapsing of slot divs if have ad content to display. If true the div collapse mode will be enable and if false the slot div won't collapse.

- **type:** boolean
- **default:** false

#### `eventSlotOnload`

This event is fired when the ad is displayed. When rendering ads in sync rendering mode SlotOnloadEvent won't be fired.

- **type:** callback(event)
- **required:** false

#### `eventSlotVisibilityChanged`

This event is fired whenever the on-screen percentage of an ad slot's area changes.

- **type:** callback(event)
- **required:** false

#### `eventSlotRenderEnded`

This event is fired when the ad unit is injected into a slot. This event will occur before the ad are fetched, so the ad may not be visible yet.

- **type:** callback(event)
- **required:** false

#### `eventSlotRequested`

This event is fired when an ad has been requested for a particular slot.

- **type:** callback(event)
- **required:** false

#### `eventSlotResponseReceived`

This event is fired when an ad response has been received for a particular slot.

- **type:** callback(event)
- **required:** false
