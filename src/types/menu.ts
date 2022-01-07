export interface MenuOption {
    label: string
    menu?: InnerMenuType
    action?: Function
}

export type MenuType = MenuOption[]
export type InnerMenuType = Omit<MenuOption, 'menu'>[]
