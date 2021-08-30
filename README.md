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

- [ ] make video timeline
- [ ] work with video sound amp(amplitude)
- [ ] make fullscreen button
- [ ] settings button
- [ ] settings for video speed
- [ ] play video on click in video
- [ ] work with subtitles
- [ ] add multi quality
