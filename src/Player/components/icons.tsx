import React, { ReactElement } from 'react'

export const Play = () => {
    return (
        <svg
            stroke='currentColor'
            fill='currentColor'
            strokeWidth='0'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path fill='none' d='M0 0h24v24H0z'></path>
            <path d='M8 5v14l11-7z'></path>
        </svg>
    )
}

export const Pause = () => {
    return (
        <svg
            stroke='currentColor'
            fill='currentColor'
            strokeWidth='0'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path fill='none' d='M0 0h24v24H0z'></path>
            <path d='M6 19h4V5H6v14zm8-14v14h4V5h-4z'></path>
        </svg>
    )
}

type VolumeProps = {
    percentage: number
    onClick: Function
    muted: boolean
}

export const Volume = ({
    percentage,
    onClick,
    muted,
}: VolumeProps): ReactElement => {
    const UP_PATH = (
        <path d='M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z' />
    )
    const MUTE_PATH = (
        <path d='M16.5 12A4.5 4.5 0 0014 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0021 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 003.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z' />
    )
    const OFF_PATH = <path d='M 3 9 v 6 h 4 l 5 5 V 4 l -5 5 H 3 z' />
    const DOWN_PATH = (
        <path d='M 16.5 12 A 4.5 4.5 0 0 0 14 7.97 v 8.05 c 1.48 -0.73 2.5 -2.25 2.5 -4.02 z M 3 9 v 6 h 4 l 5 5 V 4 L 7 9 H 3 z' />
    )

    return (
        <svg
            stroke='currentColor'
            fill='currentColor'
            strokeWidth='0'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
            onClick={() => onClick()}
        >
            <path fill='none' d='M0 0h24v24H0z'></path>

            {muted
                ? MUTE_PATH
                : percentage <= 10
                ? OFF_PATH
                : percentage <= 45
                ? DOWN_PATH
                : UP_PATH}
        </svg>
    )
}

Volume.defaultProps = {
    percentage: 0,
    onClick: () => {},
}

export const Maximize = () => {
    return (
        <svg
            stroke='currentColor'
            fill='currentColor'
            strokeWidth='0'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path fill='none' d='M0 0h24v24H0z'></path>
            <path d='M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z'></path>
        </svg>
    )
}

export const Minimize = () => {
    return (
        <svg
            stroke='currentColor'
            fill='currentColor'
            strokeWidth='0'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path fill='none' d='M0 0h24v24H0z'></path>
            <path d='M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z'></path>
        </svg>
    )
}

export const Tool = () => {
    return (
        <svg
            stroke='currentColor'
            fill='currentColor'
            strokeWidth='0'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path fill='none' d='M0 0h24v24H0V0z'></path>
            <path d='M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z'></path>
        </svg>
    )
}
