import React, { FC, PureComponent, ReactElement } from 'react'

// types
import { MenuType, InnerMenuType } from 'src'

// style
import './style/index.scss'

// icons

interface MenuProps {
    menu: MenuType
    level?: number
}

interface MenuState {
    menu?: InnerMenuType
}

export class Menu extends PureComponent<MenuProps, MenuState> {
    private MENU = this.props.menu

    override state: MenuState = {}

    override render(): ReactElement {
        return (
            <div className='master-menu-container'>
                <div className='master-menu'>
                    {!this.state.menu ? (
                        this.MENU.map(({ label, menu, action }, index) => (
                            <MenuItem
                                key={index}
                                onClick={() => {
                                    if (menu) {
                                        return this.setState({
                                            menu: menu,
                                        })
                                    } else if (action) {
                                        action()
                                    }
                                }}
                                aright={!!menu}
                                label={label}
                            />
                        ))
                    ) : (
                        <>
                            <MenuItem
                                label='Back'
                                aleft={true}
                                onClick={() =>
                                    this.setState({ menu: undefined })
                                }
                                className='back'
                            />
                            {this.state.menu.map(({ label, action }, mndex) => (
                                <MenuItem
                                    key={mndex}
                                    onClick={() => action && action()}
                                    label={label}
                                />
                            ))}
                        </>
                    )}
                </div>
            </div>
        )
    }
}

export default Menu

interface MenuItemProps {
    onClick: Function
    aright?: boolean
    aleft?: boolean
    label: string
    className?: string
}

const MenuItem: FC<MenuItemProps> = ({
    onClick,
    aright,
    aleft,
    label,
    className,
}) => {
    return (
        <div
            className={'menu-item ' + (className || '')}
            onClick={() => onClick()}
        >
            {aleft && (
                <div className='icon'>
                    <ArrowLeft />
                </div>
            )}
            <div className='label'>{label}</div>
            {aright && (
                <div className='icon'>
                    <ArrowRight />
                </div>
            )}
            <span className='line'></span>
        </div>
    )
}

const ArrowRight: FC = () => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            height='24px'
            viewBox='0 0 24 24'
            width='24px'
            fill='currentColor'
        >
            <path d='M0 0h24v24H0z' fill='none' />
            <path d='M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z' />
        </svg>
    )
}

const ArrowLeft: FC = () => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            height='24px'
            viewBox='0 0 24 24'
            width='24px'
            fill='currentColor'
        >
            <path d='M0 0h24v24H0z' fill='none' />
            <path d='M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z' />
        </svg>
    )
}
