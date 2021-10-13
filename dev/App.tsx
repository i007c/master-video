import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'

// master video
import MasterVideo, { OverlayProps, VideoOptions } from '../lib/'

// video file
import videoFile1 from './videos/1.mp4'
// const videoFile2 =
//     'https://cdn.discordapp.com/attachments/837976157609656323/842785794485780520/Shrek_1.mp4'

// style
import './style.scss'

import favicon from './favicon.ico'

// const PlayerOptions: Options = {
//     source: [
//         { label: '1', url: videoFile1 },
//         { label: '2', url: videoFile2 },
//     ],
//     controls: true,
//     style: {
//         className: 'custom-video-player',
//         timelineColor: '#F00',
//     },
// }

const TestOverlay = ({
    TogglePlay,
    Time,
    ChangeVolume,
    ToggleMute,
    isPlaying,
    isMuted,
    volume,
}: OverlayProps) => {
    console.log(
        `is playing: ${isPlaying}\nis muted: ${isMuted}\nVol: ${volume}`
    )

    return (
        <div className='overlay' style={{ background: 'rgba(0,0,0,.7)' }}>
            <button onClick={() => TogglePlay()}>Toggle Play</button>
            <button onClick={() => ToggleMute()}>Toggle Mute</button>
            <input
                type='range'
                onChange={e => ChangeVolume(+e.target.value)}
                max='100'
                min='0'
                step='1'
            />
            <span>
                <Time type='played' />
            </span>
        </div>
    )
}

const Options: VideoOptions = {
    source: [
        {
            label: 'test',
            url: videoFile1,
        },
    ],
}

const App = () => {
    useEffect(() => {
        document.head.insertAdjacentHTML(
            'beforeend',
            `<link rel="shortcut icon" href="${favicon}" type="image/x-icon">`
        )
    }, [])
    return (
        <div className='app'>
            <MasterVideo Options={Options} Overlay={TestOverlay} />
        </div>
    )
}

export default App

ReactDOM.render(<App />, document.getElementById('root'))
