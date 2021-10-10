import React from 'react'
import { render, screen } from '@testing-library/react'
import MasterVideo from '../lib/'

import video from './videos/1.mp4'

test('Rnder Master Video', () => {
    render(
        <MasterVideo
            options={{
                source: [{ label: 'source 1', url: video }],
                controls: true,
                style: {
                    className: 'test-class',
                    timelineColor: 'black'
                },
            }}
        />
    )
    const MasterElement = screen.getByRole('master-video')
    expect(MasterElement).toBeInTheDocument()
})
