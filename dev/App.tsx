import React from 'react'
import ReactDOM from 'react-dom'

// master video
import MasterVideo, { Options } from '../src/'

// video file
import videoFile from './videos/2.mp4'

import './style.scss'

const PlayerOptions: Options = {
    source: videoFile,
    controls: true,
    style: { className: 'custom-video-player' },
}

const App = () => {
    return (
        <div className='app'>
            <MasterVideo options={PlayerOptions} />
        </div>
    )
}

export default App

ReactDOM.render(<App />, document.getElementById('root'))
