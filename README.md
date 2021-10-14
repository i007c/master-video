# Master Video

[![npm](https://img.shields.io/npm/v/master-video?color=222&label=npm&labelColor=E20338)](https://www.npmjs.com/package/master-video)

a React Video Player

## Install

```fish
npm install --save master-video
```

## Useage

JavaScript:

```js
import MasterVideo, { DefaultOverlay } from 'master-video'

import video1 from 'video.mp4'
const video2 = 'https://example.com/video.mp4'

const Options = {
    source: [
        { label: 'video 1', url: video1 },
        { label: 'video 2', url: video2 },
    ],
}

const App = () => {
    return (
        <div className='app'>
            <MasterVideo 
                Options={Options} 
                Overlay={DefaultOverlay}
            />
        </div>
    )
}
```

TypeScript:

```tsx
import MasterVideo, { DefaultOverlay, VideoOptions } from 'master-video'

const video1 = 'https://example.com/video.mp4'

const Options: VideoOptions = {
    source: [
        { label: 'video 1', url: video1 },
    ],
}

const App = () => {
    return (
        <div className='app'>
            <MasterVideo 
                Options={Options} 
                Overlay={DefaultOverlay}
            />
        </div>
    )
}
```

Custom Overlay:

```tsx
import MasterVideo, { VideoOptions, OverlayProps } from 'master-video'

const CustomOverlay = ({ TogglePlay }: OverlayProps) => {
    return (
        <div className='overlay' style={{ background: 'rgba(0,0,0,.7)' }}>
            <button onClick={() => TogglePlay()}>
                Toggle Play
            </button>
        </div>
    )
}

const video1 = 'https://example.com/video.mp4'

const Options: VideoOptions = {
    source: [
        { label: 'video 1', url: video1 },
    ],
}

const App = () => {
    return (
        <div className='app'>
            <MasterVideo 
                Options={Options} 
                Overlay={CustomOverlay}
            />
        </div>
    )
}
```
