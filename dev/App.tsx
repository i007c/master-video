import React from 'react'
import ReactDOM from 'react-dom'

// master video
import MasterVideo, { Options } from '../src/'

// video file
import videoFile from './videos/1.mp4'

import './style.scss'

const PlayerOptions: Options = {
    source: videoFile,
    controls: true,
    style: { className: 'xxx' },
}

const App = () => {
    return (
        <div style={{ width: '100vw', height: '100vh', padding: '100px' }}>
            <MasterVideo options={PlayerOptions} />
        </div>
    )
}

export default App

ReactDOM.render(<App />, document.getElementById('root'))
