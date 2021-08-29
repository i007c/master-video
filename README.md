# Master Video

![npm](https://img.shields.io/npm/v/master-video?color=222&label=npm&labelColor=E20338)\
a React Video Player

## Install

```fish
npm install --save master-video
```

## Useage

example:

```js
import MasterVideo from 'master-video'

import video from 'video.mp4'

const App = () => {
    return (
        <div className='app'>
            <MasterVideo options={{ source: video, controls: true }} />
        </div>
    )
}
```

## TODO's

- [x] make test with jest
- [x] make auto tester with github actions
- [x] make auto publish on npm with github actions
- [x] make a component for volume
- [x] add hover animation for volume range
- [x] handle mute status in volume
- [x] make a component for video time
- [x] change video time format to x:xx / x:xx
- [ ] make controls hover show
