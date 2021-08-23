import React, { FC, ReactElement } from 'react'

type VideoPlayerProps = {
    VideoSource: string,
} 

const VideoPlayer: FC<VideoPlayerProps> = ({ VideoSource }): ReactElement => {
    console.log(VideoSource);
    
    return (
        <div className='video-container'>
            <video src={VideoSource}></video>
        </div>
    )
}

export default VideoPlayer
