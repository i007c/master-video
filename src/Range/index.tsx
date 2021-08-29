import React, {
    MouseEvent as ReactMouseEvent,
    PureComponent,
    createRef,
    ReactElement,
} from 'react'

// style
import './range.scss'

interface RangeProps {
    defaultValue: number
    onChange: (percentage: number) => void
}

interface RangeState {
    RangeValue: number
    isHolding: boolean
}

class Range extends PureComponent<RangeProps, RangeState> {
    public range = createRef<HTMLDivElement>()

    private HandleMouseMoveBind = this.HandleMouseMove.bind(this)
    private HandleMouseUpBind = this.HandleMouseUp.bind(this)

    override state: RangeState = {
        RangeValue: 0,
        isHolding: false,
    }

    private HandlePercentage(percentage: number) {
        percentage = percentage * 100

        if (percentage > 100) percentage = 100
        else if (percentage < 0) percentage = 0

        this.setState({ RangeValue: percentage, isHolding: true })

        this.props.onChange(percentage)
    }

    private HandleMouseDown(e: ReactMouseEvent<HTMLDivElement, MouseEvent>) {
        e.preventDefault()

        const { left, width } = e.currentTarget.getBoundingClientRect()
        this.HandlePercentage((e.clientX - left) / width)

        document.addEventListener('mousemove', this.HandleMouseMoveBind)
        document.addEventListener('mouseup', this.HandleMouseUpBind)
    }

    public HandleMouseMove(e: MouseEvent) {
        if (!this.range.current) return

        e.preventDefault()

        const { left, width } = this.range.current.getBoundingClientRect()
        this.HandlePercentage((e.clientX - left) / width)
    }

    private HandleMouseUp() {
        document.removeEventListener('mousemove', this.HandleMouseMoveBind)
        document.removeEventListener('mouseup', this.HandleMouseUpBind)
        this.setState({ isHolding: false })
    }

    override componentDidMount() {
        this.setState({ RangeValue: this.props.defaultValue })
    }

    override render(): ReactElement {
        return (
            <div
                ref={this.range}
                className='range-container'
                onMouseDown={this.HandleMouseDown.bind(this)}
            >
                <span className='range'>
                    <span className='rail'></span>
                    <span
                        className='track'
                        style={{ width: `${this.state.RangeValue}%` }}
                    ></span>
                    <span
                        className={
                            'thumb' + (this.state.isHolding ? ' hold' : '')
                        }
                        style={{ left: `${this.state.RangeValue}%` }}
                    ></span>
                </span>
            </div>
        )
    }
}

export default Range
