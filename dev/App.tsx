import React, { FC, useState } from 'react'
import ReactDOM from 'react-dom'

// master video
import MasterVideo, { Options, Source } from '../lib'

// video file
import videoFile1 from './videos/3.mp4'

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
    bufferColor: '#51EAFF99',
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

const VideoSources1: Source = [
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
]

const VideoSources2: Source = [
    {
        lable: '144p',
        source: videoFile1,
        // source: 'https://cdn.discordapp.com/attachments/837976157609656323/842785794485780520/Shrek_1.mp4',
    },
]

type S = { t: string; s: Source }

const Sources: S[] = [
    {
        t: 'Source 1',
        s: VideoSources1,
    },
    {
        t: 'Source 2',
        s: VideoSources2,
    },
]

const App: FC = () => {
    const [CS, SCS] = useState<S | undefined>(Sources[1])

    return (
        <div className='app'>
            {CS && <h1>{CS.t}</h1>}
            {CS && (
                <MasterVideo
                    source={CS.s}
                    options={OPT}
                    poster='https://cdn.discordapp.com/attachments/731174051170746500/899610698240368671/Hela_f8d8c0_6625678.jpg'
                />
            )}
            <button onClick={() => SCS(Sources[0])}>Source 1</button>
            <button onClick={() => SCS(Sources[1])}>Source 2</button>
        </div>
    )
}

export default App

ReactDOM.render(<App />, document.getElementById('root'))
