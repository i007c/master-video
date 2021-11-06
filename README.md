# Master Video

[![npm](https://img.shields.io/npm/v/master-video?color=E20338&label=npm&labelColor=2c2f33)](https://www.npmjs.com/package/master-video) [![Discord](https://img.shields.io/badge/-Discord-7289da?style=flat&logo=Discord&logoColor=FFFFFF&labelColor=2c2f33&color=E20338)](https://discord.gg/Z6vgXHU2xQ)

a React Video Player

## Install

```fish
npm install --save master-video
```

## Useage

JavaScript:

```js
import MasterVideo from 'master-video'

import video from 'video.mp4'


const Options = { 
    loop: true,
    masterClass: 'custom-class-name',
    iconsColor: '#0f0',
    playIconColor: '#0ff',
    fullscreenIconColor: '#ff0',
    volumeIconColor: '#fff',
    timeLine: {
        track: '#f00',
        thumb: '#0f0',
        rail: '#00f',
    },
    volume: {
        rail: '#FFF',
        thumb: '#f00',
        track: '#00f',
    },
}

const App = () => {
    return (
        <div className='app'>
            <MasterVideo 
                options={Options} 
                source={video} 
            />
        </div>
    )
}
```

TypeScript:

```tsx
import MasterVideo, { Options } from 'master-video'

const video = 'https://example.com/video.mp4'

const Options: Options = {
    loop: true
}

const App = () => {
    return (
        <div className='app'>
            
            <MasterVideo source={video} options={Options} />
        </div>
    )
}
```
