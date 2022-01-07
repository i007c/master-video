import React, { PureComponent, ReactElement } from 'react'

import { MenuType } from 'src'

interface MenuProps {
    menu: MenuType
}

interface MenuState {}

export class Menu extends PureComponent<MenuProps, MenuState> {
    private MENU = this.props.menu

    override state: MenuState = {}

    override render(): ReactElement {
        return (
            <div className='master-menu'>
                {this.MENU.map(({ label }, index) => (
                    <div className='menu-item' key={index}>
                        {label}
                    </div>
                ))}
            </div>
        )
    }
}

export default Menu
