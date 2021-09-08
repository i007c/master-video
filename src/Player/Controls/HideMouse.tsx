import React, { PureComponent, ReactElement } from 'react'

interface HideMouseProps {
    video: HTMLVideoElement
    Container: HTMLDivElement
    Controls: HTMLDivElement
    CCE: HTMLDivElement
}

interface HideMouseState {
    isPause: boolean
    showControls: boolean
    MouseOnControls: boolean
    MouseOnVideo: boolean
    timer: NodeJS.Timeout | null
    passdTime: number
}

export class HideMouse extends PureComponent<HideMouseProps, HideMouseState> {
    override state: HideMouseState = {
        isPause: true,
        showControls: true,
        MouseOnControls: false,
        MouseOnVideo: false,
        timer: null,
        passdTime: 0,
    }

    // elements
    private video = this.props.video
    private Container = this.props.Container
    private Controls = this.props.Controls
    private CCE = this.props.CCE

    // Binds
    private HandlePauseBind = this.HandlePause.bind(this)
    private HandlePlayBind = this.HandlePlay.bind(this)
    private HandleMaouseMoveBind = this.HandleMaouseMove.bind(this)
    private ControlsMouseEnterBind = this.ControlsMouseEnter.bind(this)
    private ControlsMouseLeaveBind = this.ControlsMouseLeave.bind(this)
    private ContainerMouseEnterBind = this.ContainerMouseEnter.bind(this)
    private ContainerMouseLeaveBind = this.ContainerMouseLeave.bind(this)

    private HandlePause() {
        this.setState({ isPause: true })
    }

    private HandlePlay() {
        this.setState({ isPause: false })
    }

    private HandleMaouseMove() {
        if (this.state.timer) {
            clearTimeout(this.state.timer)
            this.setState({
                showControls: true,
                timer: null,
            })
        } else {
            this.setState({
                showControls: true,
            })
        }
    }

    private ControlsMouseEnter() {
        this.setState({ MouseOnControls: true })
    }
    private ControlsMouseLeave() {
        this.setState({ MouseOnControls: false })
    }

    private ContainerMouseEnter() {
        this.setState({
            MouseOnVideo: true,
        })
    }
    private ContainerMouseLeave() {
        if (this.state.timer) {
            clearTimeout(this.state.timer)
            this.setState({
                MouseOnVideo: false,
                timer: null,
            })
        } else {
            this.setState({
                MouseOnVideo: false,
            })
        }
    }

    private HideProcessor() {
        if (!this.state.showControls) {
            this.Container.style.cursor = 'none'
            this.CCE.style.transform = 'translateY(1500px)'
        } else {
            this.Container.style.cursor = ''
            this.CCE.style.transform = ''
        }
    }

    override componentDidMount() {
        // video
        this.video.addEventListener('pause', this.HandlePauseBind)
        this.video.addEventListener('play', this.HandlePlayBind)

        // controls
        this.Controls.addEventListener(
            'mouseenter',
            this.ControlsMouseEnterBind
        )
        this.Controls.addEventListener(
            'mouseleave',
            this.ControlsMouseLeaveBind
        )

        // container
        this.Container.addEventListener('mousemove', this.HandleMaouseMoveBind)
        this.Container.addEventListener(
            'mouseenter',
            this.ContainerMouseEnterBind
        )
        this.Container.addEventListener(
            'mouseleave',
            this.ContainerMouseLeaveBind
        )
    }

    override componentWillUnmount() {
        // video
        this.video.removeEventListener('pause', this.HandlePauseBind)
        this.video.removeEventListener('play', this.HandlePlayBind)

        // controls
        this.Controls.removeEventListener(
            'mouseenter',
            this.ControlsMouseEnterBind
        )
        this.Controls.removeEventListener(
            'mouseleave',
            this.ControlsMouseLeaveBind
        )

        // container
        this.Container.removeEventListener(
            'mousemove',
            this.HandleMaouseMoveBind
        )
        this.Container.removeEventListener(
            'mouseenter',
            this.ContainerMouseEnterBind
        )
        this.Container.removeEventListener(
            'mouseleave',
            this.ContainerMouseLeaveBind
        )
    }

    override componentDidUpdate() {
        this.HideProcessor()

        if (
            this.state.MouseOnVideo &&
            !this.state.MouseOnControls &&
            !this.state.isPause
        ) {
            if (this.state.showControls && !this.state.timer) {
                let t = setTimeout(() => {
                    if (
                        this.state.MouseOnVideo &&
                        !this.state.MouseOnControls &&
                        !this.state.isPause
                    ) {
                        this.setState({ showControls: false, timer: null })
                    } else {
                        this.setState({ showControls: true, timer: null })
                    }
                }, 5000)

                this.setState({ timer: t })
            }
        } else {
            this.setState({ showControls: true })
        }
    }

    override render(): ReactElement {
        return <></>
    }
}

export default HideMouse
