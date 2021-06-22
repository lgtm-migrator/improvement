/* eslint-disable camelcase */
export type User = {
    user_uuid: string
    username: string
    email?: string
    is_active: boolean
    created_at: string
    updated_at: string
    imageUrl?: string
}

export type UserState = {
    isAuthenticated: boolean
    user: User
}

export type ProfileMenuItemsType = {
    user: User
    userNavigation: { name: string; href: string }[]
}
