import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'

// master video
import MasterVideo, { Options } from '../lib'

// video file
import videoFile1 from './videos/3.mp4'

// const videoFile1 =
//     'https://cdn.discordapp.com/attachments/849749181735501824/905656394378780692/237135009_4012155565580090_8467516022250211201_n.mp4'
// const videoFile1 =
//     'https://cdn.discordapp.com/attachments/837976157609656323/842785794485780520/Shrek_1.mp4'

// style
import './style.scss'

import favicon from './favicon.ico'

const OPT: Options = {
    // loop: false,
    masterClass: 'gg',
    // iconsColor: '#0f0',
    // playIconColor: '#0ff',
    // fullscreenIconColor: '#ff0',
    // volumeIconColor: '#fff',
    // timeLine: {
    //     track: '#f00',
    //     thumb: '#0f0',
    //     rail: '#00f',
    // },
    // volume: {
    //     rail: '#FFF',
    //     thumb: '#f00',
    //     track: '#00f',
    // },
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
            <MasterVideo source={videoFile1} options={OPT} />
        </div>
    )
}

export default App

ReactDOM.render(<App />, document.getElementById('root'))
