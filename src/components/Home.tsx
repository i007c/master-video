import React from 'react'

// video player
import VideoPlayer from './Video-Player'

// home style
import './sass/home.scss'

import videoTest from '../static/test/1.mp4'

const Home = () => {
    return (
        <div className='home'>
            <VideoPlayer VideoSource={videoTest} />
        </div>
    )
}

export default Home
