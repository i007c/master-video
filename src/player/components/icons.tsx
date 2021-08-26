import React, { ReactElement } from 'react'

export const Play = () => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
        >
            <polygon points='5 3 19 12 5 21 5 3'></polygon>
        </svg>
    )
}

export const Pause = () => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
        >
            <rect x='5' y='4' width='5' height='16'></rect>
            <rect x='15' y='4' width='5' height='16'></rect>
        </svg>
    )
}

type VolumeProps = {
    percentage: number
}

export const Volume = ({ percentage }: VolumeProps): ReactElement => {
    let front: JSX.Element | null = null;

    if (percentage <= 0) {
        front = (
            <>
                <line x1='23' y1='9' x2='17' y2='15'></line>
                <line x1='17' y1='9' x2='23' y2='15'></line>
            </>
        )
    } else if (percentage <= 10) {
        front = null
    } else if (percentage <= 50) {
        front = <path d='M15.54 8.46a5 5 0 0 1 0 7.07'></path>
    } else {
        front = <path d='M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07'></path>
    }

    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
        >
            {/* base */}
            <polygon points='11 5 6 9 2 9 2 15 6 15 11 19 11 5'></polygon>

            {front}
        </svg>
    )
}

Volume.defaultProps = {
    percentage: 0,
}
