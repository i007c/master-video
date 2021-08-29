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
- [ ] make auto tester with github actions
- [ ] make auto publish on npm with github actions
- [ ] make a component for volume
- [ ] add hover animation for volume range
- [ ] handle mute status in volume
- [ ] make a component for video time
- [ ] change video time format to x:xx / x:xx
- [ ] make controls hover show
