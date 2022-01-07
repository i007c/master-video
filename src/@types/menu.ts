interface MenuOption {
    label: string
    menu?: MenuType
    action?: Function
}

export type MenuType = MenuOption[]
