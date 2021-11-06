import React, { ReactElement } from 'react'
import BaseComponent from './BaseComponent'

import VolumeIcon from './icons/Volume'

interface VolumeProps {}

interface VolumeState {
    showRange: boolean
}

export class Volume extends BaseComponent<VolumeProps, VolumeState> {
    override state: VolumeState = {
        showRange: false,
    }

    override render(): ReactElement {
        return (
            <div
                className='btn volume'
                onClick={() => (this.video.muted = !this.video.muted)}
            >
                <VolumeIcon />
            </div>
        )
    }
}

export default Volume
