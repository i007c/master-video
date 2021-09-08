import React, { CSSProperties, PureComponent, ReactElement } from 'react'

// style
import './menu.scss'

interface MenuProps {
    MenuList: MenuObject[]
    style?: CSSProperties
}

interface MenuState {
    previousList: MenuObject[] | null
    currentList: MenuObject[]
}

export interface MenuObject {
    label: string
    job: Function | MenuObject[]
}

export class Menu extends PureComponent<MenuProps, MenuState> {
    override state: MenuState = {
        previousList: null,
        currentList: this.props.MenuList,
    }

    private GetParent = (
        baseArray: MenuObject[],
        currentArray: MenuObject[]
    ): MenuObject[] | null => {
        if (baseArray === currentArray) return null

        for (const item of baseArray) {
            if (typeof item.job === 'function') continue

            if (item.job === currentArray) return baseArray
            else {
                let parent = this.GetParent(item.job, currentArray)
                if (parent) return parent
            }
        }

        return null
    }

    private BackToPrevious() {
        let parent = this.GetParent(this.props.MenuList, this.state.currentList)

        if (parent) this.setState({ currentList: parent })
    }

    private ClickHandler(item: MenuObject) {
        if (typeof item.job === 'function') {
            item.job()
        } else {
            if (item.job.length > 0) {
                this.setState({
                    currentList: item.job,
                })
            }
        }
    }

    private GetItemClassName(item: MenuObject) {
        if (typeof item.job === 'object' && item.job.length <= 0)
            return ' disable'
        else return ''
    }

    override render(): ReactElement {
        return (
            <div className='menu-container' style={this.props.style}>
                <div className='menu'>
                    <ul>
                        {this.GetParent(
                            this.props.MenuList,
                            this.state.currentList
                        ) && (
                            <li
                                className='back-btn'
                                onClick={() => this.BackToPrevious()}
                            >
                                Back
                            </li>
                        )}
                        {this.state.currentList.map((item, index) => (
                            <li
                                className={
                                    'menu-item' + this.GetItemClassName(item)
                                }
                                key={index}
                                onClick={() => this.ClickHandler(item)}
                            >
                                {item.label}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Menu
