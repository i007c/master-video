import React, { FC, useState } from 'react'
import ReactDOM from 'react-dom'

// master video
import MasterVideo, { Options, Source } from '../lib'

// video file
// import videoFile1 from './videos/3.mp4'

// const videoFile1 =
//     'https://cdn.discordapp.com/attachments/849749181735501824/905656394378780692/237135009_4012155565580090_8467516022250211201_n.mp4'
// const videoFile1 =
//     'https://cdn.discordapp.com/attachments/837976157609656323/842785794485780520/Shrek_1.mp4'

// style
import './style.scss'

// import favicon from './favicon.ico'

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

const VideoSources: Source = [
    {
        lable: '144p',
        source: 'https://cdn.discordapp.com/attachments/741696928957464720/928941374378754068/144p.mp4',
    },
    {
        lable: '240p',
        source: 'https://cdn.discordapp.com/attachments/741696928957464720/928941390044483584/240p.mp4',
    },
    {
        lable: '360p',
        source: 'https://cdn.discordapp.com/attachments/741696928957464720/928941407807340554/360p.mp4',
    },
    {
        lable: '480p',
        source: 'https://cdn.discordapp.com/attachments/741696928957464720/928941440460017684/480p.mp4',
    },
    {
        lable: '720p',
        source: 'https://cdn.discordapp.com/attachments/741696928957464720/928941477768351754/720p.mp4',
    },
    {
        lable: 'source',
        source: 'https://cdn.discordapp.com/attachments/741696928957464720/928941477365710878/source.mp4',
    },
]

const App: FC = () => {
    const [see, setSee] = useState(true)

    return (
        <div className='app'>
            {see && <MasterVideo source={VideoSources} options={OPT} />}
            <button onClick={() => setSee(!see)}>Toggle Video</button>
        </div>
    )
}

export default App

ReactDOM.render(<App />, document.getElementById('root'))
