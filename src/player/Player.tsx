import React, { FC, ReactElement } from 'react'

type VideoPlayerProps = {
    VideoSource: string,
} 

const VideoPlayer: FC<VideoPlayerProps> = ({ VideoSource }): ReactElement => {
    return (
        <div className='video-container'>
            <video src={VideoSource} controls ></video>
        </div>
    )
}

export default VideoPlayer
