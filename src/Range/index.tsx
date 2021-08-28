import React, { useRef, useState, MouseEvent as ReactMouseEvent } from 'react'

// style
import './range.scss'

interface RangeProps {
    defaultValue: number
    onChange: (percentage: number) => void
}

const Range = ({ defaultValue, onChange }: RangeProps) => {
    if (defaultValue > 100 || defaultValue < 0) defaultValue = 50

    const range = useRef<HTMLDivElement>(null)
    const [RangeValue, setRangeValue] = useState(defaultValue)
    const [isHolding, setIsHolding] = useState(false)

    const HandlePercentage = (percentage: number) => {
        percentage = percentage * 100

        if (percentage > 100) percentage = 100
        else if (percentage < 0) percentage = 0

        setRangeValue(percentage)
        onChange(percentage)
    }

    const HandleMouseDown = (
        e: ReactMouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        e.preventDefault()

        const { left, width } = e.currentTarget.getBoundingClientRect()
        HandlePercentage((e.clientX - left) / width)

        setIsHolding(true)

        document.addEventListener('mousemove', HandleMouseMove)
        document.addEventListener('mouseup', HandleMouseUp)
    }

    const HandleMouseMove = (e: MouseEvent) => {
        if (!range.current) return

        e.preventDefault()

        const { left, width } = range.current.getBoundingClientRect()
        HandlePercentage((e.clientX - left) / width)
    }

    const HandleMouseUp = () => {
        document.removeEventListener('mousemove', HandleMouseMove)
        document.removeEventListener('mouseup', HandleMouseUp)
        setIsHolding(false)
    }

    return (
        <div
            className='range-container'
            ref={range}
            onMouseDown={e => HandleMouseDown(e)}
        >
            <span className='range'>
                <span className='rail'></span>
                <span
                    className='track'
                    style={{ width: `${RangeValue}%` }}
                ></span>
                <span
                    className={'thumb' + (isHolding ? ' hold' : '')}
                    style={{ left: `${RangeValue}%` }}
                ></span>
            </span>
        </div>
    )
}

export default Range
