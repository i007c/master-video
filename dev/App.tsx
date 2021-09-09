import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'

// master video
import MasterVideo, { Options } from '../lib/'

// video file
import videoFile1 from './videos/1.mp4'
const videoFile2 =
    'https://cdn.discordapp.com/attachments/837976157609656323/842785794485780520/Shrek_1.mp4'

// style
import './style.scss'

import favicon from './favicon.ico'

const PlayerOptions: Options = {
    source: [
        { label: '1', url: videoFile1 },
        { label: '2', url: videoFile2 },
    ],
    controls: true,
    style: { className: 'custom-video-player' },
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
            <MasterVideo options={PlayerOptions} />
        </div>
    )
}

export default App

ReactDOM.render(<App />, document.getElementById('root'))
