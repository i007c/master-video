import React, { FC, ReactElement } from 'react'

// style
import './sass/player.scss'

type VideoPlayerProps = {
    VideoSource: string,
} 

const VideoPlayer: FC<VideoPlayerProps> = ({ VideoSource }): ReactElement => {
    return (
        <div className='video-player'>
            <video src={VideoSource} controls ></video>
        </div>
    )
}

export default VideoPlayer
